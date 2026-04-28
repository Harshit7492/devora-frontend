"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type AppContextBarProps = {
  instance: string;
};

const homeModes = [
  { label: "Home", href: (instance: string) => `/${instance}/home` },
  { label: "Tasks", href: (instance: string) => `/${instance}/product/launchpad/board` },
  { label: "Chat", href: (instance: string) => `/${instance}/pings` },
  { label: "Meeting", href: (instance: string) => `/${instance}/home?mode=meeting` },
];

export function AppContextBar({ instance }: AppContextBarProps) {
  const pathname = usePathname();

  return (
    <div className="sticky top-[73px] z-20 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          {homeModes.map((mode) => {
            const href = mode.href(instance);
            const active = pathname === href || (href.includes("?") ? pathname === `/${instance}/home` : pathname.startsWith(href));

            return (
              <Link
                key={mode.label}
                href={href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active ? "bg-foreground text-background" : "bg-card/70 text-muted-foreground hover:bg-card hover:text-foreground",
                )}
              >
                {mode.label}
              </Link>
            );
          })}
        </div>
        <div className="hidden text-sm text-muted-foreground md:block">Single-focus interface. Context changes without leaving the workspace.</div>
      </div>
    </div>
  );
}
