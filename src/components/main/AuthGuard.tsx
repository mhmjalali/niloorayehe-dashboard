"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isError = false;
  const isLoading = false;

  useEffect(() => {
    if (isError) {
      router.replace("/auth");
    }
  }, [isError, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="border-border border-t-primary h-8 w-8 animate-spin rounded-full border-2" />
      </div>
    );
  }

  if (isError) return null;

  return <>{children}</>;
}
