import { createMiddleware } from 'hono/factory';

export type AuthUser = {
  id: string;
  clerkId: string;
};

export const authMiddleware = createMiddleware<{
  Variables: {
    user: AuthUser;
  };
}>(async (c, next) => {
  // Temporary development user.
  // We will replace this with Clerk verification shortly.

  c.set('user', {
    id: 'dev-user-id',
    clerkId: 'dev-clerk-id',
  });

  await next();
});
