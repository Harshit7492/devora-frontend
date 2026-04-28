"use client";

import Link from "next/link";
import { Bot, Bug, CalendarClock, Plus, SquareCheckBig } from "lucide-react";

import { useUIStore } from "@/store/ui.store";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";

type FloatingActionsProps = {
  instance: string;
};

const quickActions = [
  { id: "task", label: "Task", icon: SquareCheckBig },
  { id: "issue", label: "Issue", icon: Bug },
  { id: "meeting", label: "Meeting", icon: CalendarClock },
  { id: "ai", label: "AI", icon: Bot },
] as const;

const panelCopy = {
  task: {
    title: "Create task",
    description: "Quick capture for execution work. Deeper fields can stay hidden until needed.",
  },
  issue: {
    title: "Create issue",
    description: "Keep issue reporting fast enough for clients and precise enough for the team.",
  },
  meeting: {
    title: "Create meeting",
    description: "Schedule a discussion without leaving the current workspace context.",
  },
  ai: {
    title: "Ask AI",
    description: "AI is part of the workflow, not a detached feature page.",
  },
} as const;

export function FloatingActions({ instance }: FloatingActionsProps) {
  const quickActionPanel = useUIStore((state) => state.quickActionPanel);
  const setQuickActionPanel = useUIStore((state) => state.setQuickActionPanel);

  const open = quickActionPanel !== "none";
  const current = quickActionPanel === "none" ? null : panelCopy[quickActionPanel];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-30">
        <Button
          size="icon"
          variant="outline"
          className="size-14 rounded-full border-white/18 bg-[#1d2930] text-white shadow-[0_16px_40px_rgba(0,0,0,0.34)] hover:bg-[#22313a]"
          onClick={() => setQuickActionPanel("task")}
        >
          <Plus className="size-5" />
        </Button>
      </div>
      <Sheet open={open} onOpenChange={(nextOpen) => setQuickActionPanel(nextOpen ? quickActionPanel : "none")}>
        <SheetContent>
          {current ? (
            <>
              <SheetHeader className="pr-8">
                <SheetTitle>{current.title}</SheetTitle>
                <SheetDescription>{current.description}</SheetDescription>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                <div className="grid gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/70 px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-muted/40"
                      onClick={() => setQuickActionPanel(action.id)}
                    >
                      <action.icon className="size-4" />
                      {action.label}
                    </button>
                  ))}
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/70 p-4 text-sm leading-6 text-muted-foreground">
                  This is a slide-over action surface. Keep it lightweight, fast, and contextual. Use full forms only when inline or quick-create interaction is not enough.
                </div>
                <Button asChild className="w-full">
                  <Link href={`/${instance}/product/launchpad/board`}>Open project context</Link>
                </Button>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}
