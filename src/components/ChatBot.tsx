"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { SITE } from "@/lib/constants";
import { matchIntent, generateResponse, getGradeGroup, type Intent } from "@/lib/chat-engine";
import {
  MessageCircle,
  X,
  Send,
  GraduationCap,
  MessageSquare,
  Phone,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  followUp?: string[];
  timestamp: Date;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  text: "Hi! I'm the Portland Assistant 👋\n\nHow can I help you today? I can tell you about our fees, admissions, school hours, activities, and more.",
  sender: "bot",
  followUp: ["School Fees", "How to Enrol", "School Hours", "Location", "Grades", "Activities"],
  timestamp: new Date(),
};

function handleFollowUpAction(action: string): { type: "send"; text: string } | { type: "link"; url: string } | null {
  const lower = action.toLowerCase();

  if (lower.includes("whatsapp")) {
    return { type: "link", url: SITE.whatsappLink };
  }
  if (lower.includes("call")) {
    return { type: "link", url: `tel:${SITE.phone}` };
  }
  if (lower.includes("book a visit") || lower.includes("school visit")) {
    return { type: "link", url: SITE.whatsappLink };
  }
  if (lower.includes("get directions")) {
    return { type: "send", text: "Get me directions to Portland" };
  }
  if (lower.includes("start admissions enquiry") || lower.includes("start an enquiry")) {
    return { type: "link", url: "/admissions?source=ai-assistant" };
  }
  if (lower.includes("start enquiry") || lower.includes("contact admissions")) {
    return { type: "link", url: "/admissions?source=ai-assistant" };
  }

  return { type: "send", text: action };
}

function isAdmissionsAction(action: string): boolean {
  const lower = action.toLowerCase();
  return lower.includes("enquiry") || lower.includes("enrol") || lower.includes("enroll") || lower.includes("admissions");
}

function isWhatsAppAction(action: string): boolean {
  return action.toLowerCase().includes("whatsapp");
}

function isCallAction(action: string): boolean {
  return action.toLowerCase().includes("call");
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lastIntent, setLastIntent] = useState<Intent | undefined>();
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

    const userMsg: Message = {
      id: Date.now().toString(),
      text: query,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((p) => [...p, userMsg]);
    setInput("");

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const { intent } = matchIntent(query);
      const { text, followUp } = generateResponse(intent, query, { lastIntent });
      setLastIntent(intent);

      // If strong admissions intent, add admissions CTA
      const isAdmissionsIntent =
        intent === "enrol" ||
        intent === "admissions" ||
        (intent === "grade_specific" && lastIntent === "fees");

      if (isAdmissionsIntent) {
        // Extract grade from query for pre-selection
        const gradeMatch = query.match(/grade\s*(rr|r|0|1|2|3|4|5|6|7|8|9|10|11)/i);
        const gradeParam = gradeMatch ? `&grade=${encodeURIComponent("Grade " + gradeMatch[1].toUpperCase())}` : "";
        const finalFollowUp = [`Start Admissions Enquiry`, ...followUp.filter((f) => !f.toLowerCase().includes("enrol"))];
        addBotMessage(text, finalFollowUp);
      } else {
        addBotMessage(text, followUp);
      }
    }, 500 + Math.random() * 600);
  };

  const handleFollowUp = (action: string) => {
    const result = handleFollowUpAction(action);
    if (!result) return;

    if (result.type === "link") {
      if (result.url.startsWith("/")) {
        window.location.href = result.url;
      } else {
        window.open(result.url, "_blank", "noopener,noreferrer");
      }
      return;
    }

    handleSend(result.text);
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
            : "bg-portland-red hover:bg-portland-red-dark"
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
        <div className="bg-white rounded-2xl shadow-[0_10px_60px_rgba(0,0,0,0.15)] overflow-hidden border border-portland-mid/30 flex flex-col max-h-[600px] sm:max-h-[500px]">
          {/* Header */}
          <div className="bg-portland-dark px-5 py-4 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-white text-sm">Portland Assistant</p>
              <p className="text-white/50 text-xs">Ask me anything about Portland</p>
            </div>
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth min-h-0" role="log" aria-live="polite" aria-label="Chat messages">
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
                {msg.sender === "bot" && msg.followUp && msg.followUp.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 ml-1">
                    {msg.followUp.map((action) => {
                      const isWA = isWhatsAppAction(action);
                      const isCall = isCallAction(action);
                      const isAdm = isAdmissionsAction(action);
                      return (
                        <button
                          key={action}
                          onClick={() => handleFollowUp(action)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                            isWA
                              ? "bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366]"
                              : isCall
                              ? "bg-portland-red/8 hover:bg-portland-red/15 text-portland-red"
                              : isAdm
                              ? "bg-portland-red hover:bg-portland-red-dark text-white"
                              : "bg-portland-red/8 hover:bg-portland-red/15 text-portland-red"
                          }`}
                        >
                          {isWA && <MessageSquare className="w-3 h-3 inline mr-1" />}
                          {isCall && <Phone className="w-3 h-3 inline mr-1" />}
                          {action}
                        </button>
                      );
                    })}
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
          <div className="px-4 py-2 border-t border-portland-mid/30 shrink-0">
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
          <div className="px-4 py-3 border-t border-portland-mid/30 shrink-0">
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
