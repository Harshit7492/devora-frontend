import { WS_BASE_URL } from "@/config/constants";

export type RealtimeEvent = "ticket:update" | "ticket:create" | "chat:message" | "notification:new";

type Listener = (payload?: unknown) => void;

class WebSocketManager {
  private socket: WebSocket | null = null;
  private listeners = new Map<RealtimeEvent, Set<Listener>>();
  private reconnectTimer: number | null = null;
  private instance = "acme";

  connect(instance?: string) {
    if (instance) this.instance = instance;
    if (typeof window === "undefined" || !WS_BASE_URL || this.socket) {
      return;
    }

    const url = `${WS_BASE_URL}?instance=${this.instance}`;
    this.socket = new window.WebSocket(url);

    this.socket.addEventListener("message", (event) => {
      try {
        const parsed = JSON.parse(event.data) as { event: RealtimeEvent; payload?: unknown };
        this.emit(parsed.event, parsed.payload);
      } catch {
        this.emit("notification:new", event.data);
      }
    });

    this.socket.addEventListener("close", () => {
      this.socket = null;

      if (this.reconnectTimer) {
        window.clearTimeout(this.reconnectTimer);
      }

      this.reconnectTimer = window.setTimeout(() => {
        this.connect();
      }, 3000);
    });
  }

  subscribe(event: RealtimeEvent, listener: Listener) {
    const listeners = this.listeners.get(event) ?? new Set<Listener>();
    listeners.add(listener);
    this.listeners.set(event, listeners);

    return () => {
      listeners.delete(listener);

      if (listeners.size === 0) {
        this.listeners.delete(event);
      }
    };
  }

  send(event: RealtimeEvent, payload?: unknown) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      return;
    }

    this.socket.send(JSON.stringify({ event, payload }));
  }

  private emit(event: RealtimeEvent, payload?: unknown) {
    this.listeners.get(event)?.forEach((listener) => listener(payload));
  }
}

export const websocketManager = new WebSocketManager();
