"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  DollarSign,
  Megaphone,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  User,
  FileText,
} from "lucide-react";
import { ROLE_LABELS } from "@/lib/auth/rbac";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Invitations",
    href: "/admin/invitations",
    icon: Megaphone,
  },
  {
    label: "Students",
    href: "/admin/students",
    icon: GraduationCap,
  },
  {
    label: "Parents",
    href: "/admin/parents",
    icon: Users,
  },
  {
    label: "Enrolments",
    href: "/admin/enrolments",
    icon: FileText,
  },
  {
    label: "Staff",
    href: "/admin/staff",
    icon: Users,
  },
  {
    label: "Classes",
    href: "/admin/classes",
    icon: BookOpen,
  },
  {
    label: "Attendance",
    href: "/admin/attendance",
    icon: ClipboardCheck,
  },
  {
    label: "Academics",
    href: "/admin/academics",
    icon: BookOpen,
  },
  {
    label: "Assessments",
    href: "/admin/assessments",
    icon: FileText,
  },
  {
    label: "Results",
    href: "/admin/results",
    icon: ClipboardCheck,
  },
  {
    label: "Finance",
    href: "/admin/finance",
    icon: DollarSign,
  },
  {
    label: "Admissions",
    href: "/admin/admissions",
    icon: Megaphone,
  },
  {
    label: "Announcements",
    href: "/admin/announcements",
    icon: Megaphone,
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: LayoutDashboard,
  },
  {
    label: "AI Insights",
    href: "/admin/ai",
    icon: Settings,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user as any;

  return (
    <div className="min-h-screen bg-portland-light">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-portland-dark text-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-5 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-portland-red rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <div>
                <p className="font-bold text-sm">PORTLAND</p>
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Admin Portal</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-portland-red text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="px-3 py-4 border-t border-white/10">
            <Link
              href="/admin/profile"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all mb-1"
            >
              <User className="w-5 h-5" />
              <div className="text-left">
                <p className="text-sm">{user?.name || "User"}</p>
                <p className="text-[10px] text-white/40">{ROLE_LABELS[user?.role as keyof typeof ROLE_LABELS] || user?.role}</p>
              </div>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-portland-mid/30 px-6 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-portland-light rounded-xl"
            >
              <Menu className="w-5 h-5 text-portland-dark" />
            </button>

            <div className="hidden lg:flex items-center gap-2 bg-portland-light rounded-xl px-4 py-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-portland-gray" />
              <input
                type="text"
                placeholder="Search students, classes..."
                className="bg-transparent text-sm text-portland-dark placeholder:text-portland-gray/50 focus:outline-none w-full"
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-portland-light rounded-xl">
                <Bell className="w-5 h-5 text-portland-dark" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-portland-red rounded-full" />
              </button>
              <Link href="/admin/profile" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-portland-red/10 rounded-full flex items-center justify-center">
                  <span className="text-portland-red text-sm font-semibold">
                    {(user?.name || "U").charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-portland-dark hidden sm:block">
                  {user?.name || "User"}
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
