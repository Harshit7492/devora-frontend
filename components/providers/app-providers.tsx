"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { getQueryClient } from "@/lib/query-client";

import { Toaster } from "../ui/toaster";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
