import Link from "next/link";
import { ArrowRight, CalendarDays, Command, FolderOpenDot, Sparkles, UserPlus } from "lucide-react";

import homeSeed from "@/data/seeds/home.json";

import { CreateProjectDialog } from "@/components/modules/project/create-project-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="min-h-[calc(100vh-12rem)] rounded-[2rem] bg-[#0d1417] px-6 py-10 text-[#f5efe5] shadow-[0_30px_120px_rgba(7,10,11,0.35)] sm:px-8 lg:px-10">
      <section className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <div className="inline-flex size-24 items-center justify-center rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(164,107,255,0.95),rgba(101,62,214,0.98))] shadow-[0_28px_60px_rgba(103,67,214,0.35)]">
          <Sparkles className="size-10 text-white" />
        </div>
        <h1 className="mt-8 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-[#fbf7f0] sm:text-5xl">
          {homeSeed.hero.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#c7c0b5]">{homeSeed.hero.description}</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <CreateProjectDialog triggerLabel={homeSeed.hero.primaryCta} instance={instance} />
          <InvitePeopleDialog instance={instance} />
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-[#d8d0c4]">
          <Link href={`/${instance}/projects`} className="underline underline-offset-4">
            {homeSeed.hero.listLinkLabel}
          </Link>
          <span>·</span>
          <Link href={`/${instance}/settings`} className="underline underline-offset-4">
            {homeSeed.hero.templateLinkLabel}
          </Link>
          <span>·</span>
          <span className="inline-flex items-center gap-2">
            Press
            <span className="rounded-md border border-white/20 bg-white/5 px-2 py-1 font-mono text-xs">Ctrl+J</span>
            anytime to jump
          </span>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/12" />
          <Badge className="rounded-md bg-[#8baac0] px-4 py-2 text-[#142634]">
            Recent Projects
          </Badge>
          <div className="h-px flex-1 bg-white/12" />
        </div>

        <RecentProjects instance={instance} />

        {/* ✅ CENTERED SEE ALL BUTTON */}
        <div className="mt-8 flex justify-center">
          <Link href={`/${instance}/projects`}>
            <Button className="rounded-full bg-[#7dd38c] px-8 text-[#102018] hover:bg-[#72c681]">
              See all projects
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>
      </section>


      <section className="mx-auto mt-14 grid max-w-6xl gap-5 lg:grid-cols-2">
        <Card className="rounded-[1.6rem] border-white/8 bg-[#172128] text-[#f5efe5]">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <Badge className="rounded-md bg-[#8baac0] px-4 py-2 text-[#142634]">Your Schedule</Badge>
              <CalendarDays className="size-4 text-white/55" />
            </div>
            <CardDescription className="text-[#d8d0c4]">Today only. No overloaded calendar wall.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {homeSeed.scheduleItems.map((item) => (
              <div key={item.time} className="flex items-center justify-between rounded-2xl bg-white/4 px-4 py-4">
                <div>
                  <div className="text-base font-medium">{item.title}</div>
                  <div className="mt-1 text-sm text-[#bdb5aa]">{item.meta}</div>
                </div>
                <div className="rounded-full border border-white/12 px-3 py-1 text-sm text-[#d8d0c4]">{item.time}</div>
              </div>
            ))}

          </CardContent>

        </Card>


        <Card className="rounded-[1.6rem] border-white/8 bg-[#172128] text-[#f5efe5]">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <Badge className="rounded-md bg-[#8baac0] px-4 py-2 text-[#142634]">Your Assignments</Badge>
              <Command className="size-4 text-white/55" />
            </div>
            <CardDescription className="text-[#d8d0c4]">
              Stuff due soon and recently assigned. Only what needs your attention.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {homeSeed.assignments.map((item) => (
              <div key={item} className="rounded-2xl bg-white/4 px-4 py-4 text-base leading-7 text-[#e7dfd4]">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
