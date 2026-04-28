import { create } from "zustand";

type UIState = {
  activePanel: "none" | "notifications" | "assistant";
  isCommandPaletteOpen: boolean;
  quickActionPanel: "none" | "task" | "issue" | "meeting" | "ai";
  setActivePanel: (panel: UIState["activePanel"]) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setQuickActionPanel: (panel: UIState["quickActionPanel"]) => void;
};

export const useUIStore = create<UIState>((set) => ({
  activePanel: "none",
  isCommandPaletteOpen: false,
  quickActionPanel: "none",
  setActivePanel: (panel) => set({ activePanel: panel }),
  setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),
  setQuickActionPanel: (panel) => set({ quickActionPanel: panel }),
}));
