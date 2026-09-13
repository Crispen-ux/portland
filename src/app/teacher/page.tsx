"use client";

import { useState, useEffect } from "react";
import { Card, Badge, LoadingState, Button } from "@/components/ui";
import {
  BookOpen, ClipboardCheck, Users, AlertCircle, GraduationCap,
  FileText, Mail, Activity, Plus, Eye, ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface Class {
  id: string;
  name: string;
  role: string;
  grade: string;
  academicYear: string;
  isActive: boolean;
  studentCount: number;
  students: { id: string; firstName: string; lastName: string; studentNumber: string | null }[];
}

interface Subject {
  id: string;
  name: string;
  code: string | null;
}

export default function TeacherDashboard() {
  const [data, setData] = useState<{ staff: any; classes: Class[]; subjects: Subject[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/teacher")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError("Failed to load data"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState message="Loading your dashboard..." />;
  if (error) return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
      <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
      <p className="text-sm text-red-700">{error}</p>
    </div>
  );
  if (!data) return null;

  const activeClasses = data.classes.filter((c) => c.isActive);
  const totalStudents = data.classes.reduce((sum, c) => sum + c.studentCount, 0);
  const allStudents = data.classes.flatMap((c) =>
    c.students.map((s) => ({ ...s, className: `${c.grade} ${c.name}`, classId: c.id }))
  );
  const uniqueStudents = Array.from(new Map(allStudents.map((s) => [s.id, s])).values());

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-portland-dark">{greeting}, {data.staff.firstName}</h1>
        <p className="text-portland-gray">{data.staff.position || "Teacher"} · {activeClasses.length} active class{activeClasses.length !== 1 ? "es" : ""}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card padding className="text-center">
          <p className="text-2xl font-bold text-portland-dark">{activeClasses.length}</p>
          <p className="text-xs text-portland-gray">Active Classes</p>
        </Card>
        <Card padding className="text-center">
          <p className="text-2xl font-bold text-portland-dark">{uniqueStudents.length}</p>
          <p className="text-xs text-portland-gray">Students</p>
        </Card>
        <Card padding className="text-center">
          <p className="text-2xl font-bold text-portland-dark">{data.subjects.length}</p>
          <p className="text-xs text-portland-gray">Subjects</p>
        </Card>
        <Card padding className="text-center">
          <p className="text-2xl font-bold text-portland-red">{data.classes.length}</p>
          <p className="text-xs text-portland-gray">Total Classes</p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Link href="/teacher/attendance">
          <Card className="hover:shadow-md transition-shadow cursor-pointer text-center py-4">
            <ClipboardCheck className="w-6 h-6 text-portland-red mx-auto mb-2" />
            <p className="font-medium text-portland-dark text-sm">Take Attendance</p>
          </Card>
        </Link>
        <Link href="/teacher/results">
          <Card className="hover:shadow-md transition-shadow cursor-pointer text-center py-4">
            <FileText className="w-6 h-6 text-portland-red mx-auto mb-2" />
            <p className="font-medium text-portland-dark text-sm">Enter Grades</p>
          </Card>
        </Link>
        <Link href="/teacher/classes">
          <Card className="hover:shadow-md transition-shadow cursor-pointer text-center py-4">
            <Users className="w-6 h-6 text-portland-red mx-auto mb-2" />
            <p className="font-medium text-portland-dark text-sm">My Students</p>
          </Card>
        </Link>
        <Link href="/teacher/classes">
          <Card className="hover:shadow-md transition-shadow cursor-pointer text-center py-4">
            <BookOpen className="w-6 h-6 text-portland-red mx-auto mb-2" />
            <p className="font-medium text-portland-dark text-sm">My Classes</p>
          </Card>
        </Link>
        <Card className="hover:shadow-md transition-shadow cursor-pointer text-center py-4 opacity-50">
          <Mail className="w-6 h-6 text-portland-gray mx-auto mb-2" />
          <p className="font-medium text-portland-gray text-sm">Messages</p>
        </Card>
      </div>

      {/* My Classes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-portland-dark">My Classes</h2>
          <Link href="/teacher/classes" className="text-sm text-portland-red hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeClasses.map((cls) => (
            <Card key={cls.id} padding>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-portland-dark">{cls.grade} — {cls.name}</h3>
                  <p className="text-xs text-portland-gray">{cls.academicYear} · {cls.role === "class_teacher" ? "Class Teacher" : "Subject Teacher"}</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-portland-gray">{cls.studentCount} students</span>
              </div>
              {cls.students.length > 0 && (
                <div className="pt-3 border-t border-portland-mid/30">
                  <div className="space-y-1">
                    {cls.students.slice(0, 4).map((s) => (
                      <Link key={s.id} href={`/admin/students/${s.id}`} className="flex items-center justify-between text-sm hover:bg-portland-light/50 rounded px-2 py-1">
                        <span className="text-portland-dark">{s.firstName} {s.lastName}</span>
                        <span className="text-xs text-portland-gray font-mono">{s.studentNumber || "—"}</span>
                      </Link>
                    ))}
                    {cls.students.length > 4 && (
                      <p className="text-xs text-portland-gray pl-2">+{cls.students.length - 4} more</p>
                    )}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* My Subjects */}
      <div>
        <h2 className="text-lg font-semibold text-portland-dark mb-4">My Subjects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.subjects.map((subj) => (
            <Card key={subj.id} padding>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-portland-red/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-portland-red" />
                </div>
                <div>
                  <h3 className="font-medium text-portland-dark">{subj.name}</h3>
                  {subj.code && <p className="text-xs text-portland-gray">{subj.code}</p>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* My Students */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-portland-dark">My Students ({uniqueStudents.length})</h2>
        </div>
        <Card padding={false}>
          {uniqueStudents.length === 0 ? (
            <div className="p-6 text-center text-sm text-portland-gray">No students in your classes</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-portland-mid/30">
                    <th className="text-left px-4 py-2.5 font-medium text-portland-gray">Student</th>
                    <th className="text-left px-4 py-2.5 font-medium text-portland-gray">Number</th>
                    <th className="text-left px-4 py-2.5 font-medium text-portland-gray">Class</th>
                    <th className="text-right px-4 py-2.5 font-medium text-portland-gray">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-portland-mid/30">
                  {uniqueStudents.slice(0, 10).map((s) => (
                    <tr key={s.id} className="hover:bg-portland-light/50">
                      <td className="px-4 py-3 font-medium text-portland-dark">{s.firstName} {s.lastName}</td>
                      <td className="px-4 py-3 text-portland-gray font-mono text-xs">{s.studentNumber || "—"}</td>
                      <td className="px-4 py-3"><Badge variant="info">{s.className}</Badge></td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/admin/students/${s.id}`} className="p-2 hover:bg-portland-light rounded-lg inline-flex">
                          <Eye className="w-4 h-4 text-portland-gray" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
