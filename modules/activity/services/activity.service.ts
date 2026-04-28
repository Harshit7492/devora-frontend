import { api } from "@/lib/api";

export type ActivityEvent = {
  id: string;
  type: string;
  actor: { id: string; name: string };
  subject: string;
  createdAt: string;
};

export const activityQueryKeys = {
  list: (instance: string, userId?: string) => ["activity", instance, userId ?? "all"] as const,
};

export const activityService = {
  list: (instance: string, userId?: string) => {
    const params = userId ? { userId } : {};
    return api.get<ActivityEvent[]>(`/api/${instance}/activity`, { params }).then((r) => r.data);
  },
};
