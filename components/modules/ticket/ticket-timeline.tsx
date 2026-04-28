"use client";

import { Badge } from "@/components/ui/badge";
import { useTickets } from "@/hooks/useTickets";
import type { TicketScope } from "@/modules/ticket/services/ticket.service";

type TicketTimelineProps = {
  scope: TicketScope;
};

export function TicketTimeline({ scope }: TicketTimelineProps) {
  const { tickets, isLoading } = useTickets(scope);

  if (isLoading) {
    return <div className="py-16 text-center text-sm text-muted-foreground">Loading timeline...</div>;
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <div key={ticket.id} className="grid gap-3 rounded-xl border border-border/70 bg-background/70 p-4 md:grid-cols-[10rem_minmax(0,1fr)]">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{ticket.dueDate}</div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{ticket.status}</Badge>
              <span className="text-sm font-semibold">{ticket.title}</span>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">{ticket.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
