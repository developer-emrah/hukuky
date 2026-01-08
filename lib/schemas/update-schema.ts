import { z } from 'zod';

export const updateSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  description: z.string().optional(),
});
