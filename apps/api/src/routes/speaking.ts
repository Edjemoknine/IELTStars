import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth.js';
import { createSpeakingSession } from '../services/speaking.service.js';

const speaking = new Hono();

speaking.use('*', authMiddleware);

speaking.post('/sessions', async (c) => {
  const user = c.get('user');

  const body = await c.req.json().catch(() => ({}));

  const session = await createSpeakingSession({
    userId: user.id,
    testId: body.testId,
  });

  return c.json(
    {
      data: session,
    },
    201,
  );
});

export default speaking;
