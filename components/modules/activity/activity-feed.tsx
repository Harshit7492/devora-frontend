"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronDown, Clock3, Filter, UserRound } from "lucide-react";

import { activityQueryKeys, activityService } from "@/modules/activity/services/activity.service";
import { useAuthStore } from "@/store/auth.store";
import { cn } from "@/lib/utils";

type ActivityFeedProps = { instance: string };

type ActivityReport =
  | "all-latest"
  | "someone-activity"
  | "someone-assignments"
  | "mission-control"
  | "hilltop-view"
  | "todos-completed"
  | "overdue"
  | "unassigned"
  | "upcoming";

const reports: { id: ActivityReport; label: string; icon: string }[] = [
  { id: "all-latest", label: "All the latest activity", icon: "🌐" },
  { id: "someone-activity", label: "Someone's activity", icon: "👤" },
  { id: "someone-assignments", label: "Someone's assignments", icon: "📋" },
  { id: "mission-control", label: "Mission control", icon: "🚀" },
  { id: "hilltop-view", label: "Hilltop view", icon: "🏔️" },
  { id: "todos-completed", label: "To-dos completed", icon: "✅" },
  { id: "overdue", label: "Overdue", icon: "⚠️" },
  { id: "unassigned", label: "Unassigned", icon: "❓" },
  { id: "upcoming", label: "Upcoming", icon: "📅" },
];

export function ActivityFeed({ instance }: ActivityFeedProps) {
  const user = useAuthStore((s) => s.user);
  const [activeReport, setActiveReport] = useState<ActivityReport>("all-latest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userId = activeReport === "someone-activity" ? user?.id : undefined;
  const { data: events = [] } = useQuery({
    queryKey: activityQueryKeys.list(instance, userId),
    queryFn: () => activityService.list(instance, userId),
  });

  const activeLabel = reports.find((r) => r.id === activeReport)?.label ?? "All the latest activity";

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todaysItems = events.filter((e) => new Date(e.createdAt) >= todayStart);
  const earlierItems = events.filter((e) => new Date(e.createdAt) < todayStart);

  return (
    <section className="min-h-[calc(100vh-5.2rem)] bg-[#091217] px-4 pb-8 pt-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1360px] rounded-[1.8rem] bg-[#1a262d] text-[#f4ede3] shadow-[0_26px_70px_rgba(0,0,0,0.18)]">
        <header className="relative border-b border-white/10 px-6 py-10 sm:px-10">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <button
                className="inline-flex items-center gap-3 rounded-full border border-white/16 bg-[#22323a] px-5 py-3 text-[1.05rem] text-white"
                onClick={() => setIsDropdownOpen((open) => !open)}
              >
                {activeLabel}
                <ChevronDown className="size-4" />
              </button>
              {isDropdownOpen ? (
                <div className="absolute left-1/2 top-[calc(100%+0.8rem)] z-20 w-[21rem] -translate-x-1/2 rounded-[1.6rem] border border-white/10 bg-[#24343d] p-3 shadow-2xl">
                  {reports.map((report) => (
                    <button
                      key={report.id}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[1rem] transition-colors",
                        activeReport === report.id ? "bg-white/8 text-white" : "text-white/82 hover:bg-white/6 hover:text-white",
                      )}
                      onClick={() => {
                        setActiveReport(report.id);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <span className="text-lg">{report.icon}</span>
                      <span className="flex-1">{report.label}</span>
                      {activeReport === report.id ? <Check className="size-4 text-[#7ed295]" /> : null}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0 flex-1 text-center">
              <h1 className="text-5xl font-semibold tracking-[-0.05em]">Latest Activity</h1>
            </div>
            <div className="rounded-full border border-[#ef7e33] px-5 py-3 text-sm text-[#ef8a42]">Emailing a daily summary</div>
          </div>
        </header>

        <div className="px-6 py-8 sm:px-10">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-[#31414a] p-2">
            <button className="rounded-full bg-[#21303a] px-6 py-3 text-[1.05rem] font-medium text-white">Everything</button>
            <button className="rounded-full px-6 py-3 text-[1.05rem] text-white/85">Filter by projects</button>
            <button className="rounded-full px-6 py-3 text-[1.05rem] text-white/85">Filter by people</button>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="space-y-8 border-r border-white/10 pr-6">
              <div className="mx-auto w-fit rounded-md bg-[#88a9c1] px-4 py-2 text-lg font-semibold uppercase tracking-tight text-[#102838]">
                Today
              </div>
              {todaysItems.map((item) => (
                <article key={item.id} className="border-t border-white/10 pt-8">
                  <div className="mb-4 text-[1.15rem] text-[#cdbda7]">{item.type}</div>
                  <div className="grid gap-4 md:grid-cols-[3.8rem_minmax(0,1fr)_5rem]">
                    <div className="flex size-14 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#9060ff,#6a47dd)] text-white shadow-lg">
                      <UserRound className="size-7" />
                    </div>
                    <div>
                      <div className="text-[1.02rem] leading-8 text-white">
                        <span className="font-semibold text-[#67aaff]">{item.actor.name}</span> {item.subject}
                      </div>
                    </div>
                    <div className="pt-1 text-right text-[1.02rem] text-white/78">
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="space-y-8 pl-2">
              <div className="mx-auto w-fit rounded-md bg-[#88a9c1] px-4 py-2 text-lg font-semibold uppercase tracking-tight text-[#102838]">
                Earlier
              </div>
              {earlierItems.map((item) => (
                <article key={item.id} className="border-t border-white/10 pt-8">
                  <div className="mb-4 text-[1.15rem] text-[#cdbda7]">{item.type}</div>
                  <div className="grid gap-4 md:grid-cols-[5rem_3.8rem_minmax(0,1fr)]">
                    <div className="pt-1 text-[1.02rem] text-white/78">
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                    <div className="flex size-14 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#9060ff,#6a47dd)] text-white shadow-lg">
                      <UserRound className="size-7" />
                    </div>
                    <div>
                      <div className="text-[1.02rem] leading-8 text-white">
                        <span className="font-semibold text-[#67aaff]">{item.actor.name}</span> {item.subject}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between text-sm text-white/45">
            <div className="inline-flex items-center gap-2">
              <Clock3 className="size-4" />
              Activity is scoped to the signed-in profile by default.
            </div>
            <div className="inline-flex items-center gap-2">
              <Filter className="size-4" />
              Report: {activeLabel}
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </section>
  );
}
