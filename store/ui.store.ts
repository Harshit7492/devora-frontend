import { create } from "zustand";

type BottomNavTab = "tasks" | "events" | "bookmarks" | "notes" | null;

type UIState = {
  activePanel: "none" | "notifications" | "assistant";
  isCommandPaletteOpen: boolean;
  quickActionPanel: "none" | "task" | "issue" | "meeting" | "ai";
  isPingsOpen: boolean;
  bottomNavTab: BottomNavTab;
  setActivePanel: (panel: UIState["activePanel"]) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setQuickActionPanel: (panel: UIState["quickActionPanel"]) => void;
  setPingsOpen: (open: boolean) => void;
  setBottomNavTab: (tab: BottomNavTab) => void;
};

export const useUIStore = create<UIState>((set) => ({
  activePanel: "none",
  isCommandPaletteOpen: false,
  quickActionPanel: "none",
  isPingsOpen: false,
  bottomNavTab: null,
  setActivePanel: (panel) => set({ activePanel: panel }),
  setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),
  setQuickActionPanel: (panel) => set({ quickActionPanel: panel }),
  setPingsOpen: (open) => set({ isPingsOpen: open, bottomNavTab: open ? null : undefined }),
  setBottomNavTab: (tab) => set((state) => ({ bottomNavTab: state.bottomNavTab === tab ? null : tab, isPingsOpen: false })),
}));
