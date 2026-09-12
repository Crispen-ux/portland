"use client";

import { useState, useEffect } from "react";
import { Card, Badge, LoadingState } from "@/components/ui";
import { Users, ClipboardCheck, BookOpen, DollarSign, AlertCircle } from "lucide-react";
import Link from "next/link";

interface Child {
  id: string;
  firstName: string;
  lastName: string;
  studentNumber: string | null;
  gender: string | null;
  isPrimary: boolean;
  activeEnrolment: { grade: { name: string }; class: { name: string } | null } | null;
}

function formatCurrency(amount: number) {
  return `R ${amount.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function ParentDashboard() {
  const [data, setData] = useState<{ parent: any; children: Child[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/parent")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError("Failed to load data"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"><AlertCircle className="w-5 h-5 text-red-500 shrink-0" /><p className="text-sm text-red-700">{error}</p></div>;
  if (!data) return null;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-portland-dark">Welcome, {data.parent.firstName}</h1>
        <p className="text-portland-gray">Parent Portal — {data.parent.relationship || "Parent"}</p>
      </div>

      {/* Children overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {data.children.map((child) => (
          <Card key={child.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-portland-dark">{child.firstName} {child.lastName}</h3>
                {child.studentNumber && <p className="text-xs text-portland-gray">{child.studentNumber}</p>}
              </div>
              {child.isPrimary && <Badge variant="success">Primary</Badge>}
            </div>
            {child.activeEnrolment ? (
              <div className="space-y-1">
                <p className="text-sm text-portland-gray">Grade: <span className="text-portland-dark font-medium">{child.activeEnrolment.grade.name}</span></p>
                {child.activeEnrolment.class && (
                  <p className="text-sm text-portland-gray">Class: <span className="text-portland-dark font-medium">{child.activeEnrolment.class.name}</span></p>
                )}
              </div>
            ) : (
              <p className="text-sm text-portland-gray">No active enrolment</p>
            )}
          </Card>
        ))}
      </div>

      {data.children.length === 0 && (
        <Card>
          <p className="text-portland-gray text-center py-8">No children linked to your account. Please contact the school office.</p>
        </Card>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/parent/attendance">
          <Card className="hover:shadow-md transition-shadow cursor-pointer text-center">
            <ClipboardCheck className="w-8 h-8 text-portland-red mx-auto mb-2" />
            <p className="font-medium text-portland-dark text-sm">Attendance</p>
          </Card>
        </Link>
        <Link href="/parent/results">
          <Card className="hover:shadow-md transition-shadow cursor-pointer text-center">
            <BookOpen className="w-8 h-8 text-portland-red mx-auto mb-2" />
            <p className="font-medium text-portland-dark text-sm">Results</p>
          </Card>
        </Link>
        <Link href="/parent/invoices">
          <Card className="hover:shadow-md transition-shadow cursor-pointer text-center">
            <DollarSign className="w-8 h-8 text-portland-red mx-auto mb-2" />
            <p className="font-medium text-portland-dark text-sm">Invoices</p>
          </Card>
        </Link>
        <Link href="/parent/children">
          <Card className="hover:shadow-md transition-shadow cursor-pointer text-center">
            <Users className="w-8 h-8 text-portland-red mx-auto mb-2" />
            <p className="font-medium text-portland-dark text-sm">My Children</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
