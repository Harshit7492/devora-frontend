import { api } from "@/lib/api";
import type { Ticket, TicketPriority, TicketStatus } from "@/types/ticket";

export type TicketScope = {
  instance: string;
  workspace: string;
  project: string;
};

export type CreateTicketPayload = {
  title: string;
  summary: string;
  priority: TicketPriority;
  status: TicketStatus;
  assigneeId?: string;
  dueDate?: string;
  points?: number;
};

export type UpdateTicketPayload = {
  id: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  title?: string;
  summary?: string;
};

export const ticketQueryKeys = {
  list: (scope: TicketScope) =>
    ["tickets", scope.instance, scope.workspace, scope.project] as const,
};

export const ticketService = {
  list: ({ instance, workspace, project }: TicketScope) =>
    api
      .get<Ticket[]>(`/api/${instance}/${workspace}/${project}/tickets`)
      .then((r) => r.data),

  create: ({ instance, workspace, project }: TicketScope, payload: CreateTicketPayload) =>
    api
      .post<Ticket>(`/api/${instance}/${workspace}/${project}/tickets`, payload)
      .then((r) => r.data),

  update: ({ instance, workspace, project }: TicketScope, { id, ...payload }: UpdateTicketPayload) =>
    api
      .patch<Ticket>(`/api/${instance}/${workspace}/${project}/tickets/${id}`, payload)
      .then((r) => r.data),
};
