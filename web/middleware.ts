import { updateSession } from './lib/sessions';

export async function middleware() {
  return await updateSession();
}
