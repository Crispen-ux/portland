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
  ShoppingBag,
  Award,
  MessageSquare,
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
    label: "Teachers",
    href: "/admin/teachers",
    icon: Award,
  },
  {
    label: "Assignments",
    href: "/admin/teacher-assignments",
    icon: BookOpen,
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
    label: "Accounting",
    href: "/admin/accounting",
    icon: DollarSign,
  },
  {
    label: "Documents",
    href: "/admin/documents",
    icon: FileText,
  },
  {
    label: "Catalogue",
    href: "/admin/catalogue",
    icon: ShoppingBag,
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
    label: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
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
  {
    label: "Audit Log",
    href: "/admin/audit",
    icon: FileText,
  },
];

// ─── Notification Bell Component ────────────────────────
function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setUnreadCount(data.unreadCount || 0);
      setNotifications(data.notifications || []);
    } catch {}
  };

  const toggle = async () => {
    if (!open) {
      setLoading(true);
      await fetchNotifications();
      setLoading(false);
    }
    setOpen(!open);
  };

  const markAllRead = async () => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAllRead: true }),
      });
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch {}
  };

  return (
    <div className="relative">
      <button onClick={toggle} className="relative p-2 hover:bg-portland-light rounded-xl">
        <Bell className="w-5 h-5 text-portland-dark" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-portland-red text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border z-50 max-h-[70vh] overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-portland-dark text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-xs text-portland-red hover:underline">Mark all read</button>
              )}
            </div>
            <div className="overflow-y-auto max-h-[50vh]">
              {loading ? (
                <div className="p-8 text-center text-sm text-portland-gray">Loading...</div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center text-sm text-portland-gray">No notifications</div>
              ) : (
                notifications.slice(0, 20).map((n) => (
                  <div key={n.id} className={`p-4 border-b last:border-0 ${n.read ? "" : "bg-portland-red/5"}`}>
                    <p className="text-sm font-medium text-portland-dark">{n.title}</p>
                    <p className="text-xs text-portland-gray mt-0.5">{n.message}</p>
                    <p className="text-[10px] text-portland-gray/50 mt-1">
                      {new Date(n.createdAt).toLocaleDateString("en-ZA")} {new Date(n.createdAt).toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

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
              <NotificationBell />
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
