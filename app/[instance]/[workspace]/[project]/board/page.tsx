import { TicketBoard } from "@/components/modules/ticket/ticket-board";
import { TicketCreateDialog } from "@/components/modules/ticket/ticket-create-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type BoardPageProps = {
  params: Promise<{
    instance: string;
    workspace: string;
    project: string;
  }>;
};

export default async function BoardPage({ params }: BoardPageProps) {
  const route = await params;

  return (
    <Card className="border-border/70 bg-card/90">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Kanban board</CardTitle>
          <CardDescription>Ticket data flows from query hooks into isolated ticket module components.</CardDescription>
        </div>
        <TicketCreateDialog scope={route} />
      </CardHeader>
      <CardContent>
        <TicketBoard scope={route} />
      </CardContent>
    </Card>
  );
}
