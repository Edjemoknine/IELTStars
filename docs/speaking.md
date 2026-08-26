The User Speaikng workflow:

User
│
└── SpeakingSession
│
├── SpeakingTurn
│ ├── question
│ └── answer
│
└── SpeakingEvaluation
├── fluency
├── vocabulary
├── grammar
├── pronunciation
└── overall

IELTS Speaking test engine:

- Part1:

Introduction
↓
Personal questions
↓
2–3 topics

- Part2:

Cue card
↓
1 minute preparation
↓
2 minutes speaking

- Part3:

  Abstract discussion
  ↓
  Follow-up questions
  ↓
  Deeper discussion

AI Speaking Examiner

                AI Examiner
                    │
        ┌───────────┼───────────┐
        ↓           ↓           ↓

Speech-to-Text LLM Text-to-Speech
│ │ │
↓ ↓ ↓
Answer Evaluation Examiner

- Backend speaking request :

  Request
  ↓
  Auth middleware
  ↓
  Zod validation
  ↓
  Speaking service
  ↓
  Prisma
  ↓
  SpeakingSession
  ↓
  Response
