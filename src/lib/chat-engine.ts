import { KNOWLEDGE } from "./portland-knowledge";
import { SITE } from "./constants";

export type Intent =
  | "greeting"
  | "fees"
  | "grade_specific"
  | "enrol"
  | "admissions"
  | "documents"
  | "hours"
  | "location"
  | "directions"
  | "sports"
  | "activities"
  | "technology"
  | "robotics"
  | "curriculum"
  | "uniform"
  | "transport"
  | "contact"
  | "whatsapp"
  | "visit"
  | "call"
  | "values"
  | "safety"
  | "bullying"
  | "teachers"
  | "lunch"
  | "calendar"
  | "terms"
  | "sports_levy"
  | "payment"
  | "thanks"
  | "goodbye"
  | "human"
  | "unknown";

interface MatchResult {
  intent: Intent;
  confidence: number;
}

const PATTERNS: { intent: Intent; patterns: RegExp[] }[] = [
  {
    intent: "greeting",
    patterns: [
      /\b(hi|hello|hey|good\s*morning|good\s*afternoon|good\s*evening|sup|yo|hola|howzit)\b/i,
    ],
  },
  {
    intent: "fees",
    patterns: [
      /\b(fee|fees|cost|price|pay|payment|how\s*much|afford|monthly|annual|rate|charges?)\b/i,
    ],
  },
  {
    intent: "grade_specific",
    patterns: [
      /\b(grade\s*(rr|r|0|1|2|3|4|5|6|7|8|9|10|11|12)|gr\s*\d|what\s*grade|which\s*grade|my\s*child|little\s*one|old\s*enough|age)\b/i,
    ],
  },
  {
    intent: "enrol",
    patterns: [
      /\b(enrol|enroll|enrolment|enrollment|register|sign\s*up|join|apply|application|how\s*do\s*i\s*(enrol|enroll|register|apply))\b/i,
    ],
  },
  {
    intent: "admissions",
    patterns: [
      /\b(admission|admissions|available|accept|intake|space| vacancy)\b/i,
    ],
  },
  {
    intent: "documents",
    patterns: [
      /\b(document|documents|papers|requirements|what\s*do\s*i\s*need|bring|submit)\b/i,
    ],
  },
  {
    intent: "hours",
    patterns: [
      /\b(time|hours|when|open|close|start|finish|school\s*day|operating|morning|afternoon|what\s*time)\b/i,
    ],
  },
  {
    intent: "location",
    patterns: [
      /\b(location|address|where|find|map|get\s*there|direction|corner|street|locate)\b/i,
    ],
  },
  {
    intent: "directions",
    patterns: [
      /\b(direction|get\s*directions|how\s*do\s*i\s*get|route|navigate)\b/i,
    ],
  },
  {
    intent: "sports",
    patterns: [
      /\b(sport|sports|soccer|netball|athletics|extra\s*mural|extramural|physical)\b/i,
    ],
  },
  {
    intent: "activities",
    patterns: [
      /\b(activity|activities|club|clubs|chess|dancing|drama|modelling|bible)\b/i,
    ],
  },
  {
    intent: "technology",
    patterns: [
      /\b(computer|computers|technology|tech|coding|stem|digital)\b/i,
    ],
  },
  {
    intent: "robotics",
    patterns: [
      /\b(robot|robotics|robotics programme)\b/i,
    ],
  },
  {
    intent: "curriculum",
    patterns: [
      /\b(curriculum|syllabus|academics|teach|teaching|education|caps|english|learn|learning|academic)\b/i,
    ],
  },
  {
    intent: "uniform",
    patterns: [
      /\b(uniform|clothes|clothing|dress\s*code|attire|wear|outfit)\b/i,
    ],
  },
  {
    intent: "transport",
    patterns: [
      /\b(transport|bus|taxi|pick\s*up|drop\s*off|commute|ride|shuttle)\b/i,
    ],
  },
  {
    intent: "contact",
    patterns: [
      /\b(contact|phone|call|whatsapp|email|reach|number|get\s*in\s*touch)\b/i,
    ],
  },
  {
    intent: "whatsapp",
    patterns: [
      /\b(whatsapp|wa\s*me|message\s*on|send\s*whatsapp)\b/i,
    ],
  },
  {
    intent: "visit",
    patterns: [
      /\b(visit|tour|see\s*the\s*school|come\s*see|check\s*out|school\s*visit|come\s*visit)\b/i,
    ],
  },
  {
    intent: "call",
    patterns: [
      /\b(call\s*the|phone\s*the|ring|dial)\b/i,
    ],
  },
  {
    intent: "values",
    patterns: [
      /\b(value|values|ethos|believe|belief|mission|vision|promise|principle)\b/i,
    ],
  },
  {
    intent: "safety",
    patterns: [
      /\b(safe|safety|secure|protection|protected)\b/i,
    ],
  },
  {
    intent: "bullying",
    patterns: [
      /\b(bully|bullying|harass|harassment)\b/i,
    ],
  },
  {
    intent: "teachers",
    patterns: [
      /\b(teacher|teachers|staff|qualified|dedicated|educator|educators)\b/i,
    ],
  },
  {
    intent: "lunch",
    patterns: [
      /\b(lunch|food|meal|canteen|cafeteria|eat|break|snack)\b/i,
    ],
  },
  {
    intent: "calendar",
    patterns: [
      /\b(term|terms|holiday|holidays|break|calendar|schedule|semester|vacation)\b/i,
    ],
  },
  {
    intent: "sports_levy",
    patterns: [
      /\b(sport\s*levy|sports\s*levy|extra\s*cost|additional\s*cost|activity\s*fee)\b/i,
    ],
  },
  {
    intent: "payment",
    patterns: [
      /\b(payment\s*method|how\s*do\s*i\s*pay|bank|eft|cash|debit|pay\s*via)\b/i,
    ],
  },
  {
    intent: "thanks",
    patterns: [
      /\b(thank|thanks|appreciate|helpful|cheers)\b/i,
    ],
  },
  {
    intent: "goodbye",
    patterns: [
      /\b(bye|goodbye|see\s*you|later|got\s*to\s*go)\b/i,
    ],
  },
  {
    intent: "human",
    patterns: [
      /\b(speak\s*to\s*(a\s*)?human|talk\s*to\s*(a\s*)?person|real\s*person|speak\s*to\s*someone|manager|principal|complain|complaint|feedback)\b/i,
    ],
  },
];

export function matchIntent(input: string): MatchResult {
  const lower = input.toLowerCase().trim();

  let bestIntent: Intent = "unknown";
  let bestScore = 0;

  for (const { intent, patterns } of PATTERNS) {
    for (const pattern of patterns) {
      const match = lower.match(pattern);
      if (match) {
        const score = match[0].length;
        if (score > bestScore) {
          bestScore = score;
          bestIntent = intent;
        }
      }
    }
  }

  return { intent: bestIntent, confidence: bestScore > 0 ? 1 : 0 };
}

export function getGradeGroup(gradeInput: string): "rr7" | "811" | "unknown" {
  const lower = gradeInput.toLowerCase();

  // Grade RR, R, 0-7 → R800 group
  if (/\b(rr|r|0|1|2|3|4|5|6|7)\b/.test(lower)) return "rr7";

  // Grade 8-11 → R900 group
  if (/\b(8|9|10|11|12)\b/.test(lower)) return "811";

  return "unknown";
}

export function generateResponse(
  intent: Intent,
  input: string,
  context: { lastIntent?: Intent; lastGradeGroup?: string }
): { text: string; followUp: string[] } {
  const K = KNOWLEDGE;

  switch (intent) {
    case "greeting":
      return {
        text: `Hi! I'm the Portland Assistant 👋\n\nHow can I help you today? I can tell you about our fees, admissions, school hours, activities, and more.`,
        followUp: ["School Fees", "How to Enrol", "School Hours", "Location"],
      };

    case "fees":
      return {
        text: `Portland Schools fees are currently:\n\n• Grade RR – Grade 7: ${K.fees.gradeRRto7.amount}/month\n• Grade 8 – Grade 11: ${K.fees.grade8to11.amount}/month\n• Registration: ${K.fees.registration.amount} once-off\n• Sports Levy: ${K.fees.sportsLevy.amount}/year\n• School Uniform: ${K.fees.uniform}\n\nWould you like to know how to enrol?`,
        followUp: ["How to Enrol", "Book a Visit", "Contact Admissions"],
      };

    case "grade_specific": {
      const group = getGradeGroup(input);
      if (group === "rr7") {
        return {
          text: `Grade 5 (and Grade RR through Grade 7) falls within our Foundation and Primary phases.\n\nFees: ${K.fees.gradeRRto7.amount}/month\nSchool Uniform: Free\n\nWould you like to know about enrolment?`,
          followUp: ["How to Enrol", "What documents do I need?"],
        };
      }
      if (group === "811") {
        return {
          text: `That grade falls within our High School phase (Grade 8–11).\n\nFees: ${K.fees.grade8to11.amount}/month\nSchool Uniform: Free\n\nWould you like to know about enrolment?`,
          followUp: ["How to Enrol", "What documents do I need?"],
        };
      }
      return {
        text: `Portland offers Grade RR through Grade 11.\n\n• Foundation Phase: Grade RR – Grade 3\n• Primary Phase: Grade 4 – Grade 7\n• High School: Grade 8 – Grade 11\n\nWhich grade is your child in? I can tell you the specific fees.`,
        followUp: ["School Fees", "How to Enrol"],
      };
    }

    case "enrol":
    case "admissions":
      return {
        text: `Enrolling at Portland is easy!\n\n${K.admissions.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\nAdmissions are currently ${K.admissions.status} for ${K.admissions.grades}.`,
        followUp: ["What documents do I need?", "School Fees", "Book a Visit"],
      };

    case "documents":
      return {
        text: `You'll need these documents:\n\n${K.admissions.documents.map((d) => `• ${d}`).join("\n")}\n\n${K.admissions.note}`,
        followUp: ["How to Enrol", "School Fees"],
      };

    case "hours":
      return {
        text: `School hours:\n\n• Doors open: ${K.hours.doorsOpen}\n• School starts: ${K.hours.schoolStarts}\n• Primary ends: ${K.hours.primaryEnds}\n• High School ends: ${K.hours.highSchoolEnds}\n\nOffice hours: ${K.hours.officeHours}`,
        followUp: ["Location", "How to Enrol"],
      };

    case "location":
      return {
        text: `We're located at:\n\n${K.location.address}\n${K.location.addressLine2}\n${K.location.city}\n\nEasy to find in the heart of Johannesburg CBD!`,
        followUp: ["Get Directions", "School Hours"],
      };

    case "directions":
      return {
        text: `Here's our location on Google Maps:\n\nhttps://www.google.com/maps?q=${encodeURIComponent(K.location.mapsQuery)}\n\nWe're at the corner of Commissioner and Polly Street in Johannesburg CBD.`,
        followUp: ["School Hours", "How to Enrol"],
      };

    case "sports":
      return {
        text: `We offer these sports:\n\n${K.sports.map((s) => `• ${s}`).join("\n")}\n\nPlus our annual sports levy is ${K.fees.sportsLevy.amount}/year.`,
        followUp: ["Activities", "Sports Levy"],
      };

    case "activities":
      return {
        text: `Our extramural activities include:\n\n${K.activities.map((a) => `• ${a}`).join("\n")}\n\nPlus Robotics and Computer classes!`,
        followUp: ["Technology", "School Fees"],
      };

    case "technology":
      return {
        text: `Portland offers exciting technology programmes:\n\n💻 Computers: ${K.technology.computers}\n🤖 Robotics: ${K.technology.robotics}\n\nThese are included in our curriculum!`,
        followUp: ["School Fees", "Activities"],
      };

    case "robotics":
      return {
        text: `Yes! We offer Robotics at Portland.\n\n${K.technology.robotics}\n\nIt's part of our commitment to preparing learners for the future.`,
        followUp: ["Computers", "School Fees"],
      };

    case "curriculum":
      return {
        text: `Portland follows the CAPS Curriculum (English-Medium) from Grade RR to Grade 11.\n\nWe also offer:\n• Computer literacy\n• Robotics\n• Dedicated, qualified teachers`,
        followUp: ["School Fees", "Activities"],
      };

    case "uniform":
      return {
        text: `Great news — the school uniform is provided FREE!\n\nEvery learner receives their full school uniform at no additional cost.`,
        followUp: ["School Fees", "How to Enrol"],
      };

    case "transport":
      return {
        text: `${K.transport}\n\nContact us for specific routes and availability.`,
        followUp: ["Contact Details", "Location"],
      };

    case "contact":
      return {
        text: `You can reach us through:\n\n📱 WhatsApp: ${K.contact.phone}\n📞 Phone: ${K.contact.phone}\n📧 Email: ${K.contact.email}\n\nWe're ready to hear from you!`,
        followUp: ["Location", "How to Enrol"],
      };

    case "whatsapp":
      return {
        text: `You can WhatsApp us directly at ${K.contact.phone}.\n\nWe typically respond quickly during school hours.`,
        followUp: ["School Hours", "How to Enrol"],
      };

    case "visit":
      return {
        text: `We'd love to welcome you to Portland!\n\nThe best way to arrange a school visit is to contact us directly:\n\n📱 WhatsApp: ${K.contact.phone}\n📞 Phone: ${K.contact.phone}\n\nWe'll happily arrange a time for you to see our facilities and meet our team.`,
        followUp: ["Location", "How to Enrol"],
      };

    case "call":
      return {
        text: `You can call us at:\n\n📞 ${K.contact.phone}\n\nOffice hours: ${K.hours.officeHours}`,
        followUp: ["WhatsApp Us", "Location"],
      };

    case "values":
      return {
        text: `Our core values are:\n\n${K.values.map((v) => `• ${v}`).join("\n")}\n\nWe believe true education nurtures character as much as competence.`,
        followUp: ["How to Enrol", "Our Philosophy"],
      };

    case "safety":
    case "bullying":
      return {
        text: `${K.bullying}\n\nWe maintain a structured, values-driven environment where kindness, accountability, and dignity are non-negotiable.`,
        followUp: ["Our Values", "How to Enrol"],
      };

    case "teachers":
      return {
        text: `Our teachers are dedicated and passionate!\n\nThey play an important role in helping learners develop academically, socially and personally. Every teacher is committed to the growth and success of every learner.`,
        followUp: ["Curriculum", "How to Enrol"],
      };

    case "lunch":
      return {
        text: `${K.lunch}`,
        followUp: ["School Hours", "School Fees"],
      };

    case "calendar":
    case "terms":
      return {
        text: `Portland follows the Department of Education's school calendar:\n\n• Term 1: ${K.calendar.term1}\n• Term 2: ${K.calendar.term2}\n• Term 3: ${K.calendar.term3}\n• Term 4: ${K.calendar.term4}\n\n${K.calendar.note}`,
        followUp: ["School Hours", "How to Enrol"],
      };

    case "sports_levy":
      return {
        text: `The Sports Levy is ${K.fees.sportsLevy.amount} per year.\n\nThis covers participation in all sports and extramural activities offered at Portland.`,
        followUp: ["What sports do you offer?", "School Fees"],
      };

    case "payment":
      return {
        text: `Payment can be made via:\n\n• EFT / Bank transfer\n• Cash at the school office\n• Debit order arrangements\n\nPlease contact our finance office for bank details.`,
        followUp: ["School Fees", "How to Enrol"],
      };

    case "thanks":
      return {
        text: `You're welcome! Is there anything else I can help you with?\n\nFeel free to WhatsApp us anytime at ${K.contact.phone}.`,
        followUp: ["How to Enrol", "School Fees"],
      };

    case "goodbye":
      return {
        text: `Goodbye! We hope to welcome you and your child to Portland soon.\n\nRemember: Where every child is known.`,
        followUp: ["How to Enrol"],
      };

    case "human":
      return {
        text: `I'd recommend speaking directly with the Portland Schools team about that. I can help you contact them.\n\n📱 WhatsApp: ${K.contact.phone}\n📞 Phone: ${K.contact.phone}\n📧 Email: ${K.contact.email}`,
        followUp: ["WhatsApp Us", "Call Us"],
      };

    default:
      // Check for grade-specific follow-up questions
      if (context.lastIntent === "grade_specific" || context.lastIntent === "fees") {
        const gradeGroup = getGradeGroup(input);
        if (gradeGroup !== "unknown") {
          const fee = gradeGroup === "rr7" ? K.fees.gradeRRto7 : K.fees.grade8to11;
          return {
            text: `${fee.grades}: ${fee.amount}/${fee.period.replace("per ", "")}\n\nSchool Uniform: Free\n\nWould you like to know how to enrol?`,
            followUp: ["How to Enrol", "What documents do I need?"],
          };
        }
      }

      return {
        text: `I don't have confirmed information about that yet. Please contact the Portland Schools team directly and they'll be happy to assist.\n\n📱 WhatsApp: ${K.contact.phone}\n📞 Phone: ${K.contact.phone}`,
        followUp: ["School Fees", "How to Enrol", "Contact Details"],
      };
  }
}
