"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type WelcomePageProps = {
  params: Promise<{
    instance: string;
  }>;
};

export default function WelcomePage({ params }: WelcomePageProps) {
  const router = useRouter();
  const { instance } = use(params);

  const startTour = () => {
    router.push(`/${instance}/default/default/board?onboarding=reveal`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#182329] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl font-bold text-green-600 shadow-xl shadow-green-500/20">
          <svg className="h-10 w-10 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 22h20L12 2zm0 4.5l7 14h-14l7-14z" />
            <path d="M12 11l-3 6h6l-3-6z" />
          </svg>
        </div>
        <h1 className="mt-8 text-4xl font-bold tracking-tight">Welcome to Devora.</h1>
      </div>

      <div className="relative w-full max-w-2xl rounded-lg bg-[#202F36] p-8 shadow-2xl sm:p-12">
        <div className="space-y-6 text-lg text-gray-200">
          <p>Hey there—</p>
          <p>
            I'm the creator of this platform. <strong>Thanks for signing up, we're glad you're here.</strong> You picked a great time to join — Devora is all-new for 2026.
          </p>
          <p>
            To help you hit the ground running, we'll take you on a quick 3-minute onboarding tour. <strong>Click the blue button below to begin.</strong>
          </p>
          <p>
            If you need a hand, you can reach out directly. I read and reply to my own email — no assistant, no AI. I'd love to hear from you.
          </p>
          <p>Thanks again and here we go...</p>
        </div>

        <div className="mt-12 flex justify-end">
          <Button
            size="lg"
            onClick={startTour}
            className="rounded-full bg-[#3B82F6] px-8 py-6 text-lg font-semibold text-white hover:bg-[#2563EB] shadow-lg shadow-blue-500/30 transition-transform hover:scale-105 active:scale-95"
          >
            Begin the onboarding tour →
          </Button>
        </div>
      </div>
    </div>
  );
}
