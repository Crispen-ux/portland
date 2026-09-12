import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const invitation = await db.invitation.findUnique({ where: { token } });

  if (!invitation) {
    return NextResponse.json({ error: "Invalid invitation link" }, { status: 404 });
  }

  if (invitation.acceptedAt) {
    return NextResponse.json({ error: "This invitation has already been accepted" }, { status: 400 });
  }

  if (new Date() > invitation.expiresAt) {
    return NextResponse.json({ error: "This invitation has expired" }, { status: 400 });
  }

  return NextResponse.json({
    valid: true,
    email: invitation.email,
    role: invitation.role,
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const invitation = await db.invitation.findUnique({ where: { token } });

  if (!invitation) {
    return NextResponse.json({ error: "Invalid invitation link" }, { status: 404 });
  }

  if (invitation.acceptedAt) {
    return NextResponse.json({ error: "This invitation has already been accepted" }, { status: 400 });
  }

  if (new Date() > invitation.expiresAt) {
    return NextResponse.json({ error: "This invitation has expired" }, { status: 400 });
  }

  const body = await request.json();
  const { name, password } = body;

  if (!name || !password) {
    return NextResponse.json({ error: "Name and password are required" }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  const existingUser = await db.user.findUnique({ where: { email: invitation.email } });
  if (existingUser) {
    return NextResponse.json({ error: "An account already exists for this email" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await db.user.create({
    data: {
      email: invitation.email,
      name,
      passwordHash,
      role: invitation.role as any,
    },
  });

  await db.invitation.update({
    where: { id: invitation.id },
    data: { acceptedAt: new Date() },
  });

  return NextResponse.json({
    success: true,
    message: "Account created successfully. You can now sign in.",
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  });
}
