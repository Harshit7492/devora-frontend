import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  Command,
  FolderOpenDot,
  Sparkles,
  UserPlus,
  Zap,
} from "lucide-react";

import homeSeed from "@/data/seeds/home.json";

import { CreateProjectDialog } from "@/components/modules/project/create-project-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { RecentProjects } from "@/components/modules/project/recent-projects";

import { InvitePeopleDialog } from "@/components/modules/invitation/invite-people-dialog";

type HomePageProps = {
  params: Promise<{
    instance: string;
  }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { instance } = await params;

  return (
    <div className="min-h-[calc(100vh-12rem)] rounded-[2rem] bg-[#0d1417] px-4 py-8 text-[#f5efe5] shadow-[0_30px_120px_rgba(7,10,11,0.35)] sm:px-6 md:px-8 lg:px-10 lg:py-10">
      {/* ─── Hero Section ─── */}
      <section className="flex flex-col items-center px-2 text-center">
        {/* Animated icon */}
        <div className="relative">
          <div className="absolute inset-0 animate-pulse rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(164,107,255,0.4),transparent_70%)] blur-2xl" />
          <div className="relative inline-flex size-20 items-center justify-center rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(164,107,255,0.95),rgba(101,62,214,0.98))] shadow-[0_28px_60px_rgba(103,67,214,0.35)] sm:size-24">
            <Sparkles className="size-8 text-white sm:size-10" />
          </div>
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-[#fbf7f0] sm:mt-8 sm:text-4xl md:text-5xl lg:text-[3.25rem]">
          {homeSeed.hero.title}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#c7c0b5] sm:mt-4 sm:text-base sm:leading-7">
          {homeSeed.hero.description}
        </p>

        {/* CTAs */}
        <div className="mt-6 flex w-full flex-col items-center gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:gap-4">
          <CreateProjectDialog
            triggerLabel={homeSeed.hero.primaryCta}
            instance={instance}
          />
          <InvitePeopleDialog instance={instance} />
        </div>

        {/* Quick links */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-[#d8d0c4] sm:mt-8">
          <Link
            href={`/${instance}/projects`}
            className="underline underline-offset-4 transition-colors hover:text-white"
          >
            {homeSeed.hero.listLinkLabel}
          </Link>
          <span className="hidden text-white/30 sm:inline">·</span>
          <Link
            href={`/${instance}/settings`}
            className="underline underline-offset-4 transition-colors hover:text-white"
          >
            {homeSeed.hero.templateLinkLabel}
          </Link>
          <span className="hidden text-white/30 sm:inline">·</span>
          <span className="hidden items-center gap-2 sm:inline-flex">
            Press
            <span className="rounded-md border border-white/20 bg-white/5 px-2 py-1 font-mono text-xs">
              Ctrl+J
            </span>
            anytime to jump
          </span>
        </div>
      </section>

      {/* ─── Quick Actions Bar ─── */}
      <section className="mx-auto mt-12 sm:mt-16">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <Link
            href={`/${instance}/product/launchpad/board`}
            className="group flex items-center gap-3 rounded-2xl border border-white/8 bg-[#141e24] px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/16 hover:bg-[#1a2830] sm:px-5"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#7dd38c]/15 text-[#7dd38c] transition-colors group-hover:bg-[#7dd38c]/25">
              <ClipboardList className="size-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Board</div>
              <div className="text-xs text-white/40">View tasks</div>
            </div>
          </Link>

          <Link
            href={`/${instance}/pings`}
            className="group flex items-center gap-3 rounded-2xl border border-white/8 bg-[#141e24] px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/16 hover:bg-[#1a2830] sm:px-5"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#63a8ff]/15 text-[#63a8ff] transition-colors group-hover:bg-[#63a8ff]/25">
              <Zap className="size-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Pings</div>
              <div className="text-xs text-white/40">Messages</div>
            </div>
          </Link>

          <Link
            href={`/${instance}/activity`}
            className="group flex items-center gap-3 rounded-2xl border border-white/8 bg-[#141e24] px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/16 hover:bg-[#1a2830] sm:px-5"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#f08a24]/15 text-[#f08a24] transition-colors group-hover:bg-[#f08a24]/25">
              <CalendarDays className="size-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Activity</div>
              <div className="text-xs text-white/40">Recent</div>
            </div>
          </Link>

          <Link
            href={`/${instance}/projects`}
            className="group flex items-center gap-3 rounded-2xl border border-white/8 bg-[#141e24] px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/16 hover:bg-[#1a2830] sm:px-5"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#a46bff]/15 text-[#a46bff] transition-colors group-hover:bg-[#a46bff]/25">
              <FolderOpenDot className="size-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Projects</div>
              <div className="text-xs text-white/40">Browse all</div>
            </div>
          </Link>
        </div>
      </section>

      {/* ─── Recent Projects ─── */}
      <section className="mt-12 sm:mt-16">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/8" />
          <Badge className="rounded-lg bg-[#8baac0]/15 px-4 py-2 text-sm font-semibold text-[#8baac0] backdrop-blur">
            Recent Projects
          </Badge>
          <div className="h-px flex-1 bg-white/8" />
        </div>

        <RecentProjects instance={instance} />

        <div className="mt-8 flex justify-center">
          <Link href={`/${instance}/projects`}>
            <Button className="rounded-full bg-[#7dd38c] px-8 text-[#102018] shadow-[0_4px_20px_rgba(125,211,140,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#72c681] hover:shadow-[0_8px_30px_rgba(125,211,140,0.3)]">
              See all projects
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ─── Schedule & Assignments Grid ─── */}
      <section className="mt-12 grid gap-5 sm:mt-14 lg:grid-cols-2">
        {/* Schedule Card */}
        <Card className="overflow-hidden rounded-[1.6rem] border-white/8 bg-[#141e24] text-[#f5efe5] transition-all duration-200 hover:border-white/12">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <Badge className="rounded-lg bg-[#8baac0]/15 px-4 py-2 text-sm font-semibold text-[#8baac0]">
                Your Schedule
              </Badge>
              <div className="flex size-8 items-center justify-center rounded-lg bg-white/5">
                <CalendarDays className="size-4 text-white/55" />
              </div>
            </div>
            <CardDescription className="mt-2 text-[#d8d0c4]">
              Today only. No overloaded calendar wall.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 px-4 pb-4 sm:space-y-3 sm:px-6 sm:pb-6">
            {homeSeed.scheduleItems.map((item) => (
              <div
                key={item.time}
                className="group flex items-center justify-between gap-3 rounded-2xl bg-white/[0.03] px-3 py-3 transition-colors hover:bg-white/[0.06] sm:px-4 sm:py-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-white sm:text-base">
                    {item.title}
                  </div>
                  <div className="mt-0.5 truncate text-xs text-[#bdb5aa] sm:mt-1 sm:text-sm">
                    {item.meta}
                  </div>
                </div>
                <div className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[#d8d0c4] sm:text-sm">
                  {item.time}
                </div>
              </div>
            ))}
            {homeSeed.scheduleItems.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center text-white/40">
                <CalendarDays className="mb-3 size-8 opacity-40" />
                <p className="text-sm">Nothing on the schedule today</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Assignments Card */}
        <Card className="overflow-hidden rounded-[1.6rem] border-white/8 bg-[#141e24] text-[#f5efe5] transition-all duration-200 hover:border-white/12">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <Badge className="rounded-lg bg-[#8baac0]/15 px-4 py-2 text-sm font-semibold text-[#8baac0]">
                Your Assignments
              </Badge>
              <div className="flex size-8 items-center justify-center rounded-lg bg-white/5">
                <Command className="size-4 text-white/55" />
              </div>
            </div>
            <CardDescription className="mt-2 text-[#d8d0c4]">
              Stuff due soon and recently assigned. Only what needs your
              attention.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 px-4 pb-4 sm:space-y-3 sm:px-6 sm:pb-6">
            {homeSeed.assignments.map((item, i) => (
              <div
                key={item}
                className="group flex items-start gap-3 rounded-2xl bg-white/[0.03] px-3 py-3 text-sm leading-relaxed text-[#e7dfd4] transition-colors hover:bg-white/[0.06] sm:px-4 sm:py-4 sm:text-base sm:leading-7"
              >
                <div className="mt-1 flex size-5 shrink-0 items-center justify-center rounded border border-white/15 text-transparent transition-colors group-hover:border-[#7dd38c]/50 group-hover:text-[#7dd38c]">
                  <svg
                    className="size-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span>{item}</span>
              </div>
            ))}
            {homeSeed.assignments.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center text-white/40">
                <Command className="mb-3 size-8 opacity-40" />
                <p className="text-sm">
                  No assignments due — you&apos;re all caught up!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
