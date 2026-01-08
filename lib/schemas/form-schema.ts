import { z } from 'zod';

export const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, 'Must be at least 3 characters'),
  description: z.string().min(5, 'Must be at least 5 characters'),
  uri: z.string().refine(
    (val) =>
      /^file:\/\//i.test(val) || // file://...
      /^content:\/\//i.test(val) || // content://...
      /^ph:\/\//i.test(val) || // iOS Photos
      /^\/(storage|data|mnt)\//i.test(val) || // absolute Android paths
      /^https?:\/\//i.test(val), // optional web URL
    {
      message: 'Please provide a valid video URI',
    },
  ),
  thumbnailUri: z.string().optional(),
});
