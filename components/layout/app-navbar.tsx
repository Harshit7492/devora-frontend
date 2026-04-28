"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BellDot, ChevronDown, CircleUserRound, Home, Search, TableOfContents, TimerReset, UserRoundCheck } from "lucide-react";

import findSeed from "@/data/seeds/find.json";
import { WORKSPACE_ITEMS } from "@/config/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useUIStore } from "@/store/ui.store";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type AppNavbarProps = {
  instance: string;
  userName: string;
};

export function AppNavbar({ instance, userName }: AppNavbarProps) {
  const pathname = usePathname();
  const setCommandPaletteOpen = useUIStore((state) => state.setCommandPaletteOpen);
  const { logout } = useAuth();

  const navItems = [
    { label: "Home", href: `/${instance}/home`, icon: Home },
    { label: "Lineup", href: `/${instance}/product/launchpad/timeline`, icon: TableOfContents },
    { label: "Pings", href: `/${instance}/pings`, icon: BellDot },
    { label: "Activity", href: `/${instance}/activity`, icon: TimerReset },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#091217]/96 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1900px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <Link href={`/${instance}/home`} className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white">
              <Home className="size-5" />
            </div>
            <div className="text-[2rem] font-semibold tracking-[-0.05em] text-[#f4efe7]">Devora</div>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn("inline-flex items-center gap-2 text-[1.05rem] font-semibold text-white/92 transition-colors hover:text-white", active && "text-white")}
              >
                <item.icon className="size-5" />
                {item.label}
              </Link>
            );
          })}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-2 text-[1.05rem] font-semibold text-white/92 transition-colors hover:text-white">
                <UserRoundCheck className="size-5" />
                My Stuff
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-[32rem] rounded-2xl border-white/10 bg-[#2b3a43] p-6 text-[#f2ece4] shadow-2xl">
              <div className="grid gap-4">
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-white/70">Quick Access</div>
                  <DropdownMenuItem className="rounded-xl px-4 py-3 text-lg">My Assignments (28)</DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl px-4 py-3 text-lg">My Schedule</DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl px-4 py-3 text-lg">My Drafts</DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl px-4 py-3 text-lg">My Recent Activity</DropdownMenuItem>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="mb-3 text-sm font-semibold text-white/70">Recently Visited</div>
                  {WORKSPACE_ITEMS.map((item) => (
                    <DropdownMenuItem key={item.label} asChild className="rounded-xl px-4 py-3 text-base">
                      <Link href={item.href(instance)}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-2 text-[1.05rem] font-semibold text-white/92 transition-colors hover:text-white">
                <Search className="size-5" />
                Find
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              sideOffset={18}
              className="w-[min(92vw,68rem)] rounded-2xl border-white/10 bg-[#2a3941] p-4 text-[#f2ece4] shadow-2xl"
            >
              <div className="space-y-3">
                <Input
                  placeholder={findSeed.placeholder}
                  className="h-12 rounded-lg border-[#3f6fa3] bg-[#213039] text-lg text-white placeholder:text-white/45 focus-visible:ring-[#3f6fa3]"
                />
                <div className="grid gap-3 md:grid-cols-3">
                  {findSeed.filters.map((filter) => (
                    <button
                      key={filter}
                      className="flex h-11 items-center justify-between rounded-full border border-white/12 bg-[#22313a] px-5 text-left text-[1rem] text-white/92 transition-colors hover:bg-[#273841]"
                    >
                      <span>{filter}</span>
                      <ChevronDown className="size-4 text-white/70" />
                    </button>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-3">
          <button
            className="hidden rounded-full border border-white/14 bg-white/4 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/8 hover:text-white md:inline-flex"
            onClick={() => setCommandPaletteOpen(true)}
          >
            Ctrl+J
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex size-11 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#9060ff,#6a47dd)] text-white shadow-lg">
                <CircleUserRound className="size-6" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[28rem] rounded-2xl border-white/10 bg-[#2b3a43] p-6 text-[#f2ece4] shadow-2xl">
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="border-b border-white/10 pb-3 text-sm font-semibold text-white/90">Notifications are on</div>
                  <p className="text-lg leading-8 text-white/80">You&apos;re set to receive email and browser notifications for everything all the time.</p>
                  <button className="rounded-full border border-white/15 px-4 py-2 text-base text-white/90">Turn on Focus Mode</button>
                </div>
                <div className="space-y-3">
                  <div className="border-b border-white/10 pb-3 text-sm font-semibold text-white/90">{userName}</div>
                  <DropdownMenuItem asChild className="rounded-xl px-4 py-3 text-lg">
                    <Link href={`/${instance}/settings`}>Profile, password, preferences</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl px-4 py-3 text-lg">My devices</DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl px-4 py-3 text-lg">Out of office</DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl px-4 py-3 text-lg cursor-pointer" onClick={() => void logout()}>Log out</DropdownMenuItem>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
