"use client";

import { useState, useEffect } from "react";
import { Card, Badge, LoadingState } from "@/components/ui";
import { BookOpen, ClipboardCheck, Users, AlertCircle } from "lucide-react";
import Link from "next/link";

interface Class {
  id: string;
  name: string;
  role: string;
  grade: string;
  academicYear: string;
  isActive: boolean;
  studentCount: number;
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

  if (loading) return <LoadingState />;
  if (error) return <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"><AlertCircle className="w-5 h-5 text-red-500 shrink-0" /><p className="text-sm text-red-700">{error}</p></div>;
  if (!data) return null;

  const activeClasses = data.classes.filter((c) => c.isActive);
  const totalStudents = data.classes.reduce((sum, c) => sum + c.studentCount, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-portland-dark">Welcome, {data.staff.firstName}</h1>
        <p className="text-portland-gray">Teacher Portal — {data.staff.position || "Teacher"}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <Card className="text-center">
          <p className="text-2xl font-bold text-portland-dark">{activeClasses.length}</p>
          <p className="text-xs text-portland-gray">Active Classes</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-portland-dark">{data.subjects.length}</p>
          <p className="text-xs text-portland-gray">Subjects</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-portland-dark">{totalStudents}</p>
          <p className="text-xs text-portland-gray">Total Students</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-portland-dark">{data.classes.length}</p>
          <p className="text-xs text-portland-gray">Total Classes</p>
        </Card>
      </div>

      {/* Classes */}
      <h2 className="text-lg font-semibold text-portland-dark mb-4">My Classes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {data.classes.map((cls) => (
          <Card key={cls.id}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-portland-dark">{cls.grade} — {cls.name}</h3>
                <p className="text-xs text-portland-gray">{cls.academicYear}</p>
              </div>
              {cls.isActive ? <Badge variant="success">Active</Badge> : <Badge>Past</Badge>}
            </div>
            <p className="text-sm text-portland-gray">{cls.studentCount} students</p>
            <p className="text-xs text-portland-gray mt-1">Role: {cls.role === "class_teacher" ? "Class Teacher" : "Subject Teacher"}</p>
          </Card>
        ))}
      </div>

      {/* Subjects */}
      <h2 className="text-lg font-semibold text-portland-dark mb-4">My Subjects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {data.subjects.map((subj) => (
          <Card key={subj.id}>
            <h3 className="font-semibold text-portland-dark">{subj.name}</h3>
            {subj.code && <p className="text-xs text-portland-gray">{subj.code}</p>}
          </Card>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-3 gap-4">
        <Link href="/teacher/attendance">
          <Card className="hover:shadow-md transition-shadow cursor-pointer text-center">
            <ClipboardCheck className="w-8 h-8 text-portland-red mx-auto mb-2" />
            <p className="font-medium text-portland-dark text-sm">Take Attendance</p>
          </Card>
        </Link>
        <Link href="/teacher/results">
          <Card className="hover:shadow-md transition-shadow cursor-pointer text-center">
            <BookOpen className="w-8 h-8 text-portland-red mx-auto mb-2" />
            <p className="font-medium text-portland-dark text-sm">Enter Results</p>
          </Card>
        </Link>
        <Link href="/teacher/classes">
          <Card className="hover:shadow-md transition-shadow cursor-pointer text-center">
            <Users className="w-8 h-8 text-portland-red mx-auto mb-2" />
            <p className="font-medium text-portland-dark text-sm">View Students</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
