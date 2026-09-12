"use client";

import { SessionProvider } from "next-auth/react";
import { NeonAuthUIProvider } from "@neondatabase/auth-ui";
import "@neondatabase/auth-ui/css";
import { authClient } from "@/lib/auth/neon-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <SessionProvider>
      <NeonAuthUIProvider
        authClient={authClient}
        navigate={router.push}
        replace={router.replace}
        onSessionChange={router.refresh}
        Link={Link}
      >
        {children}
      </NeonAuthUIProvider>
    </SessionProvider>
  );
}
