"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type ProjectTabsProps = {
  instance: string;
  workspace: string;
  project: string;
};

const tabs = [
  { label: "Board", segment: "board" },
  { label: "Sheet", segment: "sheet" },
  { label: "Timeline", segment: "timeline" },
];

export function ProjectTabs({ instance, workspace, project }: ProjectTabsProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-2 rounded-full border border-border/70 bg-card/70 p-2">
      {tabs.map((tab) => (
        <Link
          key={tab.segment}
          href={`/${instance}/${workspace}/${project}/${tab.segment}`}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors",
            pathname.endsWith(`/${tab.segment}`) ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
