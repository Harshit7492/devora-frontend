"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, FolderOpenDot, LayoutGrid, List } from "lucide-react";
import { useState } from "react";

import { projectQueryKeys, projectService } from "@/modules/project/services/project.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ProjectsListProps = {
  instance: string;
};

export function ProjectsList({ instance }: ProjectsListProps) {
  const [view, setView] = useState<"grid" | "list">("grid");
  
  const { data: projects = [], isLoading } = useQuery({
    queryKey: projectQueryKeys.list(instance),
    queryFn: () => projectService.list(instance),
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-[#9db4c2]">
        Loading projects...
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl py-12">
      <div className="mb-10 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-white">All Projects</h1>
          <p className="mt-2 text-[#9db4c2]">Everything you are part of in {instance}.</p>
        </div>
        
        <div className="flex items-center gap-2 rounded-full bg-white/5 p-1">
          <button
            onClick={() => setView("grid")}
            className={cn(
              "flex size-9 items-center justify-center rounded-full transition-colors",
              view === "grid" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
            )}
          >
            <LayoutGrid className="size-5" />
          </button>
          <button
            onClick={() => setView("list")}
            className={cn(
              "flex size-9 items-center justify-center rounded-full transition-colors",
              view === "list" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
            )}
          >
            <List className="size-5" />
          </button>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/10 bg-white/2 text-[#9db4c2]">
          <FolderOpenDot className="mb-4 size-12 opacity-20" />
          <p>No projects found in this instance.</p>
        </div>
      ) : view === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <Link 
              key={project.id} 
              href={`/${instance}/${project.workspaceId}/${project.key.toLowerCase()}/board`} 
              className="group"
            >
              <Card className="h-full rounded-[1.6rem] border-white/8 bg-[#1a262d] text-[#f5efe5] transition-transform duration-200 group-hover:-translate-y-1 group-hover:border-white/14">
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge className="bg-[#8baac0]/20 text-[#8baac0] hover:bg-[#8baac0]/30">
                        {project.workspaceId}
                      </Badge>
                      <CardTitle className="mt-4 text-3xl tracking-[-0.04em]">{project.name}</CardTitle>
                    </div>
                    <FolderOpenDot className="size-5 text-white/45" />
                  </div>
                  <CardDescription className="text-lg text-[#ddd4c8]">
                    {project.key} — Dynamic workspace for project management.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-end">
                  <span className="inline-flex items-center gap-2 text-sm text-[#d5ccc1]">
                    Open Project
                    <ArrowRight className="size-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <Link 
              key={project.id} 
              href={`/${instance}/${project.workspaceId}/${project.key.toLowerCase()}/board`} 
              className="group"
            >
              <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-[#1a262d] px-6 py-5 transition-colors group-hover:bg-[#202d35]">
                <div className="flex items-center gap-6">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-white/5 text-white/45">
                    <FolderOpenDot className="size-6" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">{project.name}</div>
                    <div className="text-sm text-[#9db4c2]">{project.key} · {project.workspaceId}</div>
                  </div>
                </div>
                <ArrowRight className="size-5 text-white/30 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
