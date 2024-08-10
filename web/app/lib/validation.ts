import { z } from 'zod';

export const signupUserModel = z
  .object({
    username: z.string().min(3, 'Name must have 3 characters'),
    email: z.string().email({ message: 'Email must be valid' }),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  })
  .strict();

export async function checkUserSignupObjectValid(user: any): Promise<{
  success: boolean;
  error: string | null;
}> {
  try {
    signupUserModel.parse(user);

    return { success: true, error: null };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { success: false, error: err.errors[0].message };
    } else {
      return { success: false, error: 'An unknown error occurred' };
    }
  }
}

export const signinUserModel = z
  .object({
    email: z.string().email({ message: 'Email must be valid' }),
    password: z.string({ message: 'Password is required' }),
  })
  .strict();

export async function checkUserSigninObjectValid(user: any): Promise<{
  success: boolean;
  error: string | null;
}> {
  try {
    signinUserModel.parse(user);

    return { success: true, error: null };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { success: false, error: err.errors[0].message };
    } else {
      return { success: false, error: 'An unknown error occurred' };
    }
  }
}
