"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRealtime } from "@/hooks/useRealtime";
import { useTickets } from "@/hooks/useTickets";
import type { TicketScope } from "@/modules/ticket/services/ticket.service";

const statuses = ["backlog", "todo", "in_progress", "done"] as const;
type Status = typeof statuses[number];

type TicketBoardProps = {
  scope: TicketScope;
};

export function TicketBoard({ scope }: TicketBoardProps) {
  const { groupedTickets, isLoading, refetch, updateTicket, tickets } = useTickets(scope);

  // We need local state for immediate drag-and-drop response before React Query finishes
  const [localColumns, setLocalColumns] = useState<Record<Status, any[]>>({
    backlog: [],
    todo: [],
    in_progress: [],
    done: [],
  });

  useEffect(() => {
    if (!isLoading) {
      setLocalColumns(groupedTickets);
    }
  }, [groupedTickets, isLoading]);

  useRealtime("ticket:update", () => {
    void refetch();
  });
  useRealtime("ticket:create", () => {
    void refetch();
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Dropped outside a valid column
    if (!destination) return;

    // Dropped in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceStatus = source.droppableId as Status;
    const destStatus = destination.droppableId as Status;

    const sourceCol = [...localColumns[sourceStatus]];
    const destCol = sourceStatus === destStatus ? sourceCol : [...localColumns[destStatus]];
    
    const [movedTicket] = sourceCol.splice(source.index, 1);
    
    // Update local state for immediate feedback
    if (sourceStatus === destStatus) {
      sourceCol.splice(destination.index, 0, movedTicket);
      setLocalColumns({
        ...localColumns,
        [sourceStatus]: sourceCol,
      });
    } else {
      movedTicket.status = destStatus;
      destCol.splice(destination.index, 0, movedTicket);
      setLocalColumns({
        ...localColumns,
        [sourceStatus]: sourceCol,
        [destStatus]: destCol,
      });
    }

    // Fire off the API update (this is optimistic thanks to our useTickets changes)
    updateTicket.mutate({
      ticketId: draggableId,
      data: { status: destStatus },
    });
  };

  if (isLoading) {
    return <div className="py-16 text-center text-sm text-muted-foreground">Loading tickets...</div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid gap-4 xl:grid-cols-4">
        {statuses.map((status) => (
          <div key={status} className="space-y-3 flex flex-col min-h-[300px]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {status.replaceAll("_", " ")}
              </h3>
              <Badge variant="outline">{localColumns[status]?.length || 0}</Badge>
            </div>
            
            <Droppable droppableId={status}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex-1 rounded-xl p-2 transition-colors ${snapshot.isDraggingOver ? "bg-white/5" : ""}`}
                >
                  <div className="space-y-3">
                    {localColumns[status]?.map((ticket, index) => (
                      <Draggable key={ticket.id} draggableId={ticket.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                            }}
                          >
                            <Card className={`border-border/70 ${snapshot.isDragging ? "bg-background shadow-xl scale-[1.02] ring-2 ring-primary/50" : "bg-background/70 hover:bg-background/90 hover:border-border transition-colors"} cursor-grab active:cursor-grabbing`}>
                              <CardHeader className="space-y-3 p-4">
                                <div className="flex items-center justify-between gap-3">
                                  <Badge>{ticket.priority}</Badge>
                                  <span className="font-mono text-xs text-muted-foreground">{ticket.key}</span>
                                </div>
                                <CardTitle className="text-base leading-6">{ticket.title}</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3 p-4 pt-0">
                                <div 
                                  className="text-sm leading-6 text-muted-foreground line-clamp-2 prose prose-sm dark:prose-invert prose-p:m-0 prose-p:leading-6"
                                  dangerouslySetInnerHTML={{ __html: ticket.summary }}
                                />
                                <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-muted-foreground">
                                  <span>{ticket.assignee?.name || "Unassigned"}</span>
                                  <span>{ticket.points} pts</span>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
