"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OnboardingOverlay() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const step = searchParams.get("onboarding");

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (step === "reveal" || step === "notifications") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [step]);

  if (!isVisible || !step) return null;

  const handleNext = () => {
    if (step === "reveal") {
      router.push(`${pathname}?onboarding=notifications`);
    } else {
      router.push(pathname); // Clears query params
    }
  };

  const title = step === "reveal" ? "2 of 3: Customize your project" : "3 of 3: Check your notifications";
  const buttonText = step === "reveal" ? "Last: New for you →" : "That's all, close this";

  return (
    <div className="fixed bottom-8 right-8 z-50 w-full max-w-sm animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="relative rounded-2xl bg-white p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-black/5">
        <button 
          onClick={() => router.push(pathname)}
          className="absolute right-4 top-4 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur transition-colors hover:bg-black/40"
        >
          <X className="h-3 w-3" />
        </button>
        
        <div className="mb-2 px-4 pt-3 text-center text-sm font-bold tracking-tight text-gray-900">
          {title}
        </div>
        
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-900">
          {/* Placeholder for actual video, we use an image or stylized block for now */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform hover:scale-110 cursor-pointer">
              <Play className="h-8 w-8 ml-1 text-white fill-white" />
            </div>
          </div>
          
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-medium text-white drop-shadow-md">
            <div className="flex items-center gap-2">
              <Play className="h-3 w-3 fill-white" />
              <span>0:00 / 0:25</span>
            </div>
          </div>
        </div>
        
        <div className="mt-2 p-2">
          <Button 
            onClick={handleNext}
            className="w-full rounded-xl bg-[#60A5FA] py-6 text-base font-semibold text-white hover:bg-[#3B82F6]"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
