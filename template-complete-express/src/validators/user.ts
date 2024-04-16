import zod from 'zod';

export const createUserSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6, 'Password must be at least 6 characters'),
});

export type CreateUserPayload = zod.infer<typeof createUserSchema>;

export const loginUserSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginPayload = zod.infer<typeof loginUserSchema>;
