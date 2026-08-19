import { Hono } from 'hono';
import { createTestSchema } from '@ielts/validators';

const test = new Hono();

test.get('/', (c) => {
  return c.json({
    tests: [],
  });
});

test.post('/', async (c) => {
  const body = await c.req.json();

  const result = createTestSchema.safeParse(body);

  if (!result.success) {
    return c.json(
      {
        error: 'Invalid request',
        issues: result.error.issues,
      },
      400,
    );
  }

  return c.json(
    {
      message: 'Test validated successfully',
      data: result.data,
    },
    201,
  );
});

export default test;
