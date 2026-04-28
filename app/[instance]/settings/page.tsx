import { BellRing, DatabaseZap, ShieldCheck } from "lucide-react";
import settingsSeed from "@/data/seeds/settings.json";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const iconMap = {
  shield: ShieldCheck,
  bell: BellRing,
  database: DatabaseZap,
} as const;

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Badge>Instance settings</Badge>
        <h1 className="text-3xl font-semibold tracking-[-0.04em]">Settings surface for scoped admin controls.</h1>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
          This page is intentionally lean. The structure is in place for service-backed configuration and permission management.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {settingsSeed.map((group) => {
          const Icon = iconMap[group.icon as keyof typeof iconMap];

          return (
            <Card key={group.title} className="border-border/70 bg-card/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon className="size-4 text-primary" />
                  {group.title}
                </CardTitle>
                <CardDescription>{group.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Ready for API-backed settings forms and validation schemas.</CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
