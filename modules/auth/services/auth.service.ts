import { api } from "@/lib/api";
import type { User } from "@/types/user";

type LoginPayload = { email: string; password: string };
type SignupPayload = LoginPayload & { name: string };

export type AuthResponse = { token: string; user: User };

export const authService = {
  login: (payload: LoginPayload) =>
    api.post<AuthResponse>("/auth/login", payload).then((r) => r.data),

  signup: (payload: SignupPayload) =>
    api.post<AuthResponse>("/auth/signup", payload).then((r) => r.data),

  logout: () =>
    api.post("/auth/logout").then((r) => r.data),
};
