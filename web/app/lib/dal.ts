'use server';

import { getSession } from './session';
import { cache } from 'react';

export const getToken = cache(async () => {
  const session = await getSession();

  console.log(session);

  return session ? session.token : null;
});
