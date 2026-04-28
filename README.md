# Devora

Devora is a calm, Basecamp-inspired Work OS built on Next.js.

> A calm command center, not a noisy dashboard.

---

## What Is Implemented

### 1. Auth Flow

Routes: `/`, `/login`, `/signup`

- `/` redirects to `/login`
- Forms use `react-hook-form` + `zod`
- On success, user is routed to `/:instance/home`
- Session stored in Zustand auth store, token attached to all API requests via Axios interceptor

### 2. Global App Shell

Files: `components/layout/app-shell.tsx`, `app-navbar.tsx`, `command-palette.tsx`, `floating-actions.tsx`

- No permanent sidebar — full-bleed dark workspace
- Top nav: `Home`, `Lineup`, `Pings`, `Activity`, `My Stuff` dropdown, profile/settings dropdown
- Bottom-right floating action entry for quick creates

### 3. Find Panel

Triggered from top nav `Find` button:

- Anchored search panel with input + filters: `Search Everything`, `by Anyone`, `Everywhere`
- Separate from command palette — scoped to content search

### 4. Command Palette

Triggered via keyboard shortcut:

- Fast navigation and actions: switch project, create task, open chat, invite user
- Separate layer from Find — scoped to app actions

### 5. Home Screen

Route: `/:instance/home`

- Basecamp-style centered landing
- Primary CTA buttons
- Recent project cards
- Schedule section
- Assignments section

### 6. Pings (Chat)

Route: `/:instance/pings`

- Organization-wide chat
- Left channel list + active thread + message composer
- WebSocket event: `chat:message`
- UI complete, data currently seeded

### 7. Activity Feed

Route: `/:instance/activity`

- Profile-centric feed: "Latest Activity"
- Report dropdown, filter pills, daily summary pill
- Today / Earlier grouped layout
- Data currently seeded

### 8. Project Workspace

Route pattern: `/:instance/:workspace/:project/[view]`

Views:

- `board` — kanban grouped by status, ticket create dialog
- `sheet` — TanStack Table tabular view
- `timeline` — full-bleed Basecamp-style lineup, hides project header/tabs

### 9. Ticket System

Files: `hooks/useTickets.ts`, `modules/ticket/services/ticket.service.ts`

- Statuses: `backlog`, `todo`, `in_progress`, `done`
- Priorities: `low`, `medium`, `high`, `critical`
- Operations: list, create, update
- All three views (board/sheet/timeline) share the same data layer
- Realtime refresh wired for `ticket:create` and `ticket:update` WebSocket events

### 10. Settings

Route: `/:instance/settings`

- Scaffolded surface with cards for auth policy, realtime channels, cache strategy
- Ready for API-backed forms

---

## Full User Flow

```text
/
└── /login  (or /signup)
    └── /:instance/home
        ├── top nav
        │   ├── /:instance/home
        │   ├── /:instance/pings
        │   ├── /:instance/activity
        │   └── /:instance/settings
        ├── project entry (from home cards or command palette)
        │   └── /:instance/:workspace/:project/
        │       ├── board
        │       ├── sheet
        │       └── timeline
        └── quick actions
            ├── Find panel (content search)
            ├── Command palette (app actions)
            └── Floating action button (create)
```

---

## Data Flow

```text
UI → Hook → TanStack Query → Service → API (or seed)
WebSocket → useRealtime hook → invalidate query → UI refresh
```

Auth token flow:

```text
login/signup → authService → setSession (Zustand) → Axios interceptor attaches Bearer token
```

WebSocket events:

| Event            | Trigger                        |
|------------------|--------------------------------|
| `ticket:create`  | new ticket created             |
| `ticket:update`  | ticket status/priority changed |
| `chat:message`   | new ping message               |
| `notification:new` | general notification         |

---

## Route Map

### Public
- `/`
- `/login`
- `/signup`

### Instance
- `/:instance/home`
- `/:instance/pings`
- `/:instance/activity`
- `/:instance/settings`

### Project
- `/:instance/:workspace/:project/board`
- `/:instance/:workspace/:project/sheet`
- `/:instance/:workspace/:project/timeline`

---

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- shadcn-style UI primitives
- TanStack Query — server state
- Zustand — client/UI state
- TanStack Table
- React Hook Form + Zod
- Axios
- WebSocket manager (custom)

---

## Architecture Rules

- No Redux
- No React context for global state
- No direct fetch in components
- TanStack Query for server state, Zustand for UI state
- Feature logic stays modular under `modules/`

---

## Folder Shape

```text
app/
  (auth)/login  signup
  [instance]/
    home/  pings/  activity/  settings/
    [workspace]/[project]/
      board/  sheet/  timeline/

components/
  layout/       app-shell, navbar, command-palette, floating-actions
  modules/      activity, chat, ticket, ai, file, project
  ui/           primitives

hooks/          useAuth, useTickets, useRealtime
lib/            api, websocket, query-client, utils
modules/        auth/services, ticket/services
store/          auth.store, ui.store
types/          ticket, user, project
data/seeds/     mock data for all features
```

---

## Local Development

```bash
npm install
npm run dev
```

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.devora.local
NEXT_PUBLIC_WS_URL=ws://localhost:4000/ws
```

If env vars are not set, API uses local fallback and WebSocket stays inactive.

---

## What Is Still Mocked

| Area             | Status                        |
|------------------|-------------------------------|
| Auth session     | seed token, no persistence    |
| Activity feed    | seeded JSON                   |
| Pings/chat       | seeded JSON                   |
| Timeline/lineup  | seeded JSON                   |
| Settings         | presentational only           |
| Ticket service   | in-memory seed, no real API   |

---

## Next Steps

1. Connect ticket, activity, and pings to real backend APIs
2. Implement real filter logic in Find panel
3. Replace seeded chat/activity with query-backed data
4. Build settings forms and invite flows
5. Add RBAC visibility for client vs internal users
