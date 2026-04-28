"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { TicketPriority, TicketStatus } from "@/types/ticket";
import { useTickets } from "@/hooks/useTickets";
import type { TicketScope } from "@/modules/ticket/services/ticket.service";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const createTicketSchema = z.object({
  title: z.string().min(4, "Use a clearer title"),
  summary: z.string().min(10, "Add a short summary"),
  priority: z.enum(["low", "medium", "high", "critical"]),
  status: z.enum(["backlog", "todo", "in_progress", "done"]),
});

type CreateTicketValues = z.infer<typeof createTicketSchema>;

const priorities: TicketPriority[] = ["low", "medium", "high", "critical"];
const statuses: TicketStatus[] = ["backlog", "todo", "in_progress", "done"];

type TicketCreateDialogProps = {
  scope: TicketScope;
};

export function TicketCreateDialog({ scope }: TicketCreateDialogProps) {
  const [open, setOpen] = useState(false);
  const { createTicket } = useTickets(scope);

  const form = useForm<CreateTicketValues>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: "",
      summary: "",
      priority: "medium",
      status: "todo",
    },
  });

  const handleSubmit = async (values: CreateTicketValues) => {
    await createTicket.mutateAsync(values);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create ticket</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create ticket</DialogTitle>
          <DialogDescription>New tickets go through the module service layer and refresh the cached project view.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Launch workspace timeline review" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Input placeholder="Short delivery summary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-11 w-full rounded-lg border border-border/70 bg-input px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
                        {...field}
                      >
                        {priorities.map((priority) => (
                          <option key={priority} value={priority}>
                            {priority}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-11 w-full rounded-lg border border-border/70 bg-input px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
                        {...field}
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={createTicket.isPending}>
                {createTicket.isPending ? "Creating..." : "Save ticket"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
