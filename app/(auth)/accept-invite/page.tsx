"use client";

import { useEffect, useState, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, UserPlus, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { invitationService, Invitation } from "@/modules/invitation/services/invitation.service";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function AcceptInvitePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const isAuthenticated = true
  const { user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: invite, isLoading: inviteLoading, error: inviteError } = useQuery({
    queryKey: ["invitation-info", token],
    queryFn: () => (token ? invitationService.info(token) : Promise.reject("No token")),
    enabled: !!token && mounted,
    retry: false,
  });

  const acceptMutation = useMutation({
    mutationFn: () => invitationService.accept(invite!.instanceId, token!),
    onSuccess: () => {
      toast.success("Joined successfully!");
      router.push(`/${invite?.instanceId || "acme"}/home`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to join project");
    },
  });

  if (!mounted) return null;

  if (!token) {
    return (
      <Card className="mx-auto w-full max-w-md border-white/10 bg-[#1e2b31] text-white">
        <CardHeader>
          <div className="flex justify-center pb-4">
            <AlertCircle className="size-12 text-red-400" />
          </div>
          <CardTitle className="text-center text-2xl">Invalid Link</CardTitle>
          <CardDescription className="text-center text-white/55">
            This invitation link is missing a token. Please check the URL and try again.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full rounded-full" onClick={() => router.push("/")}>
            Go to Home
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (inviteLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <Loader2 className="size-8 animate-spin text-[#7dd38c]" />
        <p className="text-sm text-white/55">Fetching invitation details...</p>
      </div>
    );
  }

  if (inviteError || !invite) {
    return (
      <Card className="mx-auto w-full max-w-md border-white/10 bg-[#1e2b31] text-white">
        <CardHeader>
          <div className="flex justify-center pb-4">
            <AlertCircle className="size-12 text-red-400" />
          </div>
          <CardTitle className="text-center text-2xl">Invitation Not Found</CardTitle>
          <CardDescription className="text-center text-white/55">
            This invitation may have expired or been revoked.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full rounded-full" onClick={() => router.push("/")}>
            Go to Home
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (!isAuthenticated) {
    return (
      <Card className="mx-auto w-full max-w-md border-white/10 bg-[#1e2b31] text-white">
        <CardHeader>
          <div className="flex justify-center pb-4">
            <UserPlus className="size-12 text-[#7dd38c]" />
          </div>
          <CardTitle className="text-center text-2xl">You're Invited!</CardTitle>
          <CardDescription className="text-center text-white/55">
            You've been invited to join a project on Devora. Please log in or create an account to accept the invite.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-white/5 p-4">
            <p className="text-sm text-white/70">Invitation for: <span className="text-white font-medium">{invite.email}</span></p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full rounded-full bg-[#7dd38c] text-[#102018] hover:bg-[#72c681]" onClick={() => router.push(`/login?redirect=/accept-invite?token=${token}`)}>
            Log In
          </Button>
          <Button variant="ghost" className="w-full rounded-full" onClick={() => router.push(`/signup?email=${invite.email}&redirect=/accept-invite?token=${token}`)}>
            Create Account
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-md border-white/10 bg-[#1e2b31] text-white">
      <CardHeader>
        <div className="flex justify-center pb-4">
          <CheckCircle2 className="size-12 text-[#7dd38c]" />
        </div>
        <CardTitle className="text-center text-2xl">Accept Invitation</CardTitle>
        <CardDescription className="text-center text-white/55">
          You are logged in as <span className="text-white font-medium">{user?.email}</span>.
          Would you like to join the project?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4 text-center">
          <p className="text-xs uppercase tracking-wider text-white/40">Project ID</p>
          <p className="mt-1 text-lg font-semibold">{invite.projectId}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button
          className="w-full rounded-full bg-[#7dd38c] text-[#102018] hover:bg-[#72c681]"
          onClick={() => acceptMutation.mutate()}
          disabled={acceptMutation.isPending}
        >
          {acceptMutation.isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Joining...
            </>
          ) : (
            "Join Project"
          )}
        </Button>
        <Button variant="ghost" className="w-full rounded-full" onClick={() => router.push("/")}>
          Not Now
        </Button>
      </CardFooter>
    </Card>
  );
}
