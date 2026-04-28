import type { User } from "./user";

export type TicketStatus = "backlog" | "todo" | "in_progress" | "done";
export type TicketPriority = "low" | "medium" | "high" | "critical";

export type Ticket = {
  id: string;
  key: string;
  title: string;
  summary: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignee: User;
  dueDate: string;
  points: number;
};
