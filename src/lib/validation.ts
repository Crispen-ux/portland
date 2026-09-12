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
