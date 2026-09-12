import { z } from "zod";

// ─── User Management ────────────────────────────────────

export const createUserSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(1, "Name is required").max(100),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum([
    "SUPER_ADMIN",
    "SCHOOL_ADMIN",
    "PRINCIPAL",
    "TEACHER",
    "ACCOUNTANT",
    "ADMISSIONS_OFFICER",
    "PARENT",
    "STUDENT",
  ]),
});

export const updateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  role: z.enum([
    "SUPER_ADMIN",
    "SCHOOL_ADMIN",
    "PRINCIPAL",
    "TEACHER",
    "ACCOUNTANT",
    "ADMISSIONS_OFFICER",
    "PARENT",
    "STUDENT",
  ]).optional(),
  active: z.boolean().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// ─── Login ──────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

// ─── Pagination ─────────────────────────────────────────

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  search: z.string().optional(),
  sort: z.string().optional(),
  order: z.enum(["asc", "desc"]).default("desc"),
});

// ─── Admissions ─────────────────────────────────────────

export const updateAdmissionStatusSchema = z.object({
  status: z.enum([
    "NEW",
    "CONTACTED",
    "IN_PROGRESS",
    "ACCEPTED",
    "ENROLLED",
    "CLOSED",
  ]),
  notes: z.string().optional(),
});

// ─── School Structure ───────────────────────────────────

export const createAcademicYearSchema = z.object({
  name: z.string().min(1, "Year name is required"),
  startYear: z.coerce.number().min(2020).max(2100),
  endYear: z.coerce.number().min(2020).max(2100),
  active: z.boolean().optional(),
});

export const createGradeSchema = z.object({
  name: z.string().min(1, "Grade name is required"),
  phase: z.string().optional(),
  sortOrder: z.coerce.number().optional(),
});

export const createClassSchema = z.object({
  name: z.string().min(1, "Class name is required"),
  gradeId: z.string().min(1, "Grade is required"),
  academicYearId: z.string().min(1, "Academic year is required"),
  capacity: z.coerce.number().min(1).max(100).optional(),
});

export const createSubjectSchema = z.object({
  name: z.string().min(1, "Subject name is required"),
  code: z.string().optional(),
});

export const createStaffSchema = z.object({
  userId: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  position: z.string().optional(),
  staffNumber: z.string().optional(),
});

// ─── Students & Parents ─────────────────────────────────

export const createStudentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  nationality: z.string().optional(),
  idNumber: z.string().optional(),
  studentNumber: z.string().optional(),
});

export const createParentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  relationship: z.string().optional(),
});

export const linkGuardianSchema = z.object({
  guardianId: z.string().min(1, "Guardian is required"),
  isPrimary: z.boolean().optional(),
});

// ─── Enrolments ─────────────────────────────────────────

export const createEnrolmentSchema = z.object({
  studentId: z.string().min(1, "Student is required"),
  academicYearId: z.string().min(1, "Academic year is required"),
  gradeId: z.string().min(1, "Grade is required"),
  classId: z.string().optional(),
  status: z.enum(["ACTIVE", "TRANSFERRED", "WITHDRAWN", "GRADUATED"]).optional(),
});

export const updateEnrolmentSchema = z.object({
  gradeId: z.string().optional(),
  classId: z.string().optional(),
  status: z.enum(["ACTIVE", "TRANSFERRED", "WITHDRAWN", "GRADUATED"]).optional(),
});
