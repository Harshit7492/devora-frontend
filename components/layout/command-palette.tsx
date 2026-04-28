"use client";

import { useEffect, useEffectEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Command } from "lucide-react";

import { COMMAND_ACTIONS } from "@/config/constants";
import { useUIStore } from "@/store/ui.store";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";

type CommandPaletteProps = {
  instance: string;
};

type CommandItem = {
  id: string;
  label: string;
  description: string;
  run: () => void;
};

export function CommandPalette({ instance }: CommandPaletteProps) {
  const router = useRouter();
  const isOpen = useUIStore((state) => state.isCommandPaletteOpen);
  const setOpen = useUIStore((state) => state.setCommandPaletteOpen);
  const setQuickActionPanel = useUIStore((state) => state.setQuickActionPanel);
  const [query, setQuery] = useState("");

  const items = useMemo<CommandItem[]>(
    () => [
      {
        ...COMMAND_ACTIONS[0],
        run: () => router.push(`/${instance}/product/launchpad/board`),
      },
      {
        ...COMMAND_ACTIONS[1],
        run: () => setQuickActionPanel("task"),
      },
      {
        ...COMMAND_ACTIONS[2],
        run: () => router.push(`/${instance}/pings`),
      },
      {
        ...COMMAND_ACTIONS[3],
        run: () => setQuickActionPanel("meeting"),
      },
    ],
    [instance, router, setQuickActionPanel],
  );

  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      setOpen(!isOpen);
    }
  });

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filteredItems = items.filter((item) => {
    const haystack = `${item.label} ${item.description}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="top-[14%] w-[min(92vw,42rem)] translate-y-0 rounded-3xl border-border/70 bg-card/95 p-0 shadow-[0_40px_120px_rgba(16,24,24,0.18)]">
        <DialogHeader className="border-b border-border/60 px-5 py-4">
          <DialogTitle className="flex items-center gap-2 text-base">
            <Command className="size-4" />
            Command Palette
          </DialogTitle>
          <DialogDescription>Search actions, jump between contexts, and create work without hunting through menus.</DialogDescription>
        </DialogHeader>
        <div className="p-4">
          <Input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Switch project, create task, open chat..." />
          <div className="mt-4 space-y-2">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                className="flex w-full items-center justify-between rounded-2xl border border-border/60 bg-background/75 px-4 py-3 text-left transition-colors hover:bg-muted/50"
                onClick={() => {
                  item.run();
                  setOpen(false);
                  setQuery("");
                }}
              >
                <div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{item.description}</div>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </button>
            ))}
            {filteredItems.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border/70 px-4 py-8 text-center text-sm text-muted-foreground">
                No match found. Try a project name, action, or intent.
              </div>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
