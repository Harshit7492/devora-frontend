# Devora System Documentation

Version: `v1`

## Product Vision

Devora exists to make project collaboration simple, fast, and clear.

- philosophy: Basecamp simplicity + Devora power
- learning curve: under 5 minutes
- target users: developers, managers, clients

Devora should feel lightweight on the surface while still supporting serious project execution underneath.

## Core Principles

- simplicity first
- clarity high
- noise low
- actions fast
- onboarding none
- invite based

Product constraint:

- no unnecessary complexity

## User Roles

Supported roles:

- admin
- manager
- developer
- tester
- client

## RBAC Model

### Client

- view only assigned projects
- create issues
- create suggestions
- comment allowed
- edit not allowed
- access limited

### Developer

- view project
- update tasks
- comment allowed
- assign not allowed

### Manager

- full control over project
- assign allowed
- invite allowed
- manage workflow allowed

## Project Model

Each project may include:

- `project_id`
- `name`
- `client_list[]`
- `team_members[]`
- `workflows`
- `tasks[]`
- `meetings[]`
- `notifications_config`

## Core Modules

### 1. Home

Basecamp-style dashboard with high simplicity.

Primary structure:

- left: My Work
- right: Team Updates
- no permanent sidebar

Recommended sections:

- Today Focus
- My Tasks
- Mentions
- Activity Feed
- Announcements

Modern UX interpretation:

- navigation should feel invisible
- command palette is the primary navigation layer
- contextual top bar replaces sidebar navigation
- floating actions handle quick creation
- slide-over panels replace many page transitions
- one screen should have one purpose

### 2. Project Space

Project space should expose:

- tasks
- issues
- suggestions
- chat
- files
- meetings

### 3. Task / Issue System

Supported item types:

- task
- bug
- suggestion

Creation sources:

- client
- team
- AI

Core properties:

- status: todo, doing, done
- comments
- attachments

### 4. Client Interaction System

Clients:

- can create issues
- can create suggestions
- can comment
- cannot access internal data
- only see assigned projects

### 5. Team Management

Invite system requirements:

- email-based invite
- assignable roles
- dynamic add/remove
- multi-client support

### 6. Notification System

Requirements:

- realtime support
- instant mode
- daily mode
- weekly mode
- custom mode
- configurable per user

### 7. Meeting System

Meetings can be created by:

- client
- manager

Meeting capabilities:

- invite team or specific users
- scheduling
- reminders

### 8. AI System

AI is a product differentiator, not a decoration layer.

Capabilities:

- chat assistant
- voice input
- create task from voice
- answer questions
- documentation helper

Example use cases:

- "There is a bug in login" -> create ticket
- "Schedule meeting tomorrow" -> create meeting
- "How to use Devora?" -> answer from docs

### 9. Documentation System

Requirements:

- searchable
- AI-connected
- guides
- videos
- FAQ

## Workflow Definitions

### Project Creation Flow

```text
manager creates project
-> invite team
-> invite clients
-> start work
```

### Client Issue Flow

```text
client login
-> open project
-> create issue
-> team gets notification
-> developer updates status
```

### AI Task Flow

```text
user voice input
-> AI process
-> create task
-> assign team
```

### Team Management Flow

```text
invite user by email
-> assign role
-> join project
-> access based on role
```

## Frontend Architecture

- framework: Next.js
- styling: Tailwind + shadcn-style primitives
- server state: TanStack Query
- client state: Zustand
- realtime: WebSocket

Navigation model:

- top navigation for global control
- context layer below for mode and view
- no permanent navigation panel
- command palette via `cmd+k`
- floating action system for task, issue, meeting, AI

Current route direction:

```text
app/
  (auth)/
  [instance]/
    home/
    settings/
    [workspace]/
      [project]/
        board/
        sheet/
        timeline/
```

## Backend Architecture

- language: Go
- architecture: microservices
- communication: gRPC
- realtime: WebSocket
- database: PostgreSQL
- cache: Redis

## Auth System

- OAuth support
- providers: Google, Microsoft
- invite-based signup
- JWT-based auth

## Simplicity Engine

This is the most important product rule.

- default UI: simple
- advanced features: hidden by default
- no overload
- no training required

## UX Rules

- maximum 2 clicks to a meaningful action
- no clutter
- clear actions
- human language
- friendly empty states

## Scalability Requirements

- multi-tenant
- modular
- API-first
- realtime-ready

## Success Metrics

- user understand time: under 5 seconds
- task creation time: under 10 seconds
- client usage: high
- retention: high

## Final Product Definition

Devora is a simple, client-friendly, developer-ready Work OS where communication, tasks, and collaboration happen in one place without complexity.

## Build Priorities

Recommended next implementation order:

1. Home UI detailed implementation
2. Task priority engine
3. Client dashboard
4. AI agent system
