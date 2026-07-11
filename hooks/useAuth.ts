"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

import { authService } from "@/modules/auth/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

function extractError(err: unknown): string {
  if (axios.isAxiosError(err)) {
    return (err.response?.data as { error?: string })?.error ?? err.message;
  }
  return "Something went wrong";
}

export function useAuth() {
  const router = useRouter();
  const { setSession, clearSession } = useAuthStore();

  const login = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      setSession(response);
      toast.success("Signed in");
      router.push(`/${response.user.instanceId || "acme"}/home`);
    },
    onError: (err) => toast.error(extractError(err)),
  });

  const signup = useMutation({
    mutationFn: authService.signup,
    onSuccess: (response) => {
      setSession(response);
      toast.success("Account created");
      router.push(`/${response.user.instanceId || "acme"}/onboarding/welcome`);
    },
    onError: (err) => toast.error(extractError(err)),
  });

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // ignore — clear session regardless
    }
    clearSession();
    toast.success("Signed out");
    router.push("/login");
  };

  return { login, signup, logout };
}
