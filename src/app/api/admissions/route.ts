import { NextRequest, NextResponse } from "next/server";

interface Enquiry {
  id: string;
  parentName: string;
  phone: string;
  email?: string;
  childName?: string;
  grade: string;
  preferredContact: string;
  schoolVisitRequested: boolean;
  message?: string;
  source: string;
  status: string;
  createdAt: string;
}

const GRADES = [
  "Grade RR", "Grade R", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
  "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11",
];

const SOURCES = ["website", "ai-assistant", "photos", "fees", "admissions", "seo", "whatsapp"];
const CONTACT_METHODS = ["whatsapp", "phone", "email"];

// Simple in-memory store (resets on server restart)
// In production, replace with database
const enquiries: Enquiry[] = [];

function generateId(): string {
  return `PSS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}

function sanitizeInput(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim()
    .slice(0, 500);
}

function isValidSAphone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, "");
  return /^(0[6-8]\d{8}|27[6-8]\d{8})$/.test(cleaned);
}

function formatEnquiry(e: Enquiry): string {
  return [
    `NEW PORTLAND ADMISSIONS ENQUIRY`,
    ``,
    `Parent: ${e.parentName}`,
    `Child: ${e.childName || "Not provided"}`,
    `Grade: ${e.grade}`,
    `Phone: ${e.phone}`,
    `Email: ${e.email || "Not provided"}`,
    `Preferred Contact: ${e.preferredContact}`,
    `School Visit: ${e.schoolVisitRequested ? "Yes" : "No"}`,
    `Source: ${e.source}`,
    `Message: ${e.message || "None"}`,
    `Date: ${e.createdAt}`,
    `ID: ${e.id}`,
  ].join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const parentName = sanitizeInput(body.parentName);
    const phone = sanitizeInput(body.phone);
    const grade = sanitizeInput(body.grade);

    if (!parentName) {
      return NextResponse.json(
        { error: "Parent name is required." },
        { status: 400 }
      );
    }

    if (!phone || !isValidSAphone(phone)) {
      return NextResponse.json(
        { error: "A valid South African phone number is required." },
        { status: 400 }
      );
    }

    if (!grade || !GRADES.includes(grade)) {
      return NextResponse.json(
        { error: "Please select a valid grade." },
        { status: 400 }
      );
    }

    // Validate optional fields
    const email = sanitizeInput(body.email);
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const childName = sanitizeInput(body.childName);
    const message = sanitizeInput(body.message);
    const preferredContact = CONTACT_METHODS.includes(body.preferredContact)
      ? body.preferredContact
      : "whatsapp";
    const source = SOURCES.includes(body.source) ? body.source : "website";
    const schoolVisitRequested = Boolean(body.schoolVisitRequested);

    // Rate limit: max 5 enquiries per IP per hour
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const recentCount = enquiries.filter(
      (e) =>
        e.source === source &&
        new Date(e.createdAt).getTime() > Date.now() - 3600000
    ).length;

    if (recentCount >= 5) {
      return NextResponse.json(
        { error: "Too many enquiries. Please try again later." },
        { status: 429 }
      );
    }

    const enquiry: Enquiry = {
      id: generateId(),
      parentName,
      phone,
      email: email || undefined,
      childName: childName || undefined,
      grade,
      preferredContact,
      schoolVisitRequested,
      message: message || undefined,
      source,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    enquiries.push(enquiry);

    // Log the enquiry (in production, send email/notification)
    console.log("\n" + formatEnquiry(enquiry) + "\n");

    return NextResponse.json({
      success: true,
      id: enquiry.id,
      message: "Enquiry submitted successfully.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    total: enquiries.length,
    enquiries: enquiries.slice(-20).reverse(),
  });
}
