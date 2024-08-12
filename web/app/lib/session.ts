import { cookies } from 'next/headers';

import { IronSession, SessionOptions, getIronSession } from 'iron-session';
import { revalidatePath } from 'next/cache';

export interface SessionData {
  userId?: number;
  isLoggedIn: boolean;
  token: string;
}

export const defaultSession: SessionData = {
  userId: undefined,
  isLoggedIn: false,
  token: '',
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'bookings',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.userId = defaultSession.userId;
    session.token = defaultSession.token;
  }

  return session;
}

export async function deleteSession() {
  const session = await getSession();
  session.destroy();
  revalidatePath('/');
}

export async function createSession(userId: number, token: string) {
  const session = await getSession();

  session.userId = userId;
  session.isLoggedIn = true;
  session.token = token;

  await session.save();
  revalidatePath('/');
}
