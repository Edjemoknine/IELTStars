import { Hono } from 'hono';
import health from './routes/health.js';
import tests from './routes/test.js';
import { serve } from '@hono/node-server';

const app = new Hono();

app.get('/', (c) => {
  return c.json({
    status: 'ok',
    service: 'ielts-api',
  });
});

app.route('/health', health);
app.route('/api/tests', tests);

const port = Number(process.env.PORT) || 4000;

console.log(`API running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
