import { api } from "@/lib/api";
import type { Project } from "@/types/project";

export type CreateProjectPayload = {
  name: string;
  key: string;
  workspaceId: string;
};

export const projectQueryKeys = {
  list: (instance: string) => ["projects", instance] as const,
};

export const projectService = {
  list: (instance: string) =>
    api.get<Project[]>(`/api/${instance}/projects`).then((r) => r.data),

  create: (instance: string, payload: CreateProjectPayload) =>
    api.post<Project>(`/api/${instance}/projects`, payload).then((r) => r.data),
};
