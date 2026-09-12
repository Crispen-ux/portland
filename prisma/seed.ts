import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...\n");

  // Create school
  const school = await prisma.school.upsert({
    where: { id: "portland-main" },
    update: {},
    create: {
      id: "portland-main",
      name: "Portland Group of Schools",
      address: "188 Commissioner Street",
      city: "Johannesburg",
      phone: "+27 82 815 4388",
      email: "info@portlandschools.co.za",
    },
  });
  console.log("✅ School:", school.name);

  // Create academic year
  const academicYear = await prisma.academicYear.upsert({
    where: { id: "year-2027" },
    update: {},
    create: {
      id: "year-2027",
      schoolId: school.id,
      name: "2027",
      startYear: 2027,
      endYear: 2028,
      active: true,
    },
  });
  console.log("✅ Academic Year:", academicYear.name);

  // Create grades
  const gradeNames = [
    "Grade RR", "Grade R", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
    "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11",
  ];

  const phases: Record<string, string> = {
    "Grade RR": "Early Years",
    "Grade R": "Early Years",
    "Grade 1": "Primary Phase",
    "Grade 2": "Primary Phase",
    "Grade 3": "Primary Phase",
    "Grade 4": "Primary Phase",
    "Grade 5": "Primary Phase",
    "Grade 6": "Primary Phase",
    "Grade 7": "Primary Phase",
    "Grade 8": "High School",
    "Grade 9": "High School",
    "Grade 10": "High School",
    "Grade 11": "High School",
  };

  const grades = [];
  for (let i = 0; i < gradeNames.length; i++) {
    const grade = await prisma.grade.upsert({
      where: { id: `grade-${i}` },
      update: {},
      create: {
        id: `grade-${i}`,
        schoolId: school.id,
        name: gradeNames[i],
        phase: phases[gradeNames[i]],
        sortOrder: i,
      },
    });
    grades.push(grade);
  }
  console.log("✅ Grades:", grades.length, "created");

  // Create demo admin user
  const adminPasswordHash = await bcrypt.hash("admin123", 12);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@portlandschools.co.za" },
    update: {},
    create: {
      email: "admin@portlandschools.co.za",
      name: "Admin User",
      passwordHash: adminPasswordHash,
      role: "SCHOOL_ADMIN",
    },
  });
  console.log("✅ Admin user:", adminUser.email);

  // Create demo teacher user
  const teacherPasswordHash = await bcrypt.hash("teacher123", 12);
  const teacherUser = await prisma.user.upsert({
    where: { email: "teacher@portlandschools.co.za" },
    update: {},
    create: {
      email: "teacher@portlandschools.co.za",
      name: "Demo Teacher",
      passwordHash: teacherPasswordHash,
      role: "TEACHER",
    },
  });
  console.log("✅ Teacher user:", teacherUser.email);

  // Create staff record for teacher
  const staff = await prisma.staff.upsert({
    where: { id: "staff-1" },
    update: {},
    create: {
      id: "staff-1",
      userId: teacherUser.id,
      schoolId: school.id,
      staffNumber: "TCH001",
      firstName: "Demo",
      lastName: "Teacher",
      phone: "+27 82 000 0001",
      position: "Teacher",
    },
  });
  console.log("✅ Staff:", staff.firstName, staff.lastName);

  // Create demo parent user
  const parentPasswordHash = await bcrypt.hash("parent123", 12);
  const parentUser = await prisma.user.upsert({
    where: { email: "parent@portlandschools.co.za" },
    update: {},
    create: {
      email: "parent@portlandschools.co.za",
      name: "Demo Parent",
      passwordHash: parentPasswordHash,
      role: "PARENT",
    },
  });
  console.log("✅ Parent user:", parentUser.email);

  // Create ParentGuardian record linked to user
  const guardian = await prisma.parentGuardian.upsert({
    where: { userId: parentUser.id },
    update: {},
    create: {
      userId: parentUser.id,
      firstName: "Demo",
      lastName: "Parent",
      phone: "+27 82 000 0002",
      email: "parent@portlandschools.co.za",
      relationship: "Mother",
    },
  });
  console.log("✅ Guardian record:", guardian.firstName, guardian.lastName);

  // Create demo students
  const students = [];
  for (let i = 1; i <= 5; i++) {
    const student = await prisma.student.upsert({
      where: { id: `student-${i}` },
      update: {},
      create: {
        id: `student-${i}`,
        studentNumber: `PSS2027${String(i).padStart(4, "0")}`,
        firstName: `Demo Student`,
        lastName: `${String(i).padStart(2, "0")}`,
        gender: i % 2 === 0 ? "Female" : "Male",
      },
    });
    students.push(student);
  }
  console.log("✅ Students:", students.length, "created");

  // Create parent-guardian links
  for (const student of students.slice(0, 2)) {
    await prisma.studentGuardian.upsert({
      where: { id: `link-${student.id}-${guardian.id}` },
      update: {},
      create: {
        id: `link-${student.id}-${guardian.id}`,
        studentId: student.id,
        guardianId: guardian.id,
        isPrimary: true,
      },
    });
  }
  console.log("✅ Parent-student links created");

  // Create enrolments for demo students
  for (let i = 0; i < students.length; i++) {
    await prisma.enrolment.upsert({
      where: { id: `enrolment-${students[i].id}` },
      update: {},
      create: {
        id: `enrolment-${students[i].id}`,
        studentId: students[i].id,
        academicYearId: academicYear.id,
        gradeId: grades[i + 2].id, // Start from Grade 1
        status: "ACTIVE",
      },
    });
  }
  console.log("✅ Enrolments created");

  // Create subjects
  const subjectNames = ["Mathematics", "English", "Afrikaans", "Science", "Social Studies", "Life Skills"];
  const subjects = [];
  for (let i = 0; i < subjectNames.length; i++) {
    const subject = await prisma.subject.upsert({
      where: { id: `subject-${i}` },
      update: {},
      create: {
        id: `subject-${i}`,
        schoolId: school.id,
        name: subjectNames[i],
      },
    });
    subjects.push(subject);
  }
  console.log("✅ Subjects:", subjects.length, "created");

  console.log("\n🎉 Seed complete!\n");
  console.log("📋 Demo credentials:");
  console.log("   Admin:   admin@portlandschools.co.za / admin123");
  console.log("   Teacher: teacher@portlandschools.co.za / teacher123");
  console.log("   Parent:  parent@portlandschools.co.za / parent123");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
