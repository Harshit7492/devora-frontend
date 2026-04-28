"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, FolderOpenDot } from "lucide-react";

import { projectQueryKeys, projectService } from "@/modules/project/services/project.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type RecentProjectsProps = {
  instance: string;
};

function MemberStack({ members }: { members: string[] }) {
  return (
    <div className="flex items-center">
      {members.map((member, index) => (
        <div
          key={`${member}-${index}`}
          className="-ml-2 first:ml-0 inline-flex size-9 items-center justify-center rounded-full border-2 border-[#0f171a] bg-primary/85 text-xs font-semibold text-primary-foreground"
        >
          {member}
        </div>
      ))}
    </div>
  );
}

export function RecentProjects({ instance }: RecentProjectsProps) {
  const { data: projects = [] } = useQuery({
    queryKey: projectQueryKeys.list(instance),
    queryFn: () => projectService.list(instance),
  });

  // Get the 2 most recent projects (assuming latest are at the end)
  const recentProjects = [...projects].reverse().slice(0, 2);

  if (recentProjects.length === 0) {
    return (
      <div className="mt-10 flex h-40 items-center justify-center rounded-[1.6rem] border border-dashed border-white/20 text-[#9db4c2]">
        No projects found. Create your first project to get started.
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-2">
      {recentProjects.map((project) => (
        <Link 
          key={project.id} 
          href={`/${instance}/${project.workspaceId}/${project.key.toLowerCase()}/board`} 
          className="group"
        >
          <Card className="h-full rounded-[1.6rem] border-white/8 bg-[#1a262d] text-[#f5efe5] transition-transform duration-200 group-hover:-translate-y-1 group-hover:border-white/14">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm text-[#9db4c2]">{project.key}</div>
                  <CardTitle className="mt-2 text-3xl tracking-[-0.04em]">{project.name}</CardTitle>
                </div>
                <FolderOpenDot className="size-5 text-white/45" />
              </div>
              <CardDescription className="max-w-xl text-lg leading-8 text-[#ddd4c8]">
                {/* Fallback description as API doesn't have it yet */}
                Dynamic project workspace for {project.name}.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-4">
              <MemberStack members={["ME", "AI"]} />
              <span className="inline-flex items-center gap-2 text-sm text-[#d5ccc1]">
                Open
                <ArrowRight className="size-4" />
              </span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
