"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { GraduationCap, AlertCircle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        // Use the callbackUrl if present (from middleware redirect), otherwise go to dashboard router
        if (callbackUrl && callbackUrl !== "/admin") {
          router.push(callbackUrl);
        } else {
          router.push("/api/auth/dashboard");
        }
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4] px-4">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#C41E3A] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#C41E3A]/20">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Portland Schools</h1>
          <p className="text-sm text-[#6B7280] mt-1">Sign in to your portal</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#E5E7EB]">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-5 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@portlandschools.co.za"
                required
                className="w-full px-3.5 py-2.5 text-sm border border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C41E3A]/20 focus:border-[#C41E3A] transition-colors placeholder:text-[#9CA3AF]"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-[#1A1A1A]">Password</label>
                <a href="/forgot-password" className="text-xs text-[#C41E3A] hover:text-[#A01830] transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-3.5 py-2.5 text-sm border border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C41E3A]/20 focus:border-[#C41E3A] transition-colors placeholder:text-[#9CA3AF]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C41E3A] hover:bg-[#A01830] text-white font-semibold py-2.5 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

        </div>

        {/* Back link */}
        <p className="text-center text-xs text-[#9CA3AF] mt-6">
          <a href="/" className="hover:text-[#C41E3A] transition-colors">
            &larr; Back to Portland Schools website
          </a>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4]">
          <div className="text-[#6B7280]">Loading...</div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
