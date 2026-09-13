import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { apiAuth } from "@/lib/auth/helpers";
import { auditLog } from "@/lib/audit";

export async function GET(request: NextRequest) {
  const { user, error } = await apiAuth("academics.read");
  if (error) return error;

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const studentId = searchParams.get("studentId");
  const academicYearId = searchParams.get("academicYearId");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const where: any = {};
  if (type) where.type = type;
  if (studentId) where.studentId = studentId;
  if (academicYearId) where.academicYearId = academicYearId;

  const [documents, total] = await Promise.all([
    db.document.findMany({
      where,
      include: {
        student: { select: { id: true, firstName: true, lastName: true, studentNumber: true } },
        academicYear: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: (page - 1) * limit,
    }),
    db.document.count({ where }),
  ]);

  return NextResponse.json({
    documents,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(request: NextRequest) {
  const { user, error } = await apiAuth("academics.write");
  if (error) return error;

  try {
    const body = await request.json();
    const { type, studentId, academicYearId } = body;

    if (!type || !studentId) {
      return NextResponse.json(
        { error: "type and studentId are required" },
        { status: 400 }
      );
    }

    const validTypes = ["INVOICE", "TRANSCRIPT", "REPORT_CARD", "STATEMENT", "RECEIPT"];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: `type must be one of: ${validTypes.join(", ")}` },
        { status: 400 }
      );
    }

    const student = await db.student.findUnique({
      where: { id: studentId },
      select: { id: true, firstName: true, lastName: true, studentNumber: true },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    let documentData: any = {};
    let title = "";

    switch (type) {
      case "TRANSCRIPT": {
        title = `Transcript - ${student.firstName} ${student.lastName}`;
        const academicYearFilter: any = {};
        if (academicYearId) academicYearFilter.id = academicYearId;
        else academicYearFilter.active = true;

        const year = await db.academicYear.findFirst({
          where: academicYearFilter,
        });

        if (!year) {
          return NextResponse.json(
            { error: "No academic year found" },
            { status: 404 }
          );
        }

        const results = await db.assessmentResult.findMany({
          where: {
            studentId,
            assessment: { academicYearId: year.id },
          },
          include: {
            assessment: {
              include: {
                subject: { select: { name: true } },
              },
            },
          },
        });

        const subjectMap = new Map<string, { marks: number[]; totalMarks: number[]; assessments: any[] }>();
        for (const result of results) {
          const subjectName = result.assessment.subject.name;
          if (!subjectMap.has(subjectName)) {
            subjectMap.set(subjectName, { marks: [], totalMarks: [], assessments: [] });
          }
          const data = subjectMap.get(subjectName)!;
          data.marks.push(result.marks);
          data.totalMarks.push(result.assessment.totalMarks);
          data.assessments.push({
            title: result.assessment.title,
            type: result.assessment.type,
            marks: result.marks,
            totalMarks: result.assessment.totalMarks,
            percentage: result.percentage,
            grade: result.grade,
          });
        }

        const subjects = Array.from(subjectMap.entries()).map(([name, data]) => {
          const totalMarks = data.marks.reduce((a, b) => a + b, 0);
          const totalPossible = data.totalMarks.reduce((a, b) => a + b, 0);
          const average = totalPossible > 0 ? (totalMarks / totalPossible) * 100 : 0;

          let grade = "F";
          if (average >= 90) grade = "A+";
          else if (average >= 80) grade = "A";
          else if (average >= 70) grade = "B";
          else if (average >= 60) grade = "C";
          else if (average >= 50) grade = "D";
          else if (average >= 40) grade = "E";

          return {
            subject: name,
            average: Math.round(average * 100) / 100,
            grade,
            assessments: data.assessments,
          };
        });

        documentData = {
          student,
          academicYear: year,
          subjects,
          generatedAt: new Date().toISOString(),
        };
        break;
      }

      case "REPORT_CARD": {
        title = `Report Card - ${student.firstName} ${student.lastName}`;
        const academicYearFilter: any = {};
        if (academicYearId) academicYearFilter.id = academicYearId;
        else academicYearFilter.active = true;

        const year = await db.academicYear.findFirst({
          where: academicYearFilter,
        });

        if (!year) {
          return NextResponse.json(
            { error: "No academic year found" },
            { status: 404 }
          );
        }

        const attendanceRecords = await db.attendanceRecord.findMany({
          where: {
            studentId,
            attendance: {
              class: {
                academicYearId: year.id,
              },
            },
          },
        });

        const attendanceSummary = {
          total: attendanceRecords.length,
          present: attendanceRecords.filter((r) => r.status === "PRESENT").length,
          absent: attendanceRecords.filter((r) => r.status === "ABSENT").length,
          late: attendanceRecords.filter((r) => r.status === "LATE").length,
          excused: attendanceRecords.filter((r) => r.status === "EXCUSED").length,
        };

        const results = await db.assessmentResult.findMany({
          where: {
            studentId,
            assessment: { academicYearId: year.id },
          },
          include: {
            assessment: {
              include: {
                subject: { select: { name: true } },
              },
            },
          },
        });

        const subjectMap = new Map<string, { marks: number[]; totalMarks: number[] }>();
        for (const result of results) {
          const subjectName = result.assessment.subject.name;
          if (!subjectMap.has(subjectName)) {
            subjectMap.set(subjectName, { marks: [], totalMarks: [] });
          }
          const data = subjectMap.get(subjectName)!;
          data.marks.push(result.marks);
          data.totalMarks.push(result.assessment.totalMarks);
        }

        const academicResults = Array.from(subjectMap.entries()).map(([name, data]) => {
          const totalMarks = data.marks.reduce((a, b) => a + b, 0);
          const totalPossible = data.totalMarks.reduce((a, b) => a + b, 0);
          const average = totalPossible > 0 ? (totalMarks / totalPossible) * 100 : 0;
          return {
            subject: name,
            average: Math.round(average * 100) / 100,
          };
        });

        const overallAverage =
          academicResults.length > 0
            ? academicResults.reduce((sum, r) => sum + r.average, 0) / academicResults.length
            : 0;

        documentData = {
          student,
          academicYear: year,
          attendance: attendanceSummary,
          attendanceRate:
            attendanceSummary.total > 0
              ? Math.round((attendanceSummary.present / attendanceSummary.total) * 100 * 100) / 100
              : 0,
          academicResults,
          overallAverage: Math.round(overallAverage * 100) / 100,
          generatedAt: new Date().toISOString(),
        };
        break;
      }

      case "STATEMENT": {
        title = `Statement - ${student.firstName} ${student.lastName}`;
        const invoices = await db.invoice.findMany({
          where: { studentId },
          include: {
            items: true,
            payments: { orderBy: { paidAt: "asc" } },
            feeStructure: { select: { name: true } },
          },
          orderBy: { createdAt: "asc" },
        });

        const statementItems: any[] = [];
        let balance = 0;

        for (const invoice of invoices) {
          balance += Number(invoice.totalAmount);
          statementItems.push({
            type: "INVOICE",
            date: invoice.createdAt,
            description: `Invoice ${invoice.invoiceNumber}${invoice.feeStructure ? ` - ${invoice.feeStructure.name}` : ""}`,
            amount: Number(invoice.totalAmount),
            balance,
          });

          for (const payment of invoice.payments) {
            balance -= Number(payment.amount);
            statementItems.push({
              type: "PAYMENT",
              date: payment.paidAt,
              description: `Payment (${payment.method})${payment.reference ? ` - ${payment.reference}` : ""}`,
              amount: -Number(payment.amount),
              balance,
            });
          }
        }

        const totalInvoiced = invoices.reduce((sum, inv) => sum + Number(inv.totalAmount), 0);
        const totalPaid = invoices.reduce(
          (sum, inv) => sum + inv.payments.reduce((pSum, p) => pSum + Number(p.amount), 0),
          0
        );

        documentData = {
          student,
          items: statementItems,
          totalInvoiced,
          totalPaid,
          balance: totalInvoiced - totalPaid,
          generatedAt: new Date().toISOString(),
        };
        break;
      }

      case "RECEIPT": {
        title = `Receipt - ${student.firstName} ${student.lastName}`;
        const invoices = await db.invoice.findMany({
          where: { studentId },
          include: {
            payments: { orderBy: { paidAt: "desc" } },
          },
        });

        const allPayments = invoices.flatMap((inv) =>
          inv.payments.map((p) => ({
            ...p,
            invoiceNumber: inv.invoiceNumber,
          }))
        );

        documentData = {
          student,
          payments: allPayments,
          generatedAt: new Date().toISOString(),
        };
        break;
      }

      case "INVOICE": {
        title = `Invoice - ${student.firstName} ${student.lastName}`;
        documentData = {
          student,
          note: "Invoice generation not yet implemented",
          generatedAt: new Date().toISOString(),
        };
        break;
      }
    }

    const document = await db.document.create({
      data: {
        type,
        title,
        studentId,
        academicYearId: academicYearId || null,
        data: JSON.stringify(documentData),
        generatedById: user.id,
      },
      include: {
        student: { select: { firstName: true, lastName: true } },
        academicYear: { select: { name: true } },
      },
    });

    await auditLog({
      userId: user.id,
      action: "document.created",
      resource: "document",
      resourceId: document.id,
      metadata: {
        type,
        studentName: `${student.firstName} ${student.lastName}`,
        title,
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (e: any) {
    console.error("Error creating document:", e);
    return NextResponse.json(
      { error: "Failed to create document" },
      { status: 500 }
    );
  }
}