export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";
export const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:4000/ws";

export const WORKSPACE_ITEMS = [
  {
    label: "Home",
    href: (instance: string) => `/${instance}/home`,
  },
  {
    label: "Launchpad Board",
    href: (instance: string) => `/${instance}/product/launchpad/board`,
  },
  {
    label: "Settings",
    href: (instance: string) => `/${instance}/settings`,
  },
];

export const COMMAND_ACTIONS = [
  {
    id: "switch-project",
    label: "Switch to Launchpad project",
    description: "Jump directly into the active delivery board.",
  },
  {
    id: "create-task",
    label: "Create task",
    description: "Open the quick task panel.",
  },
  {
    id: "open-chat",
    label: "Open chat",
    description: "Move into the chat workspace mode.",
  },
  {
    id: "invite-user",
    label: "Invite user",
    description: "Open a lightweight invite flow.",
  },
  {
    id: "switch-project",
    label: "Switch to Launchpad project",
    description: "Jump directly into the active delivery board.",
  },
];
