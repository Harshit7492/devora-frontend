"use client";

import { usePathname } from "next/navigation";

import { useAuthStore } from "@/store/auth.store";

// import { AppContextBar } from "./app-context-bar";
import { AppNavbar } from "./app-navbar";
import { CommandPalette } from "./command-palette";
import { FloatingActions } from "./floating-actions";
import { BottomNav } from "./bottom-nav";
import { PingsPanel } from "./pings-panel";

type AppShellProps = {
  children: React.ReactNode;
  instance: string;
};

export function AppShell({ children, instance }: AppShellProps) {
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();
  const isHome = pathname === `/${instance}/home`;
  const isPings = pathname === `/${instance}/pings`;
  const isActivity = pathname === `/${instance}/activity`;
  const isTimeline = pathname.endsWith("/timeline");
  const fullBleed = isHome || isPings || isActivity || isTimeline;

  return (
    <div className="min-h-screen bg-[#091217] text-[#f5efe5]">
      <AppNavbar instance={instance} userName={user?.name ?? "Demo Operator"} />
      {/* {!fullBleed ? <AppContextBar instance={instance} /> : null} */}
      <main className={fullBleed ? "pb-24 pt-0" : "px-4 pb-24 pt-6 sm:px-6 lg:px-8"}>
        <div className={fullBleed ? "w-full" : "mx-auto w-full max-w-[1320px]"}>{children}</div>
      </main>
      <CommandPalette instance={instance} />
      <FloatingActions instance={instance} />
      <BottomNav />
      <PingsPanel />
    </div>
  );
}
