import { z } from 'zod';

export const AuthCredentialsValidator = z.object({
  email: z.string().email().min(2, {
    message: 'Email must be at least 2 characters.',
  }),
  password: z.string().min(1, {
    message: "Password can't be empty",
  }),
});

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;
