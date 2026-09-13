import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { apiAuth } from "@/lib/auth/helpers";

function generateInvoiceHTML(data: any): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Invoice ${data.invoiceNumber || ""}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
    .header { display: flex; justify-content: space-between; margin-bottom: 40px; border-bottom: 2px solid #2563eb; padding-bottom: 20px; }
    .school-name { font-size: 24px; font-weight: bold; color: #2563eb; }
    .school-info { font-size: 12px; color: #666; margin-top: 5px; }
    .invoice-title { font-size: 28px; font-weight: bold; color: #2563eb; text-align: right; }
    .invoice-number { font-size: 14px; color: #666; text-align: right; margin-top: 5px; }
    .details { display: flex; justify-content: space-between; margin-bottom: 30px; }
    .student-info, .invoice-meta { width: 45%; }
    .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
    .value { font-size: 14px; margin-bottom: 15px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    th { background: #2563eb; color: white; padding: 12px; text-align: left; font-size: 12px; text-transform: uppercase; }
    td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
    .total-row { font-weight: bold; background: #f3f4f6; }
    .total-row td { padding: 12px; }
    .footer { margin-top: 40px; font-size: 12px; color: #666; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="school-name">Portland Schools</div>
      <div class="school-info">123 Education Street<br>Pretoria, 0001<br>Phone: (012) 345-6789</div>
    </div>
    <div>
      <div class="invoice-title">INVOICE</div>
      <div class="invoice-number">${data.invoiceNumber || ""}</div>
    </div>
  </div>
  <div class="details">
    <div class="student-info">
      <div class="label">Bill To</div>
      <div class="value">${data.student?.firstName || ""} ${data.student?.lastName || ""}</div>
      <div class="value">Student #: ${data.student?.studentNumber || "N/A"}</div>
    </div>
    <div class="invoice-meta">
      <div class="label">Invoice Details</div>
      <div class="value">Due Date: ${data.dueDate ? new Date(data.dueDate).toLocaleDateString() : "N/A"}</div>
      <div class="value">Status: ${data.status || "PENDING"}</div>
    </div>
  </div>
  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th>Qty</th>
        <th style="text-align: right">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${(data.items || [])
        .map(
          (item: any) => `
        <tr>
          <td>${item.description}</td>
          <td>${item.quantity || 1}</td>
          <td style="text-align: right">R ${Number(item.amount).toFixed(2)}</td>
        </tr>
      `
        )
        .join("")}
      <tr class="total-row">
        <td colspan="2">Total</td>
        <td style="text-align: right">R ${Number(data.totalAmount || 0).toFixed(2)}</td>
      </tr>
    </tbody>
  </table>
  <div class="footer">
    <p>Thank you for your payment. Please retain this invoice for your records.</p>
  </div>
</body>
</html>`;
}

function generateTranscriptHTML(data: any): string {
  const subjectRows = (data.subjects || [])
    .map(
      (s: any) => `
    <tr>
      <td>${s.subject}</td>
      <td style="text-align: center">${s.average}%</td>
      <td style="text-align: center">${s.grade}</td>
    </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Transcript - ${data.student?.firstName} ${data.student?.lastName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
    .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 20px; }
    .school-name { font-size: 24px; font-weight: bold; color: #2563eb; }
    .school-info { font-size: 12px; color: #666; margin-top: 5px; }
    .title { font-size: 20px; font-weight: bold; margin: 20px 0; }
    .student-info { display: flex; justify-content: space-between; margin-bottom: 30px; padding: 15px; background: #f9fafb; border-radius: 8px; }
    .info-group { margin-right: 30px; }
    .label { font-size: 11px; color: #666; text-transform: uppercase; }
    .value { font-size: 14px; font-weight: bold; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    th { background: #2563eb; color: white; padding: 12px; text-align: left; font-size: 12px; }
    td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
    .footer { margin-top: 40px; font-size: 12px; color: #666; text-align: center; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="school-name">Portland Schools</div>
    <div class="school-info">Academic Transcript</div>
  </div>
  <div class="title">ACADEMIC TRANSCRIPT</div>
  <div class="student-info">
    <div class="info-group">
      <div class="label">Student Name</div>
      <div class="value">${data.student?.firstName || ""} ${data.student?.lastName || ""}</div>
    </div>
    <div class="info-group">
      <div class="label">Student Number</div>
      <div class="value">${data.student?.studentNumber || "N/A"}</div>
    </div>
    <div class="info-group">
      <div class="label">Academic Year</div>
      <div class="value">${data.academicYear?.name || "N/A"}</div>
    </div>
  </div>
  <table>
    <thead>
      <tr>
        <th>Subject</th>
        <th style="text-align: center">Average</th>
        <th style="text-align: center">Grade</th>
      </tr>
    </thead>
    <tbody>
      ${subjectRows || '<tr><td colspan="3" style="text-align: center">No results available</td></tr>'}
    </tbody>
  </table>
  <div class="footer">
    <p>Generated on ${data.generatedAt ? new Date(data.generatedAt).toLocaleDateString() : new Date().toLocaleDateString()}</p>
  </div>
</body>
</html>`;
}

function generateReportCardHTML(data: any): string {
  const subjectRows = (data.academicResults || [])
    .map(
      (s: any) => `
    <tr>
      <td>${s.subject}</td>
      <td style="text-align: center">${s.average}%</td>
    </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Report Card - ${data.student?.firstName} ${data.student?.lastName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
    .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 20px; }
    .school-name { font-size: 24px; font-weight: bold; color: #2563eb; }
    .title { font-size: 20px; font-weight: bold; margin: 20px 0; }
    .student-info { display: flex; justify-content: space-between; margin-bottom: 30px; padding: 15px; background: #f9fafb; border-radius: 8px; }
    .info-group { margin-right: 30px; }
    .label { font-size: 11px; color: #666; text-transform: uppercase; }
    .value { font-size: 14px; font-weight: bold; }
    .section { margin-bottom: 30px; }
    .section-title { font-size: 16px; font-weight: bold; margin-bottom: 15px; color: #2563eb; }
    .stats { display: flex; gap: 20px; margin-bottom: 20px; }
    .stat-card { flex: 1; padding: 15px; background: #f9fafb; border-radius: 8px; text-align: center; }
    .stat-value { font-size: 24px; font-weight: bold; color: #2563eb; }
    .stat-label { font-size: 11px; color: #666; text-transform: uppercase; margin-top: 5px; }
    table { width: 100%; border-collapse: collapse; }
    th { background: #2563eb; color: white; padding: 12px; text-align: left; font-size: 12px; }
    td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
    .footer { margin-top: 40px; font-size: 12px; color: #666; text-align: center; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="school-name">Portland Schools</div>
    <div class="school-info">Report Card</div>
  </div>
  <div class="title">ACADEMIC REPORT CARD</div>
  <div class="student-info">
    <div class="info-group">
      <div class="label">Student Name</div>
      <div class="value">${data.student?.firstName || ""} ${data.student?.lastName || ""}</div>
    </div>
    <div class="info-group">
      <div class="label">Student Number</div>
      <div class="value">${data.student?.studentNumber || "N/A"}</div>
    </div>
    <div class="info-group">
      <div class="label">Academic Year</div>
      <div class="value">${data.academicYear?.name || "N/A"}</div>
    </div>
  </div>
  <div class="section">
    <div class="section-title">Attendance Summary</div>
    <div class="stats">
      <div class="stat-card">
        <div class="stat-value">${data.attendance?.total || 0}</div>
        <div class="stat-label">Total Days</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${data.attendance?.present || 0}</div>
        <div class="stat-label">Present</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${data.attendance?.absent || 0}</div>
        <div class="stat-label">Absent</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${data.attendanceRate || 0}%</div>
        <div class="stat-label">Attendance Rate</div>
      </div>
    </div>
  </div>
  <div class="section">
    <div class="section-title">Academic Results</div>
    <table>
      <thead>
        <tr>
          <th>Subject</th>
          <th style="text-align: center">Average</th>
        </tr>
      </thead>
      <tbody>
        ${subjectRows || '<tr><td colspan="2" style="text-align: center">No results available</td></tr>'}
        <tr style="font-weight: bold; background: #f3f4f6;">
          <td>Overall Average</td>
          <td style="text-align: center">${data.overallAverage || 0}%</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="footer">
    <p>Generated on ${data.generatedAt ? new Date(data.generatedAt).toLocaleDateString() : new Date().toLocaleDateString()}</p>
  </div>
</body>
</html>`;
}

function generateStatementHTML(data: any): string {
  const itemRows = (data.items || [])
    .map(
      (item: any) => `
    <tr>
      <td>${new Date(item.date).toLocaleDateString()}</td>
      <td>${item.type}</td>
      <td>${item.description}</td>
      <td style="text-align: right">${item.type === "PAYMENT" ? "-" : ""}R ${Math.abs(item.amount).toFixed(2)}</td>
      <td style="text-align: right">R ${item.balance.toFixed(2)}</td>
    </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Statement - ${data.student?.firstName} ${data.student?.lastName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
    .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 20px; }
    .school-name { font-size: 24px; font-weight: bold; color: #2563eb; }
    .title { font-size: 20px; font-weight: bold; margin: 20px 0; }
    .student-info { display: flex; justify-content: space-between; margin-bottom: 30px; padding: 15px; background: #f9fafb; border-radius: 8px; }
    .info-group { margin-right: 30px; }
    .label { font-size: 11px; color: #666; text-transform: uppercase; }
    .value { font-size: 14px; font-weight: bold; }
    .summary { display: flex; gap: 20px; margin-bottom: 30px; }
    .summary-card { flex: 1; padding: 15px; background: #f9fafb; border-radius: 8px; text-align: center; }
    .summary-value { font-size: 20px; font-weight: bold; }
    .summary-label { font-size: 11px; color: #666; text-transform: uppercase; margin-top: 5px; }
    .balance-positive { color: #dc2626; }
    .balance-negative { color: #16a34a; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    th { background: #2563eb; color: white; padding: 12px; text-align: left; font-size: 12px; }
    td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
    .footer { margin-top: 40px; font-size: 12px; color: #666; text-align: center; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="school-name">Portland Schools</div>
    <div class="school-info">Account Statement</div>
  </div>
  <div class="title">ACCOUNT STATEMENT</div>
  <div class="student-info">
    <div class="info-group">
      <div class="label">Student Name</div>
      <div class="value">${data.student?.firstName || ""} ${data.student?.lastName || ""}</div>
    </div>
    <div class="info-group">
      <div class="label">Student Number</div>
      <div class="value">${data.student?.studentNumber || "N/A"}</div>
    </div>
  </div>
  <div class="summary">
    <div class="summary-card">
      <div class="summary-value">R ${(data.totalInvoiced || 0).toFixed(2)}</div>
      <div class="summary-label">Total Invoiced</div>
    </div>
    <div class="summary-card">
      <div class="summary-value">R ${(data.totalPaid || 0).toFixed(2)}</div>
      <div class="summary-label">Total Paid</div>
    </div>
    <div class="summary-card">
      <div class="summary-value ${data.balance > 0 ? "balance-positive" : "balance-negative"}">R ${(data.balance || 0).toFixed(2)}</div>
      <div class="summary-label">Balance Due</div>
    </div>
  </div>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Type</th>
        <th>Description</th>
        <th style="text-align: right">Amount</th>
        <th style="text-align: right">Balance</th>
      </tr>
    </thead>
    <tbody>
      ${itemRows || '<tr><td colspan="5" style="text-align: center">No transactions</td></tr>'}
    </tbody>
  </table>
  <div class="footer">
    <p>Generated on ${data.generatedAt ? new Date(data.generatedAt).toLocaleDateString() : new Date().toLocaleDateString()}</p>
  </div>
</body>
</html>`;
}

function generateReceiptHTML(data: any): string {
  const paymentRows = (data.payments || [])
    .map(
      (p: any) => `
    <tr>
      <td>${new Date(p.paidAt).toLocaleDateString()}</td>
      <td>${p.invoiceNumber || "N/A"}</td>
      <td>${p.method}</td>
      <td>${p.reference || "-"}</td>
      <td style="text-align: right">R ${Number(p.amount).toFixed(2)}</td>
    </tr>`
    )
    .join("");

  const totalPaid = (data.payments || []).reduce(
    (sum: number, p: any) => sum + Number(p.amount),
    0
  );

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Receipt - ${data.student?.firstName} ${data.student?.lastName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
    .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #16a34a; padding-bottom: 20px; }
    .school-name { font-size: 24px; font-weight: bold; color: #16a34a; }
    .title { font-size: 20px; font-weight: bold; margin: 20px 0; color: #16a34a; }
    .student-info { margin-bottom: 30px; padding: 15px; background: #f0fdf4; border-radius: 8px; }
    .info-group { margin-right: 30px; display: inline-block; }
    .label { font-size: 11px; color: #666; text-transform: uppercase; }
    .value { font-size: 14px; font-weight: bold; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    th { background: #16a34a; color: white; padding: 12px; text-align: left; font-size: 12px; }
    td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
    .total-row { font-weight: bold; background: #f0fdf4; }
    .footer { margin-top: 40px; font-size: 12px; color: #666; text-align: center; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="school-name">Portland Schools</div>
    <div class="school-info">Payment Receipt</div>
  </div>
  <div class="title">PAYMENT RECEIPT</div>
  <div class="student-info">
    <div class="info-group">
      <div class="label">Student Name</div>
      <div class="value">${data.student?.firstName || ""} ${data.student?.lastName || ""}</div>
    </div>
    <div class="info-group">
      <div class="label">Student Number</div>
      <div class="value">${data.student?.studentNumber || "N/A"}</div>
    </div>
  </div>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Invoice</th>
        <th>Method</th>
        <th>Reference</th>
        <th style="text-align: right">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${paymentRows || '<tr><td colspan="5" style="text-align: center">No payments found</td></tr>'}
      <tr class="total-row">
        <td colspan="4">Total Paid</td>
        <td style="text-align: right">R ${totalPaid.toFixed(2)}</td>
      </tr>
    </tbody>
  </table>
  <div class="footer">
    <p>Generated on ${data.generatedAt ? new Date(data.generatedAt).toLocaleDateString() : new Date().toLocaleDateString()}</p>
  </div>
</body>
</html>`;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, error } = await apiAuth("academics.read");
  if (error) return error;

  const { id } = await params;

  const document = await db.document.findUnique({
    where: { id },
    include: {
      student: { select: { id: true, firstName: true, lastName: true, studentNumber: true } },
      academicYear: { select: { name: true } },
    },
  });

  if (!document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  const data = JSON.parse(document.data);
  let html = "";

  switch (document.type) {
    case "INVOICE":
      html = generateInvoiceHTML(data);
      break;
    case "TRANSCRIPT":
      html = generateTranscriptHTML(data);
      break;
    case "REPORT_CARD":
      html = generateReportCardHTML(data);
      break;
    case "STATEMENT":
      html = generateStatementHTML(data);
      break;
    case "RECEIPT":
      html = generateReceiptHTML(data);
      break;
    default:
      html = `<html><body><h1>Unknown document type: ${document.type}</h1></body></html>`;
  }

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}