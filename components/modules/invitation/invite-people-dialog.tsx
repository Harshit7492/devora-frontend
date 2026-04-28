"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserPlus, Loader2, X, Check, Mail, User, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { invitationService } from "@/modules/invitation/services/invitation.service";
import { projectService } from "@/modules/project/services/project.service";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type InviteType = "member" | "collaborator" | "client";

type Invitee = {
  id: string;
  name: string;
  email: string;
};

type InvitePeopleDialogProps = {
  instance?: string;
  projectId?: string;
};

export function InvitePeopleDialog({ instance = "Monkhub", projectId: initialProjectId }: InvitePeopleDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"selection" | "details">("selection");
  const [inviteType, setInviteType] = useState<InviteType>("member");
  const [invitees, setInvitees] = useState<Invitee[]>([{ id: "1", name: "", email: "" }]);
  const [projectId, setProjectId] = useState(initialProjectId || "");

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ["projects", instance],
    queryFn: () => projectService.list(instance),
    enabled: open && !initialProjectId && step === "details",
  });

  const inviteMutation = useMutation({
    mutationFn: async () => {
      // For now, we only have a single email service, so we loop or just take the first one if we want to be simple
      // But the UI allows multiple, so let's try to send them all
      const promises = invitees
        .filter((i) => i.email.trim() !== "")
        .map((i) => invitationService.create(instance, { email: i.email, projectId }));
      return Promise.all(promises);
    },
    onSuccess: () => {
      toast.success("Invitations sent", {
        description: `Successfully sent ${invitees.filter(i => i.email).length} invitations.`,
      });
      handleClose();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to send invitations");
    },
  });

  const handleClose = () => {
    setOpen(false);
    setStep("selection");
    setInvitees([{ id: "1", name: "", email: "" }]);
    if (!initialProjectId) setProjectId("");
  };

  const addInvitee = () => {
    setInvitees([...invitees, { id: Math.random().toString(36).substr(2, 9), name: "", email: "" }]);
  };

  const removeInvitee = (id: string) => {
    if (invitees.length === 1) return;
    setInvitees(invitees.filter((i) => i.id !== id));
  };

  const updateInvitee = (id: string, field: keyof Invitee, value: string) => {
    setInvitees(invitees.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (invitees.some((i) => !i.email) || (!projectId && !initialProjectId)) {
      toast.error("Please fill in all email addresses and select a project");
      return;
    }
    inviteMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={(val) => (val ? setOpen(true) : handleClose())}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-full bg-[#7dd38c] px-8 text-[#102018] hover:bg-[#72c681]">
          <UserPlus className="mr-2 size-4" />
          Invite people
        </Button>
      </DialogTrigger>
      <DialogContent className={cn(
        "border-none bg-transparent p-0 shadow-none focus:outline-none",
        step === "selection" ? "w-[min(94vw,40rem)]" : "w-[min(94vw,45rem)]"
      )}>
        <div className="flex flex-col items-center">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Who are you inviting?
            </h2>
            {step === "selection" && (
              <p className="mt-2 text-white/60">
                First you'll invite them to the account. Then you can add them to projects.
              </p>
            )}
          </div>

          {step === "selection" ? (
            /* Selection Step */
            <div className="w-full space-y-4">
              <div className="rounded-[1.5rem] bg-[#1e2b31] p-6 shadow-2xl">
                <div className="space-y-3">
                  <InviteOption
                    selected={inviteType === "member"}
                    onClick={() => setInviteType("member")}
                    title={`Someone who works at ${instance}`}
                    description="Coworkers can create projects, add people to projects, and act as administrators."
                  />
                  <InviteOption
                    selected={inviteType === "collaborator"}
                    onClick={() => setInviteType("collaborator")}
                    title="An outside collaborator, partner, contractor, guest, etc."
                    description="This person doesn't work at Monkhub. You can set them up with an account on your workspace so they can collaborate on projects with you."
                  />
                  <InviteOption
                    selected={inviteType === "client"}
                    onClick={() => setInviteType("client")}
                    title="A client you're doing work for"
                    description="Clients can access projects you've created, but they can't create their own, invite or add new people, or become admins. You can hide parts of projects from them so they can't see work in progress."
                  />
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  onClick={() => setStep("details")}
                  className="h-14 rounded-full bg-[#7dd38c] px-10 text-lg font-medium text-[#102018] hover:bg-[#72c681]"
                >
                  Next, enter their name...
                </Button>
              </div>
            </div>
          ) : (
            /* Details Step */
            <div className="w-full space-y-6">
              <div className="rounded-[1.5rem] bg-[#1e2b31] p-8 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    {invitees.map((invitee, index) => (
                      <div key={invitee.id} className="flex items-end gap-3 transition-all duration-300">
                        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
                          <div className="space-y-1.5">
                            {index === 0 && <label className="text-xs font-medium text-white/50 uppercase tracking-wider ml-1">Name</label>}
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/30" />
                              <Input
                                placeholder="Their name"
                                value={invitee.name}
                                onChange={(e) => updateInvitee(invitee.id, "name", e.target.value)}
                                className="h-12 border-white/10 bg-[#25343b] pl-10 text-white placeholder:text-white/30 focus:border-[#7dd38c]/50 focus:ring-0"
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            {index === 0 && <label className="text-xs font-medium text-white/50 uppercase tracking-wider ml-1">Email address</label>}
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/30" />
                              <Input
                                type="email"
                                placeholder="email@example.com"
                                value={invitee.email}
                                onChange={(e) => updateInvitee(invitee.id, "email", e.target.value)}
                                className="h-12 border-white/10 bg-[#25343b] pl-10 text-white placeholder:text-white/30 focus:border-[#7dd38c]/50 focus:ring-0"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        {invitees.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeInvitee(invitee.id)}
                            className="mb-1 h-10 w-10 text-white/30 hover:bg-white/5 hover:text-red-400"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addInvitee}
                    className="flex items-center gap-2 text-sm font-medium text-[#7dd38c] hover:text-[#7dd38c]/80"
                  >
                    <Plus className="size-4" />
                    Add another person
                  </button>

                  <div className="h-px bg-white/5" />

                  {!initialProjectId && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Select Project</label>
                      <Select value={projectId} onValueChange={setProjectId}>
                        <SelectTrigger className="h-12 border-white/10 bg-[#25343b] text-white focus:ring-0">
                          <SelectValue placeholder="Which project should they join?" />
                        </SelectTrigger>
                        <SelectContent className="border-white/10 bg-[#1e2b31] text-white">
                          {projectsLoading ? (
                            <div className="flex items-center justify-center py-4">
                              <Loader2 className="size-4 animate-spin text-white/40" />
                            </div>
                          ) : (
                            projects?.map((project) => (
                              <SelectItem key={project.id} value={project.id} className="hover:bg-[#2c3b44] focus:bg-[#2c3b44]">
                                {project.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-between">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep("selection")}
                      className="rounded-full text-white/60 hover:bg-white/5 hover:text-white"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={inviteMutation.isPending}
                      className="rounded-full bg-[#7dd38c] px-10 py-6 text-lg font-semibold text-[#102018] hover:bg-[#72c681]"
                    >
                      {inviteMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 size-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Invitations"
                      )}
                    </Button>
                  </div>
                </form>
              </div>

              <div className="mx-auto flex max-w-md items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-sm text-white/50">
                <div className="mt-0.5 rounded-full bg-[#7dd38c]/20 p-1">
                  <Check className="size-3 text-[#7dd38c]" />
                </div>
                <p>
                  They'll get an email with a link to set up their account.
                  Invitations expire in 48 hours.
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InviteOption({
  selected,
  onClick,
  title,
  description
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex w-full items-start gap-4 rounded-[1.1rem] border-2 p-5 text-left transition-all duration-200",
        selected
          ? "border-[#7dd38c] bg-[#7dd38c]/[0.03]"
          : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
      )}
    >
      <div className={cn(
        "mt-1.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
        selected ? "border-[#7dd38c] bg-[#7dd38c]" : "border-white/20"
      )}>
        {selected && <div className="size-2 rounded-full bg-[#102018]" />}
      </div>
      <div className="space-y-1">
        <h3 className={cn(
          "text-lg font-semibold transition-colors",
          selected ? "text-white" : "text-white/80 group-hover:text-white"
        )}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-white/50">
          {description}
        </p>
      </div>
    </button>
  );
}
