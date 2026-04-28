import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ChatPlaceholderProps = {
  icon: LucideIcon;
};

export function ChatPlaceholder({ icon: Icon }: ChatPlaceholderProps) {
  return (
    <Card className="border-border/70 bg-card/90">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="size-4 text-primary" />
          Pings
        </CardTitle>
        <CardDescription>Organization-wide chat now lives in the dedicated Pings route.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm leading-6 text-muted-foreground">
        Use Pings for team-wide updates, cross-project discussion, and quick coordination across the instance.
      </CardContent>
    </Card>
  );
}
