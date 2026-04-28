import { api } from "@/lib/api";

export type Invitation = {
  id: string;
  email: string;
  projectId: string;
  instanceId: string;
  token: string;
  invitedBy: string;
  status: "pending" | "accepted" | "expired";
  expiresAt: string;
  createdAt: string;
};

export const invitationService = {
  create: async (instance: string, data: { email: string; projectId: string }) => {
    const response = await api.post(`/api/${instance}/invitations`, data);
    return response.data;
  },

  accept: async (instance: string, token: string) => {
    const response = await api.post(`/api/${instance}/invitations/accept`, { token });
    return response.data;
  },

  info: async (token: string) => {
    // This is a public endpoint
    const response = await api.get<Invitation>(`/invitations/info?token=${token}`);
    return response.data;
  },

  listByProject: async (instance: string, projectId: string) => {
    const response = await api.get<Invitation[]>(`/api/${instance}/invitations?projectId=${projectId}`);
    return response.data;
  },

  revoke: async (instance: string, id: string) => {
    const response = await api.delete(`/api/${instance}/invitations/${id}`);
    return response.data;
  },
};

export const invitationQueryKeys = {
  all: ["invitations"] as const,
  list: (instance: string, projectId: string) => [...invitationQueryKeys.all, instance, "list", projectId] as const,
  info: (token: string) => [...invitationQueryKeys.all, "info", token] as const,
};
