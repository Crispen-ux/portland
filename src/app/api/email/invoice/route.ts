import { NextRequest, NextResponse } from "next/server";
import { apiAuth } from "@/lib/auth/helpers";
import { sendEmail, invoiceEmail } from "@/lib/email";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  const { user, error } = await apiAuth("finance.write");
  if (error) return error;

  try {
    const body = await request.json();
    const { invoiceId, to, parentName } = body;

    if (!invoiceId || !to) {
      return NextResponse.json({ error: "Invoice ID and recipient email are required" }, { status: 400 });
    }

    const invoice = await db.invoice.findUnique({
      where: { id: invoiceId },
      include: {
        student: { select: { firstName: true, lastName: true } },
        feeStructure: { select: { name: true } },
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const studentName = `${invoice.student.firstName} ${invoice.student.lastName}`;
    const paymentLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/parent/invoices`;

    const html = invoiceEmail({
      studentName,
      invoiceNumber: invoice.invoiceNumber,
      totalAmount: Number(invoice.totalAmount),
      dueDate: invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString("en-ZA") : undefined,
      parentName: parentName || "Parent/Guardian",
      paymentLink,
    });

    await sendEmail({
      to,
      subject: `Invoice ${invoice.invoiceNumber} — Portland Schools`,
      html,
      replyTo: "info@portlandschools.co.za",
    });

    return NextResponse.json({ success: true, message: "Invoice emailed successfully" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to send invoice" }, { status: 500 });
  }
}
