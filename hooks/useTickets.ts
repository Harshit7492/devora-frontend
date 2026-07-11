"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  ticketQueryKeys,
  ticketService,
  type CreateTicketPayload,
  type TicketScope,
  type UpdateTicketPayload,
} from "@/modules/ticket/services/ticket.service";

export function useTickets(scope: TicketScope) {
  const queryClient = useQueryClient();
  const queryKey = ticketQueryKeys.list(scope);

  const ticketsQuery = useQuery({
    queryKey,
    queryFn: () => ticketService.list(scope),
  });

  const createTicket = useMutation({
    mutationFn: (payload: CreateTicketPayload) => ticketService.create(scope, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  const updateTicket = useMutation({
    mutationFn: (payload: UpdateTicketPayload) => ticketService.update(scope, payload),
    onMutate: async (newTicket) => {
      await queryClient.cancelQueries({ queryKey });
      const previousTickets = queryClient.getQueryData<any[]>(queryKey);
      
      if (previousTickets) {
        queryClient.setQueryData(queryKey, (old: any[]) => {
          if (!old) return old;
          return old.map((ticket) => 
            ticket.id === newTicket.ticketId ? { ...ticket, ...newTicket.data } : ticket
          );
        });
      }
      return { previousTickets };
    },
    onError: (err, newTicket, context) => {
      if (context?.previousTickets) {
        queryClient.setQueryData(queryKey, context.previousTickets);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  const tickets = ticketsQuery.data ?? [];
  const groupedTickets = {
    backlog: tickets.filter((ticket) => ticket.status === "backlog"),
    todo: tickets.filter((ticket) => ticket.status === "todo"),
    in_progress: tickets.filter((ticket) => ticket.status === "in_progress"),
    done: tickets.filter((ticket) => ticket.status === "done"),
  };

  return {
    tickets,
    groupedTickets,
    isLoading: ticketsQuery.isLoading,
    refetch: ticketsQuery.refetch,
    createTicket,
    updateTicket,
  };
}
