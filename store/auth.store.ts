import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "@/types/user";

type AuthSession = { token: string; user: User };

type AuthState = {
  token: string | null;
  user: User | null;
  setSession: (session: AuthSession) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: ({ token, user }) => set({ token, user }),
      clearSession: () => set({ token: null, user: null }),
    }),
    { name: "devora-auth" },
  ),
);
