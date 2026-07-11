import type { User } from "@/types/user";

type LoginPayload = { email: string; password: string };
type SignupPayload = LoginPayload & { name: string };

export type AuthResponse = { token: string; user: User & { instanceId?: string } };

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    await delay(1000);
    return {
      token: "mock_jwt_token_12345",
      user: {
        id: "usr_mock123",
        name: "Test User",
        email: payload.email,
        role: "owner",
        instanceId: "acme",
      },
    };
  },

  signup: async (payload: SignupPayload): Promise<AuthResponse> => {
    await delay(1000);
    return {
      token: "mock_jwt_token_12345",
      user: {
        id: "usr_mock123",
        name: payload.name,
        email: payload.email,
        role: "owner",
        instanceId: "acme",
      },
    };
  },

  logout: async () => {
    await delay(500);
    return { success: true };
  },
};
