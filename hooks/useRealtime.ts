"use client";

import { useEffect } from "react";

import { websocketManager, type RealtimeEvent } from "@/lib/websocket";

type Handler = (payload?: unknown) => void;

export function useRealtime(event: RealtimeEvent, handler: Handler) {
  useEffect(() => {
    websocketManager.connect();

    return websocketManager.subscribe(event, handler);
  }, [event, handler]);
}
