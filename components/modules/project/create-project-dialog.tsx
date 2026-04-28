"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, CircleHelp } from "lucide-react";
import { toast } from "sonner";

import projectCreationSeed from "@/data/seeds/project-creation.json";
import { projectQueryKeys, projectService } from "@/modules/project/services/project.service";
import { invitationService } from "@/modules/invitation/services/invitation.service";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type CreateProjectDialogProps = {
  triggerLabel: string;
  instance?: string;
};

type ToolConfig = (typeof projectCreationSeed.tools)[number];

export function CreateProjectDialog({ triggerLabel, instance = "acme" }: CreateProjectDialogProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [invitees, setInvitees] = useState("");
  const [tools, setTools] = useState<ToolConfig[]>(projectCreationSeed.tools);

  const toggleTool = (id: string) => {
    setTools((current) =>
      current.map((tool) => (tool.id === id ? { ...tool, enabled: !tool.enabled } : tool)),
    );
  };

  const createProject = useMutation({
    mutationFn: async () => {
      const project = await projectService.create(instance, {
        name: projectName,
        key: projectName.slice(0, 4).toUpperCase().replace(/\s/g, ""),
        workspaceId: "default",
      });

      if (invitees.trim()) {
        const emails = invitees
          .split(/[\s,]+/)
          .map((e) => e.trim())
          .filter((e) => e && e.includes("@"));

        await Promise.all(
          emails.map((email) => invitationService.create(instance, { email, projectId: project.id })),
        );
      }

      return project;
    },
    onSuccess: (project) => {
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.list(instance) });
      toast.success("Project created", {
        description: `${project.name} is ready. Invitations sent if specified.`,
      });
      setOpen(false);
      setProjectName("");
      setProjectDescription("");
      setInvitees("");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to create project");
    },
  });

  const handleSubmit = () => createProject.mutate();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-full bg-[#7dd38c] px-8 text-[#102018] hover:bg-[#72c681]">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[min(94vw,58rem)] rounded-[1.1rem] border-white/10 bg-[#1e2b31] p-0 text-[#f5efe5] shadow-[0_28px_90px_rgba(0,0,0,0.36)]">
        <div className="max-h-[85vh] overflow-y-auto px-8 py-8">
          <DialogHeader className="sr-only">
            <DialogTitle>Create project</DialogTitle>
            <DialogDescription>Project setup wizard.</DialogDescription>
          </DialogHeader>

          <section>
            <div className="flex items-center gap-3">
              <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#7dd38c] text-sm font-semibold text-[#102018]">1</span>
              <h2 className="text-[2rem] font-semibold tracking-[-0.04em]">{projectCreationSeed.title}</h2>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between gap-4 text-sm font-medium text-white/90">
                <span>Name this project</span>
                <button className="text-sm text-[#63a8ff] underline underline-offset-4">{projectCreationSeed.templateLinkLabel}</button>
              </div>
              <Input
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
                placeholder={projectCreationSeed.namePlaceholder}
                className="h-12 border-[#3d6ea5] bg-[#203038] text-white placeholder:text-white/35"
              />
            </div>

            <div className="mt-6">
              <div className="mb-2 text-sm font-medium text-white/90">Add a description (optional)</div>
              <textarea
                value={projectDescription}
                onChange={(event) => setProjectDescription(event.target.value)}
                placeholder={projectCreationSeed.descriptionPlaceholder}
                className="min-h-28 w-full rounded-md border border-white/12 bg-[#203038] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus-visible:ring-2 focus-visible:ring-[#3d6ea5]"
              />
            </div>

            <div className="mt-6">
              <div className="text-sm font-medium text-white/90">Set the schedule (optional)</div>
              <button className="mt-1 text-sm text-[#63a8ff] underline underline-offset-4">{projectCreationSeed.scheduleLinkLabel}</button>
            </div>
          </section>

          <section className="mt-10">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#7dd38c] text-sm font-semibold text-[#102018]">2</span>
              <h2 className="text-[2rem] font-semibold tracking-[-0.04em]">{projectCreationSeed.toolsTitle}</h2>
            </div>
            <p className="mt-2 text-sm text-white/55">{projectCreationSeed.toolsSubtitle}</p>

            <div className="mt-5 grid gap-0 overflow-hidden rounded-lg border border-white/10 md:grid-cols-3">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  className="border-b border-r border-white/10 bg-[#1c282e] px-5 py-4 text-left transition-colors hover:bg-[#223038] md:min-h-52"
                  onClick={() => toggleTool(tool.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-lg font-semibold text-white">{tool.label}</div>
                    <div
                      className={cn(
                        "inline-flex min-w-14 items-center justify-between rounded-full px-2 py-1 text-xs font-semibold",
                        tool.enabled ? "bg-[#7dd38c] text-[#102018]" : "bg-[#2c3b44] text-white/70",
                      )}
                    >
                      <span>{tool.enabled ? "On" : "Off"}</span>
                      <span
                        className={cn(
                          "ml-2 inline-flex size-4 rounded-full",
                          tool.enabled ? "bg-[#102018]" : "bg-white/35",
                        )}
                      />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-white/70">{tool.description}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#7dd38c] text-sm font-semibold text-[#102018]">3</span>
              <h2 className="text-[2rem] font-semibold tracking-[-0.04em]">{projectCreationSeed.inviteTitle}</h2>
            </div>
            <p className="mt-2 max-w-3xl text-sm text-white/55">{projectCreationSeed.inviteSubtitle}</p>

            <div className="mt-5">
              <Input
                value={invitees}
                onChange={(event) => setInvitees(event.target.value)}
                placeholder={projectCreationSeed.invitePlaceholder}
                className="h-12 border-white/12 bg-[#203038] text-white placeholder:text-white/35"
              />
            </div>

            <div className="mt-4 text-sm text-white/55">You can always invite people later.</div>
            <button className="mt-2 text-sm text-[#63a8ff] underline underline-offset-4">{projectCreationSeed.inviteNoteLabel}</button>
          </section>

          <div className="mt-10 flex flex-col items-center">
            <Button
              size="lg"
              className="rounded-full bg-[#7dd38c] px-8 text-[#102018] hover:bg-[#72c681]"
              onClick={handleSubmit}
              disabled={createProject.isPending || !projectName.trim()}
            >
              {projectCreationSeed.submitLabel}
            </Button>
            <div className="mt-5 flex max-w-xl items-start gap-2 text-center text-sm leading-6 text-white/72">
              <Check className="mt-0.5 size-4 shrink-0 text-[#7dd38c]" />
              <span>{projectCreationSeed.footerNote}</span>
            </div>
            <div className="mt-3 inline-flex items-center gap-2 text-xs text-white/40">
              <CircleHelp className="size-4" />
              Project will be saved to your workspace.
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
