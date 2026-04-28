# Devora Backend

Go API server for Devora. Derived from the frontend UI contracts — every endpoint here maps directly to a frontend service or WebSocket event.

---

## Stack

- Go (net/http or chi router)
- PostgreSQL — primary store
- Redis — session cache, realtime pub/sub
- JWT — auth tokens
- WebSocket — gorilla/websocket or nhooyr/websocket

---

## Folder Shape

```text
cmd/
  server/
    main.go

internal/
  auth/
    handler.go      POST /auth/login, POST /auth/signup
    service.go
    middleware.go   JWT validation

  ticket/
    handler.go      GET/POST/PATCH /tickets
    service.go
    repository.go

  chat/
    handler.go      GET /channels, GET /messages, POST /messages
    service.go
    repository.go

  activity/
    handler.go      GET /activity
    service.go
    repository.go

  user/
    handler.go      GET /users/me, GET /users
    service.go
    repository.go

  project/
    handler.go      GET /projects, POST /projects
    service.go
    repository.go

  realtime/
    hub.go          WebSocket connection hub
    handler.go      GET /ws
    events.go       event type definitions

  settings/
    handler.go      GET/PATCH /settings

db/
  migrations/
config/
  config.go
```

---

## Auth

### POST `/auth/login`

Request:
```json
{ "email": "string", "password": "string" }
```

Response:
```json
{ "token": "string", "user": { "id": "string", "name": "string", "email": "string", "role": "owner|admin|member" } }
```

### POST `/auth/signup`

Request:
```json
{ "name": "string", "email": "string", "password": "string" }
```

Response: same shape as login.

All protected routes require:
```
Authorization: Bearer <token>
```

---

## Tickets

Scoped by instance + workspace + project via path params or query params.

### GET `/api/:instance/:workspace/:project/tickets`

Response:
```json
[
  {
    "id": "string",
    "key": "string",
    "title": "string",
    "summary": "string",
    "status": "backlog|todo|in_progress|done",
    "priority": "low|medium|high|critical",
    "assignee": { "id": "string", "name": "string", "email": "string", "role": "string" },
    "dueDate": "YYYY-MM-DD",
    "points": 0
  }
]
```

### POST `/api/:instance/:workspace/:project/tickets`

Request:
```json
{ "title": "string", "summary": "string", "priority": "string", "status": "string" }
```

Response: created ticket object.

After create, broadcast WebSocket event `ticket:create`.

### PATCH `/api/:instance/:workspace/:project/tickets/:id`

Request (partial):
```json
{ "status": "string", "priority": "string", "title": "string", "summary": "string" }
```

Response: updated ticket object.

After update, broadcast WebSocket event `ticket:update`.

---

## Chat (Pings)

### GET `/api/:instance/channels`

Response:
```json
[{ "id": "string", "name": "string", "unread": 0 }]
```

### GET `/api/:instance/channels/:channelId/messages`

Response:
```json
[{ "id": "string", "body": "string", "author": { "id": "string", "name": "string" }, "createdAt": "ISO8601" }]
```

### POST `/api/:instance/channels/:channelId/messages`

Request:
```json
{ "body": "string" }
```

After create, broadcast WebSocket event `chat:message`.

---

## Activity Feed

### GET `/api/:instance/activity`

Query params: `userId`, `from`, `to`, `type`

Response:
```json
[{ "id": "string", "type": "string", "actor": { "id": "string", "name": "string" }, "subject": "string", "createdAt": "ISO8601" }]
```

---

## Projects

### GET `/api/:instance/projects`

Response:
```json
[{ "id": "string", "name": "string", "key": "string", "workspaceId": "string", "instanceId": "string" }]
```

### POST `/api/:instance/projects`

Request:
```json
{ "name": "string", "key": "string", "workspaceId": "string" }
```

---

## Users

### GET `/api/users/me`

Returns current authenticated user from JWT claims.

### GET `/api/:instance/users`

Returns all users in the instance (for assignee pickers, invite flows).

---

## Settings

### GET `/api/:instance/settings`

Returns instance-level settings (auth policy, realtime config, cache strategy).

### PATCH `/api/:instance/settings`

Request: partial settings object.

---

## WebSocket

### GET `/ws`

Upgrade to WebSocket. Client sends JWT in query param or first message for auth.

Message format (both directions):
```json
{ "event": "string", "payload": {} }
```

Events emitted by server:

| Event              | Trigger                        |
|--------------------|--------------------------------|
| `ticket:create`    | new ticket created             |
| `ticket:update`    | ticket status/priority changed |
| `chat:message`     | new ping message sent          |
| `notification:new` | general notification           |

Hub behavior:
- connections registered per instance
- broadcast scoped to instance members only
- reconnect handled client-side (3s retry in frontend WebSocket manager)

---

## Data Models

### User
```go
type User struct {
    ID    string // usr_xxx
    Name  string
    Email string
    Role  string // owner | admin | member
}
```

### Ticket
```go
type Ticket struct {
    ID       string
    Key      string // DEV-101
    Title    string
    Summary  string
    Status   string // backlog | todo | in_progress | done
    Priority string // low | medium | high | critical
    Assignee User
    DueDate  string
    Points   int
}
```

### Project
```go
type Project struct {
    ID          string
    Name        string
    Key         string
    WorkspaceID string
    InstanceID  string
}
```

---

## Environment Variables

```bash
PORT=4000
DATABASE_URL=postgres://user:pass@localhost:5432/devora
REDIS_URL=redis://localhost:6379
JWT_SECRET=<secret>
ALLOWED_ORIGINS=http://localhost:3000
```

---

## Local Development

```bash
go mod tidy
go run ./cmd/server
```

Runs on `http://localhost:4000`.

WebSocket available at `ws://localhost:4000/ws` — matches `NEXT_PUBLIC_WS_URL` in the frontend.

---

## RBAC

Roles: `owner`, `admin`, `member`

- `owner` — full access including settings and user management
- `admin` — manage projects, tickets, channels
- `member` — read/write tickets and chat, no settings access

Middleware should enforce role checks on mutating routes. Frontend surfaces visibility based on role from the JWT user payload.

---

## What Maps To What (Frontend → Backend)

| Frontend                        | Backend endpoint                                      |
|---------------------------------|-------------------------------------------------------|
| `authService.login`             | `POST /auth/login`                                    |
| `authService.signup`            | `POST /auth/signup`                                   |
| `ticketService.list`            | `GET /api/:instance/:workspace/:project/tickets`      |
| `ticketService.create`          | `POST /api/:instance/:workspace/:project/tickets`     |
| `ticketService.update`          | `PATCH /api/:instance/:workspace/:project/tickets/:id`|
| Pings channel list              | `GET /api/:instance/channels`                         |
| Pings messages                  | `GET /api/:instance/channels/:channelId/messages`     |
| Pings send                      | `POST /api/:instance/channels/:channelId/messages`    |
| Activity feed                   | `GET /api/:instance/activity`                         |
| Home recent projects            | `GET /api/:instance/projects`                         |
| Settings surface                | `GET /PATCH /api/:instance/settings`                  |
| `websocketManager` events       | `GET /ws`                                             |
