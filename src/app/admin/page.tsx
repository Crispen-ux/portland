import { Card, PageHeader } from "@/components/ui";
import {
  Users,
  GraduationCap,
  ClipboardCheck,
  DollarSign,
  Megaphone,
  TrendingUp,
} from "lucide-react";

const STATS = [
  {
    label: "Total Students",
    value: "—",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Active Staff",
    value: "—",
    icon: GraduationCap,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    label: "Attendance Today",
    value: "—",
    icon: ClipboardCheck,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "Pending Admissions",
    value: "—",
    icon: Megaphone,
    color: "text-portland-red",
    bg: "bg-red-50",
  },
  {
    label: "Fee Collection",
    value: "—",
    icon: DollarSign,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Outstanding Fees",
    value: "—",
    icon: TrendingUp,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome to the Portland Schools admin portal."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {STATS.map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-portland-gray">{stat.label}</p>
                <p className="text-2xl font-bold text-portland-dark">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-portland-dark mb-4">Recent Admissions</h3>
          <p className="text-sm text-portland-gray">No admissions data yet. Connect a database to see real data.</p>
        </Card>
        <Card>
          <h3 className="font-semibold text-portland-dark mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <p className="text-sm text-portland-gray">• Add a new student</p>
            <p className="text-sm text-portland-gray">• Record attendance</p>
            <p className="text-sm text-portland-gray">• Create an invoice</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
