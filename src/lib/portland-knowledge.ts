import { SITE } from "./constants";

export const KNOWLEDGE = {
  school: {
    name: SITE.name,
    tagline: SITE.tagline,
    grades: SITE.grades,
    curriculum: SITE.curriculum,
    language: "English-Medium",
    philosophy: "We believe that education is about more than marks. It is about developing knowledge, character, confidence, discipline and the skills needed for life beyond school.",
  },

  fees: {
    gradeRRto7: { amount: "R800", period: "per month", grades: "Grade RR – Grade 7" },
    grade8to11: { amount: "R900", period: "per month", grades: "Grade 8 – Grade 11" },
    registration: { amount: "R500", period: "once-off" },
    sportsLevy: { amount: "R300", period: "per year" },
    uniform: "Free — included with every enrolment",
  },

  admissions: {
    status: "Open",
    grades: SITE.grades,
    steps: [
      "Contact us via WhatsApp or phone",
      "Visit the school to see our facilities",
      "Complete the application form",
      "Submit required documents",
    ],
    documents: [
      "Copy of birth certificate",
      "Proof of immunization",
      "Copies of both parents'/guardians' IDs",
      "Latest school report (if applicable)",
      "Transfer documents (if applicable)",
    ],
    note: "No copies will be made at the school office.",
  },

  hours: {
    doorsOpen: "7:00 AM",
    schoolStarts: "7:30 AM",
    primaryEnds: "2:30 PM",
    highSchoolEnds: "3:30 PM",
    officeHours: "7:00 AM – 4:00 PM",
  },

  location: {
    address: SITE.address,
    addressLine2: SITE.addressLine2,
    city: SITE.city,
    full: `${SITE.address}, ${SITE.addressLine2}, ${SITE.city}`,
    mapsQuery: "188 Commissioner Street, Corner Commissioner and Polly Street, Johannesburg",
  },

  sports: [
    "Soccer",
    "Netball",
    "Athletics",
    "Female Soccer",
  ],

  activities: [
    "Chess",
    "Dancing",
    "Bible Study",
    "Drama",
    "Modelling",
  ],

  technology: {
    computers: "Building digital literacy and technology skills for today's world",
    robotics: "Encouraging innovation, creativity and problem-solving",
  },

  contact: {
    phone: SITE.phone,
    whatsapp: SITE.whatsappLink,
    email: SITE.email,
  },

  values: [
    "Respect",
    "Responsibility",
    "Excellence",
    "Integrity",
    "Kindness",
    "Discipline",
  ],

  transport: "School transport is available for families who need them. Contact us for routes and availability.",

  bullying: "Portland has a zero-tolerance approach to bullying. Every child is safe, respected, and protected.",

  lunch: "Learners bring their own lunch. Please ensure your child has a packed lunch and water bottle.",

  calendar: {
    term1: "January – March",
    term2: "April – June",
    term3: "July – September",
    term4: "October – December",
    note: "Exact dates are communicated at the start of each year.",
  },
} as const;

export type KnowledgeKey = keyof typeof KNOWLEDGE;
