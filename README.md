# IELTS Platform — Turborepo + pnpm

Simple workflow for an IELTS platform monorepo using:

- Turborepo
- pnpm workspaces
- Next.js — web
- Hono — API
- React Native + Expo — mobile
- Shared packages — validators, types, UI, config

## 1. Final structure

```text
ielts-platform/
├── apps/
│   ├── web/          # Next.js
│   ├── api/          # Hono
│   └── mobile/       # React Native + Expo
├── packages/
│   ├── validators/   # Shared Zod schemas
│   ├── types/        # Shared TypeScript types
│   ├── ui/           # Shared UI where appropriate
│   └── config/       # Shared configs
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── pnpm-lock.yaml
```

Architecture:

```text
             IELTS Platform
                   │
               Turborepo
                   │
       ┌───────────┼───────────┐
       ↓           ↓           ↓
      Web         API        Mobile
   Next.js       Hono       Expo/RN
       └───────────┼───────────┘
                   ↓
            Shared Packages
          ┌────────┼────────┐
          ↓        ↓        ↓
      validators  types      ui
```

## 2. Install pnpm

```bash
npm install -g pnpm
pnpm --version
```

## 3. Create the Turborepo

```bash
pnpm dlx create-turbo@latest
```

Choose the project name:

```text
ielts-platform
```

Choose **pnpm** as the package manager.

Then:

```bash
cd ielts-platform
pnpm install
```

## 4. Configure pnpm workspaces

Create `pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

The repository now knows that everything under `apps` and `packages` is a workspace.

## 5. Root package.json

Keep the root private and add common scripts:

```json
{
  "name": "ielts-platform",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "typecheck": "turbo typecheck"
  },
  "packageManager": "pnpm@10"
}
```

Use the pnpm version actually installed in the project.

## 6. Create the Next.js app

```bash
pnpm create next-app apps/web
```

Recommended options:

```text
TypeScript: Yes
ESLint: Yes
Tailwind CSS: Yes
src/: Yes
App Router: Yes
```

Run only the web app:

```bash
pnpm --filter web dev
```

## 7. Install a library only for Next.js

For example:

```bash
pnpm --filter web add axios
```

This puts `axios` in:

```text
apps/web/package.json
```

Use it:

```ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default api;
```

Rule:

```text
Web-only dependency → install in web
```

## 8. Create the Hono API

Create the Hono app inside `apps/api`.

For example:

```bash
pnpm create hono apps/api
```

A simple Hono server:

```ts
import { Hono } from "hono";

const app = new Hono();

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

export default app;
```

Example API routes later:

```text
GET  /health
POST /auth/login
GET  /courses
GET  /lessons
POST /submissions
POST /writing/evaluate
```

## 9. Install a library only for Hono

```bash
pnpm --filter api add zod
```

or another API-only dependency:

```bash
pnpm --filter api add <package>
```

It belongs to:

```text
apps/api/package.json
```

## 10. Create the Expo mobile app

```bash
pnpm dlx create-expo-app apps/mobile
```

Install workspace dependencies:

```bash
pnpm install
```

Run Expo:

```bash
pnpm --filter mobile start
```

## 11. Install a library only for Expo

For Expo-compatible packages, use Expo's installer:

```bash
pnpm --filter mobile exec expo install expo-secure-store
```

For a normal package:

```bash
pnpm --filter mobile add axios
```

Rule:

```text
Mobile-only dependency → install in mobile
```

## 12. Create a shared validators package

Create:

```text
packages/validators/
├── src/
│   └── index.ts
├── package.json
└── tsconfig.json
```

`packages/validators/package.json`:

```json
{
  "name": "@repo/validators",
  "version": "0.0.0",
  "private": true,
  "type": "module"
}
```

## 13. Install Zod in validators

Because Zod is used by the validators package:

```bash
pnpm --filter @repo/validators add zod
```

Do not install it only at the root.

## 14. Create shared Zod schemas

`packages/validators/src/index.ts`:

```ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginInput = z.infer<typeof loginSchema>;
```

Now the same validation can be used by Web, API, and Mobile.

## 15. Link validators to Next.js

```bash
pnpm --filter web add @repo/validators@workspace:*
```

Use it:

```ts
import { loginSchema } from "@repo/validators";

const result = loginSchema.safeParse({
  email: "user@example.com",
  password: "12345678",
});
```

## 16. Link validators to Hono

```bash
pnpm --filter api add @repo/validators@workspace:*
```

Use it:

```ts
import { Hono } from "hono";
import { loginSchema } from "@repo/validators";

const app = new Hono();

app.post("/auth/login", async (c) => {
  const body = await c.req.json();
  const result = loginSchema.safeParse(body);

  if (!result.success) {
    return c.json({ error: "Invalid request" }, 400);
  }

  return c.json({
    success: true,
    data: result.data,
  });
});

export default app;
```

## 17. Link validators to Expo

```bash
pnpm --filter mobile add @repo/validators@workspace:*
```

Use it:

```ts
import { loginSchema } from "@repo/validators";

const result = loginSchema.safeParse({
  email,
  password,
});

if (!result.success) {
  console.log(result.error);
}
```

The relationship is now:

```text
                 @repo/validators
                 /       |       \
                /        |        \
            Next.js     Hono      Expo
```

## 18. Create a shared types package

Create:

```text
packages/types/
├── src/
│   └── index.ts
└── package.json
```

`packages/types/src/index.ts`:

```ts
export type User = {
  id: string;
  name: string;
  email: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
};
```

`packages/types/package.json`:

```json
{
  "name": "@repo/types",
  "version": "0.0.0",
  "private": true,
  "type": "module"
}
```

## 19. Link the types package

```bash
pnpm --filter web add @repo/types@workspace:*
pnpm --filter api add @repo/types@workspace:*
pnpm --filter mobile add @repo/types@workspace:*
```

Use:

```ts
import type { Course } from "@repo/types";
```

## 20. Shared UI package

Create:

```text
packages/ui/
├── src/
├── package.json
└── tsconfig.json
```

For web:

```tsx
export function Button() {
  return <button>Continue</button>;
}
```

Then:

```ts
import { Button } from "@repo/ui";
```

### Important

Do not assume a DOM component works in React Native.

Web:

```tsx
<button>Continue</button>
```

React Native:

```tsx
<Pressable>
  <Text>Continue</Text>
</Pressable>
```

For a serious cross-platform UI system, deliberately design the package for both platforms or keep separate web/native UI packages.

## 21. Shared package vs framework-specific dependency

Shared, framework-independent code:

```text
packages/
├── validators/
├── types/
├── utils/
└── config/
```

Framework-specific dependencies stay in their app:

```text
apps/web/package.json
apps/api/package.json
apps/mobile/package.json
```

Examples:

```bash
# Web only
pnpm --filter web add axios

# API only
pnpm --filter api add hono

# Mobile only
pnpm --filter mobile exec expo install expo-secure-store

# Shared validators
pnpm --filter @repo/validators add zod
```

## 22. Example IELTS writing contract

`packages/validators/src/writing.ts`:

```ts
import { z } from "zod";

export const writingSubmissionSchema = z.object({
  taskType: z.enum(["task1", "task2"]),
  answer: z.string().min(1),
});

export type WritingSubmission = z.infer<
  typeof writingSubmissionSchema
>;
```

Export it from `index.ts`:

```ts
export {
  writingSubmissionSchema,
} from "./writing.js";

export type {
  WritingSubmission,
} from "./writing.js";
```

Now all clients use the same contract:

```text
Next.js ─────┐
Hono ────────┼──→ @repo/validators
Expo ────────┘
```

## 23. Turborepo tasks

`turbo.json`:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [
        ".next/**",
        "dist/**"
      ]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "typecheck": {
      "dependsOn": ["^typecheck"]
    }
  }
}
```

The important part is:

```json
"dependsOn": ["^build"]
```

If:

```text
web → @repo/validators
```

Turborepo understands that the dependency is part of the build graph.

## 24. Run everything

From the root:

```bash
pnpm dev
```

Turborepo runs the `dev` scripts of the relevant workspaces.

## 25. Run one app

Next.js:

```bash
pnpm --filter web dev
```

Hono:

```bash
pnpm --filter api dev
```

Expo:

```bash
pnpm --filter mobile start
```

## 26. Build everything

```bash
pnpm build
```

## 27. Type check everything

Each workspace should have:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}
```

Then:

```bash
pnpm typecheck
```

## 28. Useful pnpm commands

Install everything:

```bash
pnpm install
```

Add dependency to Web:

```bash
pnpm --filter web add axios
```

Add dependency to API:

```bash
pnpm --filter api add zod
```

Add dependency to Mobile:

```bash
pnpm --filter mobile add axios
```

Install an Expo package:

```bash
pnpm --filter mobile exec expo install expo-secure-store
```

Add dependency to shared validators:

```bash
pnpm --filter @repo/validators add zod
```

Link a workspace package:

```bash
pnpm --filter web add @repo/validators@workspace:*
```

Run a command in a workspace:

```bash
pnpm --filter web <command>
```

## 29. Complete workflow

```text
1. Install pnpm
        ↓
2. Create Turborepo
        ↓
3. Configure pnpm-workspace.yaml
        ↓
4. Create Next.js app
        ↓
5. Create Hono API
        ↓
6. Create Expo mobile app
        ↓
7. Create packages/
        ↓
8. Create @repo/validators
        ↓
9. Install Zod in validators
        ↓
10. Create shared schemas
        ↓
11. Link validators to Web
        ↓
12. Link validators to API
        ↓
13. Link validators to Mobile
        ↓
14. Create @repo/types
        ↓
15. Link shared types
        ↓
16. Add framework-specific libraries
        ↓
17. Configure Turborepo tasks
        ↓
18. Run dev/build/typecheck
```

## 30. Final rule

```text
Framework-specific library
        ↓
Install it in that app

Shared code
        ↓
Create a package

Shared package
        ↓
Link with @repo/package@workspace:*
```

Final IELTS platform:

```text
ielts-platform/
│
├── apps/
│   ├── web/             → Next.js
│   ├── api/             → Hono
│   └── mobile/          → React Native + Expo
│
├── packages/
│   ├── validators/      → Zod
│   ├── types/           → Shared TypeScript types
│   ├── ui/              → Shared UI where appropriate
│   └── config/          → Shared configuration
│
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── pnpm-lock.yaml
```
