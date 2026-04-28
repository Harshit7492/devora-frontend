"use client";

import { usePathname } from "next/navigation";

import { ProjectTabs } from "./project-tabs";

type ProjectShellProps = {
  children: React.ReactNode;
  instance: string;
  workspace: string;
  project: string;
};

export function ProjectShell({ children, instance, workspace, project }: ProjectShellProps) {
  const pathname = usePathname();
  const isTimeline = pathname.endsWith("/timeline");

  if (isTimeline) {
    return <>{children}</>;
  }

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <div className="inline-flex rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/70">
          Project workspace
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[#f5efe5]">{project}</h1>
          <p className="text-sm text-white/55">
            Instance {instance} / Workspace {workspace}
          </p>
        </div>
      </header>
      <ProjectTabs instance={instance} workspace={workspace} project={project} />
      {children}
    </div>
  );
}
