"use client";

import { useState, useEffect } from "react";
import {
  Card, PageHeader, Button, Input, Select, Badge,
  Table, TableHeader, TableBody, TableRow, TableCell,
  EmptyState, LoadingState,
} from "@/components/ui";
import { Plus, Search, GraduationCap, Edit, Trash2, X, AlertCircle, CheckCircle, Users, Link2, Unlink } from "lucide-react";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  studentNumber: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  nationality: string | null;
  idNumber: string | null;
  guardianLinks: { id: string; guardian: { id: string; firstName: string; lastName: string; phone: string; relationship: string | null }; isPrimary: boolean }[];
  enrolments: { grade: { name: string }; class: { name: string } | null; academicYear: { name: string; active: boolean }; status: string }[];
}

interface Parent { id: string; firstName: string; lastName: string; phone: string; relationship: string | null; }

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [linkingStudent, setLinkingStudent] = useState<Student | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "20", ...(search && { search }) });
      const [sRes, pRes] = await Promise.all([
        fetch(`/api/students?${params}`),
        fetch("/api/parents?limit=200"),
      ]);
      const sData = await sRes.json();
      const pData = await pRes.json();
      setStudents(sData.students);
      setTotalPages(sData.totalPages);
      setParents(pData.parents);
    } catch { setError("Failed to load data"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [page, search]);

  const handleCreate = async (data: any) => {
    const res = await fetch("/api/students", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Failed to create student" }));
      throw new Error(err.error || "Failed to create student");
    }
    setSuccess("Student added");
    setShowCreate(false);
    fetchData();
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleUpdate = async (data: any) => {
    if (!editing) return;
    const res = await fetch(`/api/students/${editing.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Failed to update student" }));
      throw new Error(err.error || "Failed to update student");
    }
    setSuccess("Student updated");
    setEditing(null);
    fetchData();
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this student? This cannot be undone.")) return;
    try {
      await fetch(`/api/students/${id}`, { method: "DELETE" });
      setSuccess("Student deleted");
      fetchData();
      setTimeout(() => setSuccess(""), 3000);
    } catch { setError("Failed to delete"); setTimeout(() => setError(""), 3000); }
  };

  const handleLinkGuardian = async (guardianId: string, isPrimary: boolean) => {
    if (!linkingStudent) return;
    try {
      const res = await fetch(`/api/students/${linkingStudent.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guardianId, isPrimary }),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error); }
      setSuccess("Guardian linked");
      setLinkingStudent(null);
      fetchData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (e: any) { setError(e.message); setTimeout(() => setError(""), 3000); }
  };

  const handleUnlinkGuardian = async (studentId: string, guardianId: string) => {
    if (!confirm("Unlink this guardian?")) return;
    try {
      await fetch(`/api/students/${studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guardianId }),
      });
      setSuccess("Guardian unlinked");
      fetchData();
      setTimeout(() => setSuccess(""), 3000);
    } catch { setError("Failed to unlink"); setTimeout(() => setError(""), 3000); }
  };

  const activeEnrolment = (s: Student) => s.enrolments.find((e) => e.academicYear.active && e.status === "ACTIVE");

  return (
    <div>
      <PageHeader
        title="Students"
        description="Manage student records, enrolments, and guardian links."
        action={<Button onClick={() => setShowCreate(true)} icon={<Plus className="w-4 h-4" />}>Add Student</Button>}
      />

      {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3"><AlertCircle className="w-5 h-5 text-red-500 shrink-0" /><p className="text-sm text-red-700">{error}</p></div>}
      {success && <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-500 shrink-0" /><p className="text-sm text-green-700">{success}</p></div>}

      <Card padding={false}>
        <div className="p-4 border-b border-portland-mid/30">
          <div className="flex items-center gap-2 bg-portland-light rounded-xl px-4 py-2 max-w-sm">
            <Search className="w-4 h-4 text-portland-gray" />
            <input type="text" placeholder="Search by name or number..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="bg-transparent text-sm text-portland-dark placeholder:text-portland-gray/50 focus:outline-none w-full" />
          </div>
        </div>

        {loading ? <LoadingState /> : students.length === 0 ? (
          <EmptyState icon={<GraduationCap className="w-6 h-6 text-portland-gray" />} title="No students found" description="Add your first student to get started." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="font-semibold text-portland-dark">Student</TableCell>
                <TableCell className="font-semibold text-portland-dark">Number</TableCell>
                <TableCell className="font-semibold text-portland-dark">Current Grade</TableCell>
                <TableCell className="font-semibold text-portland-dark">Guardians</TableCell>
                <TableCell className="font-semibold text-portland-dark">Status</TableCell>
                <TableCell className="font-semibold text-portland-dark text-right">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((s) => {
                const ae = activeEnrolment(s);
                return (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-portland-dark">{s.firstName} {s.lastName}</p>
                        {s.gender && <p className="text-xs text-portland-gray">{s.gender}{s.dateOfBirth ? ` · ${new Date(s.dateOfBirth).toLocaleDateString("en-ZA")}` : ""}</p>}
                      </div>
                    </TableCell>
                    <TableCell className="text-portland-gray font-mono text-sm">{s.studentNumber || "—"}</TableCell>
                    <TableCell>{ae ? <Badge variant="info">{ae.grade.name}{ae.class ? ` ${ae.class.name}` : ""}</Badge> : <Badge>No Active Enrolment</Badge>}</TableCell>
                    <TableCell>
                      {s.guardianLinks.length === 0 ? (
                        <button onClick={() => setLinkingStudent(s)} className="text-xs text-portland-red hover:underline flex items-center gap-1"><Link2 className="w-3 h-3" />Link Parent</button>
                      ) : (
                        <div className="space-y-0.5">
                          {s.guardianLinks.map((gl) => (
                            <div key={gl.id} className="flex items-center gap-1 text-xs">
                              <span className="text-portland-dark">{gl.guardian.firstName} {gl.guardian.lastName}</span>
                              {gl.isPrimary && <Badge variant="success">Primary</Badge>}
                              <button onClick={() => handleUnlinkGuardian(s.id, gl.guardian.id)} className="text-red-400 hover:text-red-600"><Unlink className="w-3 h-3" /></button>
                            </div>
                          ))}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{ae ? <Badge variant="success">Enrolled</Badge> : <Badge>Inactive</Badge>}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setEditing(s)} className="p-2 hover:bg-portland-light rounded-lg"><Edit className="w-4 h-4 text-portland-gray" /></button>
                        <button onClick={() => handleDelete(s.id)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-red-500" /></button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-portland-mid/30">
            <span className="text-sm text-portland-gray">Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Previous</Button>
              <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</Button>
            </div>
          </div>
        )}
      </Card>

      {(showCreate || editing) && (
        <StudentModal student={editing} error={error} setError={setError} onSubmit={editing ? handleUpdate : handleCreate} onClose={() => { setShowCreate(false); setEditing(null); setError(""); }} />
      )}

      {linkingStudent && (
        <LinkGuardianModal student={linkingStudent} parents={parents} onLink={handleLinkGuardian} onClose={() => setLinkingStudent(null)} />
      )}
    </div>
  );
}

function StudentModal({ student, error, setError, onSubmit, onClose }: { student: any; error?: string; setError?: (msg: string) => void; onSubmit: (d: any) => void; onClose: () => void }) {
  const [firstName, setFirstName] = useState(student?.firstName || "");
  const [lastName, setLastName] = useState(student?.lastName || "");
  const [dateOfBirth, setDateOfBirth] = useState(student?.dateOfBirth ? new Date(student.dateOfBirth).toISOString().split("T")[0] : "");
  const [gender, setGender] = useState(student?.gender || "");
  const [nationality, setNationality] = useState(student?.nationality || "");
  const [idNumber, setIdNumber] = useState(student?.idNumber || "");
  const [studentNumber, setStudentNumber] = useState(student?.studentNumber || "");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({ firstName, lastName, dateOfBirth: dateOfBirth || undefined, gender: gender || undefined, nationality: nationality || undefined, idNumber: idNumber || undefined, studentNumber: studentNumber || undefined });
    } catch (err: any) {
      setError?.(err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-lg mx-4 shadow-xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-portland-dark">{student ? "Edit Student" : "Add Student"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-portland-light rounded-lg"><X className="w-4 h-4" /></button>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <Input label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Date of Birth" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
            <Select label="Gender" value={gender} onChange={(e) => setGender(e.target.value)} options={[{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }]} placeholder="Select gender" />
          </div>
          <Input label="Nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} placeholder="e.g. South African" />
          <Input label="ID Number" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} placeholder="SA ID number" />
          <Input label="Student Number" value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} placeholder="Auto-generated if blank" />
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={submitting}>Cancel</Button>
            <Button type="submit" className="flex-1" disabled={submitting}>{submitting ? "Saving..." : student ? "Save" : "Add Student"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function LinkGuardianModal({ student, parents, onLink, onClose }: { student: Student; parents: Parent[]; onLink: (id: string, primary: boolean) => void; onClose: () => void }) {
  const [selectedGuardian, setSelectedGuardian] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);

  const linkedIds = student.guardianLinks.map((gl) => gl.guardian.id);
  const available = parents.filter((p) => !linkedIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-portland-dark">Link Guardian to {student.firstName}</h2>
          <button onClick={onClose} className="p-2 hover:bg-portland-light rounded-lg"><X className="w-4 h-4" /></button>
        </div>
        {available.length === 0 ? (
          <p className="text-sm text-portland-gray mb-4">All existing parents are already linked to this student. Create a new parent first.</p>
        ) : (
          <div className="space-y-4">
            <Select label="Parent/Guardian" value={selectedGuardian} onChange={(e) => setSelectedGuardian(e.target.value)} options={available.map((p) => ({ value: p.id, label: `${p.firstName} ${p.lastName} — ${p.phone}` }))} placeholder="Select parent" />
            <label className="flex items-center gap-2 text-sm text-portland-dark">
              <input type="checkbox" checked={isPrimary} onChange={(e) => setIsPrimary(e.target.checked)} className="rounded border-portland-mid" />
              Mark as primary contact
            </label>
          </div>
        )}
        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          <Button onClick={() => { if (selectedGuardian) onLink(selectedGuardian, isPrimary); }} disabled={!selectedGuardian} className="flex-1">Link</Button>
        </div>
      </div>
    </div>
  );
}
