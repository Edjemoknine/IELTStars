ielts-platform/
├── apps/
│ ├── web/ # Next.js
│ ├── mobile/ # Expo / React Native
│ └── api/ # Hono
│
├── packages/
│ ├── ui/ # Shared UI primitives
│ ├── types/ # Shared TypeScript types
│ ├── validators/ # Zod schemas
│ ├── config/ # Shared configuration
│ ├── database/ # Prisma / DB client
│ ├── auth/ # Auth abstractions
│ └── eslint-config/
│
├── turbo.json
├── pnpm-workspace.yaml
└── package.json

Next.js

Your web application needs:

Landing pages
IELTS guides/articles
SEO
Pricing
Dashboard
Test interface
Writing editor
Speaking interface
Authentication UI
User profile
Results
Analytics

Web ────────┐
│
Mobile ─────┼──→ Hono API ──→ PostgreSQL
│
Admin ──────┘

                 Next.js
                    │
        ┌───────────┴───────────┐
        │                       │

Public website Application
SEO Dashboard
│ │
└───────────┬───────────┘
│
Hono
│
Database

                   ┌───────────────┐
                   │    Next.js    │
                   │      Web      │
                   └───────┬───────┘
                           │
                           │
                   ┌───────▼───────┐
                   │     Hono      │
                   │      API      │
                   └───────┬───────┘
                           │
             ┌─────────────┼─────────────┐
             ↓             ↓             ↓
        PostgreSQL       Redis        AI services



                   ┌───────────────┐
                   │     Expo      │
                   │    Mobile     │
                   └───────┬───────┘
                           │
                           ▼
                         Hono

             Hono
              │
       ┌──────┴──────┐
       ↓             ↓
     Web           Mobile

AI architecture:

Hono
│
├── Create speaking session
│
└── Submit answer
│
▼
Job/Queue
│
▼
AI Worker
│
┌─────┴─────┐
↓ ↓
Speech LLM
analysis evaluation
│ │
└─────┬─────┘
↓
Evaluation
↓
Database

Real-time speaking is different:

User microphone
↓
Realtime connection
↓
Speech-to-text
↓
AI reasoning
↓
Text-to-speech
↓
User

                    Hono API
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
       REST API      AI Jobs    Realtime service
