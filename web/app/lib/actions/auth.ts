'use server';

import { API_URL } from '@/constants';
import axios from 'axios';
import { createSession, deleteSession } from '../session';
import {
  checkForgotPasswordObjectValid,
  checkResetPasswordObjectValid,
  checkUserSigninObjectValid,
  checkUserSignupObjectValid,
} from '../validation';

export async function signup(
  prevState: {
    errorMessage: string | null;
    success: boolean;
  },
  formData: FormData
) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const { error: validationError } = await checkUserSignupObjectValid(data);

  if (validationError) {
    console.error('Sign up Validation Error: ', validationError);

    return { errorMessage: validationError, success: false };
  }

  try {
    const response = await axios.post(`${API_URL}/api/auth/local/register`, {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    });

    await createSession(response.data.user.id, response.data.jwt);

    return { errorMessage: null, success: true };
  } catch (err: any) {
    console.error('Axios Error: ');
    console.error(err);

    if (err?.response?.data?.error?.message) {
      return {
        errorMessage: err?.response?.data?.error?.message,
        success: false,
      };
    }

    return {
      errorMessage: 'Could not register, please try again later',
      success: false,
    };
  }
}

export async function login(
  prevState: {
    errorMessage: string | null;
    success: boolean;
  },
  formData: FormData
) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const { error: validationError } = await checkUserSigninObjectValid(data);

  if (validationError) {
    console.error('Sign in Validation Error: ', validationError);

    return { errorMessage: validationError, success: false };
  }

  try {
    const response = await axios.post(`${API_URL}/api/auth/local`, {
      identifier: formData.get('email'),
      password: formData.get('password'),
    });

    await createSession(response.data.user.id, response.data.jwt);

    return { errorMessage: null, success: true };
  } catch (err) {
    console.error(err);

    return {
      errorMessage: 'Invalid credentials, please try again',
      success: false,
    };
  }
}

export async function logout() {
  await deleteSession();
  return;
}

export async function forgotPassword(
  prevState: {
    errorMessage: string | null;
    success: boolean;
  },
  formData: FormData
) {
  const data = {
    email: formData.get('email'),
  };

  const { error: validationError } = await checkForgotPasswordObjectValid(data);

  if (validationError) {
    console.error('Forgot Password Validation Error: ', validationError);

    return { errorMessage: validationError, success: false };
  }

  try {
    const response = await axios.post(`${API_URL}/api/auth/forgot-password`, {
      email: formData.get('email'),
    });

    console.log(response.data.error);

    return { errorMessage: null, success: true };
  } catch (err) {
    console.error('Error fetching forgot password, ', err);

    return {
      errorMessage: 'Failed to request password, please try again.',
      success: false,
    };
  }
}

export async function resetPassword(
  prevState: {
    errorMessage: string | null;
    success: boolean;
  },
  formData: FormData
) {
  const data = {
    password: formData.get('password'),
    passwordConfirmation: formData.get('passwordConfirmation'),
  };

  const { error: validationError } = await checkResetPasswordObjectValid(data);

  if (validationError) {
    console.error('Forgot Password Validation Error: ', validationError);

    return { errorMessage: validationError, success: false };
  }

  try {
    const response = await axios.post(`${API_URL}/api/auth/reset-password`, {
      code: formData.get('code'),
      password: formData.get('password'),
      passwordConfirmation: formData.get('passwordConfirmation'),
    });

    return { errorMessage: null, success: true };
  } catch (err) {
    console.error('Error fetching reseting password, ', err);

    return {
      errorMessage: 'Failed to reset password, please try again.',
      success: false,
    };
  }
}
