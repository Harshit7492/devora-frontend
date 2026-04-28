import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type AiPlaceholderProps = {
  icon: LucideIcon;
};

export function AiPlaceholder({ icon: Icon }: AiPlaceholderProps) {
  return (
    <Card className="border-border/70 bg-card/90">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="size-4 text-primary" />
          AI module
        </CardTitle>
        <CardDescription>Agent actions can slot into this module without leaking task logic into layout or state stores.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm leading-6 text-muted-foreground">
        Treat prompts, runs, and streamed outputs as service-backed resources. Keep panel toggles and composer drafts local.
      </CardContent>
    </Card>
  );
}
