import { TicketCreateDialog } from "@/components/modules/ticket/ticket-create-dialog";
import { TicketTable } from "@/components/modules/ticket/ticket-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type SheetPageProps = {
  params: Promise<{
    instance: string;
    workspace: string;
    project: string;
  }>;
};

export default async function SheetPage({ params }: SheetPageProps) {
  const route = await params;

  return (
    <Card className="border-border/70 bg-card/90">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Sheet view</CardTitle>
          <CardDescription>Tabular inspection powered by TanStack Table with shared ticket service data.</CardDescription>
        </div>
        <TicketCreateDialog scope={route} />
      </CardHeader>
      <CardContent>
        <TicketTable scope={route} />
      </CardContent>
    </Card>
  );
}
