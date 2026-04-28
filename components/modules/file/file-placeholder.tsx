import { Files } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function FilePlaceholder() {
  return (
    <Card className="border-border/70 bg-card/90">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Files className="size-4 text-primary" />
          File module
        </CardTitle>
        <CardDescription>Prepared space for uploads, previews, and version-aware attachments.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm leading-6 text-muted-foreground">
        Keep upload transport and metadata fetching in services. Store only transient UI state like active preview drawers in Zustand.
      </CardContent>
    </Card>
  );
}
