'use server';

import { API_URL } from '@/constants';
import axios from 'axios';
import { createSession, deleteSession } from '../session';
import {
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
