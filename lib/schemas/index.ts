import { z } from 'zod';
import { formSchema } from './form-schema';
import { updateSchema } from './update-schema';

export { formSchema, updateSchema };
export type FormSchema = z.infer<typeof formSchema>;
export type UpdateSchema = z.infer<typeof updateSchema>;
export type FormValues =
  | z.infer<typeof formSchema>
  | z.infer<typeof updateSchema>;
