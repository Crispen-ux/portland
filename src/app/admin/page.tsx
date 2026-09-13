"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, PageHeader, LoadingState } from "@/components/ui";
import {
  Users,
  GraduationCap,
  ClipboardCheck,
  DollarSign,
  Megaphone,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  UserPlus,
  FileText,
  Receipt,
  AlertCircle,
  BookOpen,
} from "lucide-react";

interface DashboardData {
  overview: {
    totalStudents: number;
    totalStaff: number;
    totalParents: number;
    totalClasses: number;
    totalSubjects: number;
    activeEnrolments: number;
    pendingAdmissions: number;
    totalInvoices: number;
  };
  financial: {
    totalRevenue: number;
    totalOwed: number;
    collectionRate: number;
  };
  attendance: {
    total: number;
    present: number;
    absent: number;
    late: number;
    rate: number;
  };
  gradeDistribution: { name: string; count: number }[];
  recentActivity: {
    admissions: { id: string; parentName: string; grade: string; status: string; createdAt: string }[];
    payments: { id: string; amount: number; method: string; invoiceNumber: string; studentName: string; paidAt: string }[];
  };
}

const fmt = (n: number) => n.toLocaleString("en-ZA");
const fmtCurrency = (n: number) => `R ${n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-amber-100 text-amber-700",
  IN_PROGRESS: "bg-purple-100 text-purple-700",
  ACCEPTED: "bg-green-100 text-green-700",
  ENROLLED: "bg-emerald-100 text-emerald-700",
  CLOSED: "bg-gray-100 text-gray-500",
};

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setData(d);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState message="Loading dashboard..." />;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!data) return null;

  const stats = [
    {
      label: "Total Students",
      value: fmt(data.overview.totalStudents),
      sub: `${fmt(data.overview.activeEnrolments)} enrolled`,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Active Staff",
      value: fmt(data.overview.totalStaff),
      sub: `${data.overview.totalClasses} classes`,
      icon: GraduationCap,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Attendance (30d)",
      value: `${data.attendance.rate}%`,
      sub: `${fmt(data.attendance.present)} present / ${fmt(data.attendance.absent)} absent`,
      icon: ClipboardCheck,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Pending Admissions",
      value: fmt(data.overview.pendingAdmissions),
      sub: "awaiting action",
      icon: Megaphone,
      color: "text-portland-red",
      bg: "bg-red-50",
    },
    {
      label: "Fee Collection",
      value: fmtCurrency(data.financial.totalRevenue),
      sub: `${data.financial.collectionRate}% collection rate`,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Outstanding Fees",
      value: fmtCurrency(data.financial.totalOwed),
      sub: `${fmt(data.overview.totalInvoices)} invoices`,
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome to the Portland Schools admin portal."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-portland-gray">{stat.label}</p>
                <p className="text-2xl font-bold text-portland-dark">{stat.value}</p>
                <p className="text-xs text-portland-gray mt-0.5">{stat.sub}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Admissions */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-portland-dark">Recent Admissions</h3>
            <Link href="/admin/admissions" className="text-sm text-portland-red hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {data.recentActivity.admissions.length === 0 ? (
            <p className="text-sm text-portland-gray py-4">No admissions yet.</p>
          ) : (
            <div className="space-y-3">
              {data.recentActivity.admissions.map((a) => (
                <div key={a.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-portland-dark">{a.parentName}</p>
                    <p className="text-xs text-portland-gray">Grade {a.grade} · {new Date(a.createdAt).toLocaleDateString("en-ZA")}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[a.status] || "bg-gray-100 text-gray-500"}`}>
                    {a.status.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Recent Payments */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-portland-dark">Recent Payments</h3>
            <Link href="/admin/finance" className="text-sm text-portland-red hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {data.recentActivity.payments.length === 0 ? (
            <p className="text-sm text-portland-gray py-4">No payments recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {data.recentActivity.payments.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-portland-dark">{p.studentName}</p>
                    <p className="text-xs text-portland-gray">{p.invoiceNumber} · {new Date(p.paidAt).toLocaleDateString("en-ZA")}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-600">{fmtCurrency(p.amount)}</p>
                    <p className="text-xs text-portland-gray uppercase">{p.method}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Quick Actions + Grade Distribution */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="font-semibold text-portland-dark mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link href="/admin/students" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <UserPlus className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-portland-dark">Add Student</span>
            </Link>
            <Link href="/admin/attendance" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="w-4 h-4 text-amber-600" />
              </div>
              <span className="text-sm font-medium text-portland-dark">Record Attendance</span>
            </Link>
            <Link href="/admin/finance" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                <Receipt className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-sm font-medium text-portland-dark">Create Invoice</span>
            </Link>
            <Link href="/admin/announcements" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                <Megaphone className="w-4 h-4 text-portland-red" />
              </div>
              <span className="text-sm font-medium text-portland-dark">Post Announcement</span>
            </Link>
            <Link href="/admin/documents" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-portland-dark">Generate Report Card</span>
            </Link>
          </div>
        </Card>

        {/* Grade Distribution */}
        <Card className="lg:col-span-2">
          <h3 className="font-semibold text-portland-dark mb-4">Students by Grade</h3>
          {data.gradeDistribution.length === 0 ? (
            <p className="text-sm text-portland-gray py-4">No grade data.</p>
          ) : (
            <div className="space-y-2">
              {data.gradeDistribution.map((g) => {
                const max = Math.max(...data.gradeDistribution.map((x) => x.count), 1);
                const pct = (g.count / max) * 100;
                return (
                  <div key={g.name} className="flex items-center gap-3">
                    <span className="text-xs font-medium text-portland-gray w-20 truncate">{g.name}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-portland-red transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-portland-dark w-8 text-right">{g.count}</span>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
