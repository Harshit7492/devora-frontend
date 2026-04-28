"use client";

import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRealtime } from "@/hooks/useRealtime";
import { useTickets } from "@/hooks/useTickets";
import type { Ticket } from "@/types/ticket";
import type { TicketScope } from "@/modules/ticket/services/ticket.service";

const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "key",
    header: "Key",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant="outline">{row.original.status}</Badge>,
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "assignee.name",
    header: "Assignee",
  },
  {
    accessorKey: "points",
    header: "Points",
  },
];

type TicketTableProps = {
  scope: TicketScope;
};

export function TicketTable({ scope }: TicketTableProps) {
  const { tickets, isLoading, refetch } = useTickets(scope);

  useRealtime("ticket:update", () => {
    void refetch();
  });

  // TanStack Table is intentionally used here for the sheet view.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: tickets,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div className="py-16 text-center text-sm text-muted-foreground">Loading table...</div>;
  }

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {cell.column.columnDef.cell ? flexRender(cell.column.columnDef.cell, cell.getContext()) : String(cell.getValue() ?? "")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
