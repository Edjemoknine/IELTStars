import { z } from 'zod';

export const testTypeSchema = z.enum(['academic', 'general_training']);

export const ieltsModuleSchema = z.enum([
  'reading',
  'listening',
  'writing',
  'speaking',
]);

export const createTestSchema = z.object({
  title: z.string().min(1).max(200),
  type: testTypeSchema,
  module: ieltsModuleSchema,
});

export type CreateTestInput = z.infer<typeof createTestSchema>;
