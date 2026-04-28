import { api } from "@/lib/api";

export type Channel = {
  id: string;
  name: string;
  description?: string;
  unread?: number;
};

export type ChatMessage = {
  id: string;
  body: string;
  channelId: string;
  author: { id: string; name: string };
  createdAt: string;
};

export const chatQueryKeys = {
  channels: (instance: string) => ["channels", instance] as const,
  messages: (channelId: string) => ["messages", channelId] as const,
};

export const chatService = {
  listChannels: (instance: string) =>
    api.get<Channel[]>(`/api/${instance}/channels`).then((r) => r.data),

  listMessages: (instance: string, channelId: string) =>
    api.get<ChatMessage[]>(`/api/${instance}/channels/${channelId}/messages`).then((r) => r.data),

  sendMessage: (instance: string, channelId: string, body: string) =>
    api.post<ChatMessage>(`/api/${instance}/channels/${channelId}/messages`, { body }).then((r) => r.data),
};
