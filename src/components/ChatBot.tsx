"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { SITE } from "@/lib/constants";
import {
  MessageCircle,
  X,
  Send,
  GraduationCap,
  MessageSquare,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  followUp?: string[];
  timestamp: Date;
}

const KB: { keywords: string[]; answer: string; followUp?: string[] }[] = [
  {
    keywords: ["fee", "fees", "cost", "price", "pay", "payment", "how much", "afford", "monthly", "annual"],
    answer: "Portland fees are very affordable:\n\n• Grade RR – Grade 7: R800/month\n• Grade 8 – Grade 11: R900/month\n• Registration: R500 once-off\n• Sports Levy: R300/year\n\nFree school uniform is included!",
    followUp: ["How do I enrol?", "What payment methods?"],
  },
  {
    keywords: ["payment method", "payment methods", "how do i pay", "bank", "eft", "cash"],
    answer: "Payment can be made via:\n\n• EFT / Bank transfer\n• Cash at the school office\n• Debit order arrangements\n\nPlease contact our finance office for bank details.",
    followUp: ["What are the fees?", "How do I enrol?"],
  },
  {
    keywords: ["enrol", "enrolment", "enroll", "enrollment", "admission", "admissions", "apply", "application", "register", "sign up", "join"],
    answer: "Enrolling at Portland is easy!\n\n1. Contact us via WhatsApp or phone\n2. Visit the school to see our facilities\n3. Complete the application form\n4. Submit required documents\n\nAdmissions are open for Grade RR – Grade 11.",
    followUp: ["What documents do I need?", "What are the fees?"],
  },
  {
    keywords: ["document", "documents", "papers", "requirements", "what do i need", "bring"],
    answer: "You'll need these documents:\n\n• Copy of birth certificate\n• Proof of immunization\n• Copies of both parents'/guardians' IDs\n• Latest school report (if applicable)\n• Transfer documents (if applicable)\n\nNo copies will be made at the school office.",
    followUp: ["How do I enrol?", "Where are you located?"],
  },
  {
    keywords: ["time", "hours", "when", "open", "close", "start", "finish", "school day", "operating", "morning", "afternoon"],
    answer: "School hours:\n\n• Doors open: 7:00 AM\n• School starts: 7:30 AM\n• Primary ends: 2:30 PM\n• High School ends: 3:30 PM\n\nOffice hours: 7:00 AM – 4:00 PM",
    followUp: ["Do you have transport?", "Where are you located?"],
  },
  {
    keywords: ["transport", "bus", "taxi", "pick up", "drop off", "getting there", "commute", "ride"],
    answer: "Yes, school transport is available!\n\nConvenient transport options are offered for families who need them. Contact us for routes and availability.",
    followUp: ["What are the school hours?", "Where are you located?"],
  },
  {
    keywords: ["location", "address", "where", "find", "map", "get there", "direction", "corner", "street"],
    answer: "We're located at:\n\n188 Commissioner Street\nCorner Commissioner & Polly Street\nJohannesburg\n\nEasy to find in the heart of Johannesburg CBD!",
    followUp: ["What are the school hours?", "How do I enrol?"],
  },
  {
    keywords: ["sport", "sports", "activity", "activities", "club", "clubs", "extra mural", "extramural", "soccer", "netball", "chess", "athletics"],
    answer: "We offer a variety of sports and activities:\n\n⚽ Sports: Soccer, Netball, Athletics, Female Soccer\n🎭 Activities: Chess, Dancing, Bible Study, Drama, Modelling\n\nPlus Robotics and Computer classes!",
    followUp: ["What are the fees?", "Is there a sports levy?"],
  },
  {
    keywords: ["sport levy", "sports levy", "extra cost", "additional cost"],
    answer: "The Sports Levy is R300 per year.\n\nThis covers participation in all sports and extramural activities offered at Portland.",
    followUp: ["What sports do you offer?", "What are the fees?"],
  },
  {
    keywords: ["curriculum", "syllabus", "academics", "teach", "teaching", "education", "caps", "english", "learn", "learning"],
    answer: "Portland follows the CAPS Curriculum (English-Medium) from Grade RR to Grade 11.\n\nWe also offer:\n• Computer literacy\n• Robotics\n• Dedicated, qualified teachers",
    followUp: ["What sports do you offer?", "What are the fees?"],
  },
  {
    keywords: ["uniform", "clothes", "clothing", "dress code", "attire", "wear"],
    answer: "Great news — the school uniform is provided FREE!\n\nEvery learner receives their full school uniform at no additional cost.",
    followUp: ["What are the fees?", "How do I enrol?"],
  },
  {
    keywords: ["contact", "phone", "call", "whatsapp", "email", "reach", "number"],
    answer: "You can reach us through:\n\n📱 WhatsApp: +27 82 815 4388\n📞 Phone: +27 82 815 4388\n📧 Email: info@portlandschools.co.za\n\nWe're ready to hear from you!",
    followUp: ["Where are you located?", "How do I enrol?"],
  },
  {
    keywords: ["grade", "grades", "age", "years old", "which grade", "my child", "little one", "old enough"],
    answer: "Portland offers Grade RR through Grade 11.\n\n• Foundation Phase: Grade RR – Grade 3\n• Primary Phase: Grade 4 – Grade 7\n• High School: Grade 8 – Grade 11\n\nNot sure which grade? Contact us and we'll help!",
    followUp: ["What are the fees?", "How do I enrol?"],
  },
  {
    keywords: ["bully", "bullying", "safety", "safe", "discipline", "behaviour", "behavior", "conduct", "rules"],
    answer: "Portland has a zero-tolerance approach to bullying.\n\nEvery child is safe, respected, and protected. We maintain a structured, values-driven environment where kindness, accountability, and dignity are non-negotiable.",
    followUp: ["What are your values?", "How do I enrol?"],
  },
  {
    keywords: ["value", "values", "ethos", "believe", "belief", "mission", "vision", "promise"],
    answer: "Our core values are:\n\n• Respect\n• Responsibility\n• Excellence\n• Integrity\n• Kindness\n• Discipline\n\nWe believe true education nurtures character as much as competence.",
    followUp: ["How do I enrol?", "What do you teach?"],
  },
  {
    keywords: ["robot", "robotics", "computer", "computers", "technology", "tech", "coding", "stem"],
    answer: "Portland offers exciting technology programmes:\n\n💻 Computers: Building digital literacy and tech skills\n🤖 Robotics: Encouraging innovation, creativity and problem-solving\n\nThese are included in our curriculum!",
    followUp: ["What are the fees?", "What other activities do you offer?"],
  },
  {
    keywords: ["teacher", "teachers", "staff", "qualified", "dedicated", "educators"],
    answer: "Our teachers are dedicated and passionate!\n\nThey play an important role in helping learners develop academically, socially and personally. Every teacher is committed to the growth and success of every learner.",
    followUp: ["What do you teach?", "How do I enrol?"],
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "sup", "yo"],
    answer: "Hello! Welcome to Portland Group of Schools.\n\nI'm here to help answer your questions about admissions, fees, school hours, and more.\n\nWhat would you like to know?",
    followUp: ["What are the fees?", "How do I enrol?", "Where are you located?"],
  },
  {
    keywords: ["thank", "thanks", "appreciate", "helpful"],
    answer: "You're welcome! Is there anything else I can help you with?\n\nFeel free to WhatsApp us anytime at +27 82 815 4388.",
    followUp: ["How do I enrol?", "What are the fees?"],
  },
  {
    keywords: ["bye", "goodbye", "see you", "later"],
    answer: "Goodbye! We hope to welcome you and your child to Portland soon.\n\nRemember: We believe in your child!",
    followUp: ["How do I enrol?"],
  },
  {
    keywords: ["lunch", "food", "meal", "canteen", "cafeteria", "eat", "break"],
    answer: "Learners are welcome to bring their own lunch.\n\nPlease ensure your child has a packed lunch and water bottle for the day.",
    followUp: ["What are the school hours?", "What are the fees?"],
  },
  {
    keywords: ["term", "terms", "holiday", "holidays", "break", "calendar", "schedule", "semester"],
    answer: "Portland follows the Department of Education's school calendar:\n\n• Term 1: January – March\n• Term 2: April – June\n• Term 3: July – September\n• Term 4: October – December\n\nExact dates are communicated at the start of each year.",
    followUp: ["What are the school hours?", "How do I enrol?"],
  },
];

function matchQuestion(input: string): { answer: string; followUp?: string[] } {
  const lower = input.toLowerCase().trim();
  let bestMatch = -1;
  let bestScore = 0;

  for (let i = 0; i < KB.length; i++) {
    const entry = KB[i];
    let score = 0;
    for (const keyword of entry.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = i;
    }
  }

  if (bestMatch >= 0 && bestScore > 0) {
    return { answer: KB[bestMatch].answer, followUp: KB[bestMatch].followUp };
  }

  return {
    answer: "I'm not sure about that, but I can help you with:",
    followUp: ["School Fees", "How to Enrol", "School Hours", "Location", "Sports & Activities"],
  };
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm the Portland assistant. How can I help you today?",
      sender: "bot",
      followUp: ["School Fees", "How to Enrol", "School Hours", "Location"],
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const addBotMessage = (text: string, followUp?: string[]) => {
    const msg: Message = {
      id: Date.now().toString(),
      text,
      sender: "bot",
      followUp,
      timestamp: new Date(),
    };
    setMessages((p) => [...p, msg]);
  };

  const handleSend = (text?: string) => {
    const query = text || input.trim();
    if (!query) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      text: query,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((p) => [...p, userMsg]);
    setInput("");

    // Simulate typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const { answer, followUp } = matchQuestion(query);
      addBotMessage(answer, followUp);
    }, 600 + Math.random() * 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-5 left-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen
            ? "bg-portland-dark rotate-0"
            : "bg-portland-red hover:bg-portland-red-dark animate-pulse-glow"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat assistant"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        } bottom-24 left-5 sm:left-5 w-[calc(100vw-40px)] sm:w-[380px] max-h-[600px] sm:max-h-[500px]`}
      >
        <div className="bg-white rounded-2xl shadow-[0_10px_60px_rgba(0,0,0,0.15)] overflow-hidden border border-portland-mid/30">
          {/* Header */}
          <div className="bg-gradient-to-r from-portland-red to-portland-red-dark px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-white text-sm">Portland Assistant</p>
              <p className="text-white/70 text-xs">Ask me anything about Portland</p>
            </div>
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
          </div>

          {/* Messages */}
          <div className="h-[350px] overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
            {messages.map((msg) => (
              <div key={msg.id}>
                <div
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-portland-red text-white rounded-br-md"
                        : "bg-portland-light text-portland-dark rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
                {/* Follow-up buttons */}
                {msg.sender === "bot" && msg.followUp && msg.followUp.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 ml-1">
                    {msg.followUp.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSend(q)}
                        className="px-3 py-1.5 bg-portland-red/8 hover:bg-portland-red/15 text-portland-red text-xs font-medium rounded-full transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-portland-light px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-portland-gray/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-portland-gray/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-portland-gray/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* WhatsApp bridge */}
          <div className="px-4 py-2 border-t border-portland-mid/30">
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] text-xs font-semibold rounded-lg transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Talk to us on WhatsApp
            </a>
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-portland-mid/30">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2.5 bg-portland-light rounded-xl text-sm text-portland-dark placeholder:text-portland-gray/50 focus:outline-none focus:ring-2 focus:ring-portland-red/20 transition-all"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="w-10 h-10 bg-portland-red hover:bg-portland-red-dark disabled:opacity-40 disabled:hover:bg-portland-red rounded-xl flex items-center justify-center transition-all shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
