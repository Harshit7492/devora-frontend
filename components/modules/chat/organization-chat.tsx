"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Hash, Send, Volume2, Users } from "lucide-react";

import { chatQueryKeys, chatService, type ChatMessage } from "@/modules/chat/services/chat.service";
import { useRealtime } from "@/hooks/useRealtime";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type OrganizationChatProps = { instance: string };

export function OrganizationChat({ instance }: OrganizationChatProps) {
  const queryClient = useQueryClient();
  const [activeChannelId, setActiveChannelId] = useState<string>("");
  const [draft, setDraft] = useState("");

  const { data: channels = [] } = useQuery({
    queryKey: chatQueryKeys.channels(instance),
    queryFn: () => chatService.listChannels(instance),
    select: (data) => {
      if (!activeChannelId && data.length > 0) setActiveChannelId(data[0].id);
      return data;
    },
  });

  const activeChannel = useMemo(
    () => channels.find((c) => c.id === activeChannelId) ?? channels[0],
    [channels, activeChannelId],
  );

  const messagesKey = chatQueryKeys.messages(activeChannelId);
  const { data: messages = [] } = useQuery({
    queryKey: messagesKey,
    queryFn: () => chatService.listMessages(instance, activeChannelId),
    enabled: !!activeChannelId,
  });

  const sendMessage = useMutation({
    mutationFn: (body: string) => chatService.sendMessage(instance, activeChannelId, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: messagesKey }),
  });

  useRealtime("chat:message", (payload) => {
    const msg = payload as Partial<ChatMessage>;
    if (msg?.channelId === activeChannelId) {
      queryClient.invalidateQueries({ queryKey: messagesKey });
    }
  });

  const submit = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    sendMessage.mutate(trimmed);
    setDraft("");
  };

  return (
    <section className="min-h-[calc(100vh-5.2rem)] bg-[#091217] px-4 pb-8 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1700px] gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <aside className="rounded-[1.7rem] border border-white/8 bg-[#162127] p-5 text-[#f3ece3] shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-white/45">{instance}</div>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Pings</h1>
            </div>
            <Users className="mt-1 size-5 text-white/40" />
          </div>

          <div className="mt-8 space-y-2">
            {channels.map((channel) => (
              <button
                key={channel.id}
                className={cn(
                  "flex w-full items-start justify-between gap-3 rounded-2xl px-4 py-3 text-left transition-colors",
                  activeChannelId === channel.id
                    ? "bg-white/10 text-white"
                    : "bg-transparent text-white/75 hover:bg-white/6 hover:text-white",
                )}
                onClick={() => setActiveChannelId(channel.id)}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Hash className="size-4" />
                    {channel.name}
                  </div>
                  {channel.description && (
                    <div className="mt-1 text-sm leading-5 text-white/45">{channel.description}</div>
                  )}
                </div>
                {channel.unread ? (
                  <span className="rounded-full bg-[#7ed295] px-2 py-0.5 text-xs font-semibold text-[#102018]">
                    {channel.unread}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </aside>

        <div className="flex min-h-[44rem] flex-col rounded-[1.7rem] border border-white/8 bg-[#111b20] text-[#f3ece3] shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
          <header className="flex items-center justify-between gap-4 border-b border-white/8 px-6 py-5">
            <div>
              <div className="flex items-center gap-2 text-xl font-semibold">
                <Hash className="size-5 text-white/55" />
                {activeChannel?.name}
              </div>
              {activeChannel?.description && (
                <p className="mt-1 text-sm text-white/52">{activeChannel.description}</p>
              )}
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/4 px-4 py-2 text-sm text-white/76">
              <Volume2 className="size-4" />
              Org chat
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
            {messages.map((message) => (
              <div key={message.id} className="max-w-3xl rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#9060ff,#6a47dd)] text-sm font-semibold text-white">
                    {message.author.name
                      .split(" ")
                      .map((p) => p[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{message.author.name}</div>
                    <div className="text-xs uppercase tracking-[0.16em] text-white/40">
                      {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-[1.02rem] leading-8 text-white/82">{message.body}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-white/8 px-6 py-5">
            <div className="flex gap-3">
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); submit(); } }}
                className="h-12 border-white/10 bg-white/4 text-white placeholder:text-white/35"
                placeholder={activeChannel ? `Message #${activeChannel.name}` : "Select a channel"}
              />
              <Button className="h-12 rounded-full px-5" onClick={submit} disabled={sendMessage.isPending}>
                <Send className="size-4" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
