import { db } from '@ielts/db';

type CreateSpeakingSessionInput = {
  userId: string;
  testId?: string;
};

export async function createSpeakingSession(input: CreateSpeakingSessionInput) {
  const session = await db.speakingSession.create({
    data: {
      userId: input.userId,
      testId: input.testId,
      status: 'NOT_STARTED',
    },
  });

  return session;
}
