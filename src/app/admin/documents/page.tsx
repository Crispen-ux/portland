"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card, PageHeader, Button, Input, Select, Badge,
  Table, TableHeader, TableBody, TableRow, TableCell,
  EmptyState, LoadingState,
} from "@/components/ui";
import {
  FileText, Download, Trash2, Plus, Filter,
  AlertCircle, CheckCircle, ExternalLink, X,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  studentNumber: string | null;
}

interface AcademicYear {
  id: string;
  name: string;
  isCurrent: boolean;
}

interface Document {
  id: string;
  type: string;
  title: string;
  student: { id: string; firstName: string; lastName: string };
  academicYear: { id: string; name: string } | null;
  createdAt: string;
}

// ─── Constants ──────────────────────────────────────────

const DOCUMENT_TYPES = [
  { value: "INVOICE", label: "Invoice" },
  { value: "TRANSCRIPT", label: "Transcript" },
  { value: "REPORT_CARD", label: "Report Card" },
  { value: "STATEMENT", label: "Statement" },
  { value: "RECEIPT", label: "Receipt" },
];

const TYPE_BADGE_VARIANT: Record<string, string> = {
  INVOICE: "bg-blue-50 text-blue-700",
  TRANSCRIPT: "bg-green-50 text-green-700",
  REPORT_CARD: "bg-purple-50 text-purple-700",
  STATEMENT: "bg-amber-50 text-amber-700",
  RECEIPT: "bg-teal-50 text-teal-700",
};

// ─── Helpers ────────────────────────────────────────────

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatType(type: string) {
  return DOCUMENT_TYPES.find((t) => t.value === type)?.label || type;
}

// ─── Page ───────────────────────────────────────────────

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [documentsLoading, setDocumentsLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  // Form state
  const [docType, setDocType] = useState("INVOICE");
  const [studentId, setStudentId] = useState("");
  const [academicYearId, setAcademicYearId] = useState("");

  const fetchStudents = useCallback(async () => {
    try {
      const res = await fetch("/api/students");
      const data = await res.json();
      setStudents(data.students || []);
    } catch {
      setError("Failed to load students");
    }
  }, []);

  const fetchAcademicYears = useCallback(async () => {
    try {
      const res = await fetch("/api/academic-years");
      const data = await res.json();
      const years = data.academicYears || data.years || [];
      setAcademicYears(years);
      const current = years.find((y: AcademicYear) => y.isCurrent);
      if (current) setAcademicYearId(current.id);
    } catch {
      setError("Failed to load academic years");
    }
  }, []);

  const fetchDocuments = useCallback(async () => {
    setDocumentsLoading(true);
    try {
      const params = new URLSearchParams();
      if (typeFilter !== "ALL") params.set("type", typeFilter);
      const res = await fetch(`/api/documents?${params}`);
      const data = await res.json();
      setDocuments(data.documents || []);
    } catch {
      setError("Failed to load documents");
    } finally {
      setDocumentsLoading(false);
    }
  }, [typeFilter]);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchStudents(), fetchAcademicYears(), fetchDocuments()]);
      setLoading(false);
    };
    init();
  }, [fetchStudents, fetchAcademicYears, fetchDocuments]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId) {
      setError("Please select a student");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setGenerating(true);
    setError("");
    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: docType, studentId, academicYearId: academicYearId || undefined }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to generate document");
      }
      setSuccess("Document generated successfully");
      fetchDocuments();
      setTimeout(() => setSuccess(""), 3000);
    } catch (e: any) {
      setError(e.message || "Failed to generate document");
      setTimeout(() => setError(""), 3000);
    } finally {
      setGenerating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this document?")) return;
    try {
      const res = await fetch(`/api/documents/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete document");
      setSuccess("Document deleted successfully");
      fetchDocuments();
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Failed to delete document");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div>
      <PageHeader
        title="Documents"
        description="Generate and manage school documents."
      />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}

      {loading ? (
        <LoadingState message="Loading documents..." />
      ) : (
        <>
          {/* ── Generate Document ──────────────────────────── */}
          <Card className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-portland-red/10">
                <Plus className="w-5 h-5 text-portland-red" />
              </div>
              <h2 className="text-lg font-semibold text-portland-dark">Generate Document</h2>
            </div>
            <form onSubmit={handleGenerate} className="flex flex-wrap items-end gap-4">
              <div className="w-44">
                <Select
                  label="Document Type"
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  options={DOCUMENT_TYPES}
                  required
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <Select
                  label="Student"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  options={students.map((s) => ({
                    value: s.id,
                    label: `${s.firstName} ${s.lastName}${s.studentNumber ? ` (${s.studentNumber})` : ""}`,
                  }))}
                  placeholder={students.length === 0 ? "No students available" : "Select a student"}
                  required
                />
              </div>
              <div className="w-44">
                <Select
                  label="Academic Year"
                  value={academicYearId}
                  onChange={(e) => setAcademicYearId(e.target.value)}
                  options={academicYears.map((y) => ({
                    value: y.id,
                    label: y.name + (y.isCurrent ? " (Current)" : ""),
                  }))}
                  placeholder={academicYears.length === 0 ? "No academic years" : "Select year"}
                />
              </div>
              <Button type="submit" disabled={generating} icon={<FileText className="w-4 h-4" />}>
                {generating ? "Generating..." : "Generate"}
              </Button>
            </form>
          </Card>

          {/* ── Documents List ─────────────────────────────── */}
          <Card padding={false}>
            <div className="p-4 border-b border-portland-mid/30 flex items-center gap-4">
              <Filter className="w-4 h-4 text-portland-gray" />
              <div className="flex gap-2">
                <button
                  onClick={() => setTypeFilter("ALL")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    typeFilter === "ALL"
                      ? "bg-portland-red text-white"
                      : "bg-portland-light text-portland-gray hover:text-portland-dark"
                  }`}
                >
                  All
                </button>
                {DOCUMENT_TYPES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTypeFilter(t.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      typeFilter === t.value
                        ? "bg-portland-red text-white"
                        : "bg-portland-light text-portland-gray hover:text-portland-dark"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {documentsLoading ? (
              <LoadingState message="Loading documents..." />
            ) : documents.length === 0 ? (
              <EmptyState
                icon={<FileText className="w-6 h-6 text-portland-gray" />}
                title="No documents found"
                description="Generate your first document using the form above."
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell className="font-semibold text-portland-dark">Type</TableCell>
                    <TableCell className="font-semibold text-portland-dark">Title</TableCell>
                    <TableCell className="font-semibold text-portland-dark">Student</TableCell>
                    <TableCell className="font-semibold text-portland-dark">Academic Year</TableCell>
                    <TableCell className="font-semibold text-portland-dark">Date Generated</TableCell>
                    <TableCell className="font-semibold text-portland-dark text-right">Actions</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${TYPE_BADGE_VARIANT[doc.type] || "bg-gray-50 text-gray-700"}`}>
                          {formatType(doc.type)}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium text-portland-dark">{doc.title}</TableCell>
                      <TableCell className="text-portland-dark">
                        {doc.student.firstName} {doc.student.lastName}
                      </TableCell>
                      <TableCell className="text-portland-gray text-sm">
                        {doc.academicYear?.name || "—"}
                      </TableCell>
                      <TableCell className="text-portland-gray text-sm">{formatDate(doc.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <a
                            href={`/api/documents/download/${doc.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-portland-light rounded-lg"
                            title="Download document"
                          >
                            <Download className="w-4 h-4 text-portland-gray" />
                          </a>
                          <button
                            onClick={() => handleDelete(doc.id)}
                            className="p-2 hover:bg-red-50 rounded-lg"
                            title="Delete document"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
