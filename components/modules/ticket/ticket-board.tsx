"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRealtime } from "@/hooks/useRealtime";
import { useTickets } from "@/hooks/useTickets";
import type { TicketScope } from "@/modules/ticket/services/ticket.service";

const statuses = ["backlog", "todo", "in_progress", "done"] as const;

type TicketBoardProps = {
  scope: TicketScope;
};

export function TicketBoard({ scope }: TicketBoardProps) {
  const { groupedTickets, isLoading, refetch } = useTickets(scope);

  useRealtime("ticket:update", () => {
    void refetch();
  });
  useRealtime("ticket:create", () => {
    void refetch();
  });

  if (isLoading) {
    return <div className="py-16 text-center text-sm text-muted-foreground">Loading tickets...</div>;
  }

  return (
    <div className="grid gap-4 xl:grid-cols-4">
      {statuses.map((status) => (
        <div key={status} className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">{status.replaceAll("_", " ")}</h3>
            <Badge variant="outline">{groupedTickets[status].length}</Badge>
          </div>
          <div className="space-y-3">
            {groupedTickets[status].map((ticket) => (
              <Card key={ticket.id} className="border-border/70 bg-background/70">
                <CardHeader className="space-y-3 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <Badge>{ticket.priority}</Badge>
                    <span className="font-mono text-xs text-muted-foreground">{ticket.key}</span>
                  </div>
                  <CardTitle className="text-base leading-6">{ticket.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-4 pt-0">
                  <p className="text-sm leading-6 text-muted-foreground">{ticket.summary}</p>
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    <span>{ticket.assignee.name}</span>
                    <span>{ticket.points} pts</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
