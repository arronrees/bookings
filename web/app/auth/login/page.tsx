import { getSession } from '@/app/lib/session';
import LoginForm from '@/components/auth/LoginForm';
import { redirect } from 'next/navigation';

export default async function Login() {
  const session = await getSession();

  if (session.token) {
    return redirect('/');
  }

  return (
    <div>
      <h1 className='text-2xl mb-8 text-center font-semibold'>Login</h1>
      <section className='bg-slate-50 shadow p-4 max-w-md mx-auto'>
        <LoginForm />
        <div className='mt-4'>
          <a
            href='/auth/forgot-password'
            className='text-slate-500 font-medium text-xs'
          >
            Forgot your password?
          </a>
        </div>
      </section>
      <div className='max-w-md mx-auto mt-4 px-4'>
        <a
          href='/auth/register'
          className='text-slate-700 font-semibold text-xs'
        >
          Need an account? Sign Up
        </a>
      </div>
    </div>
  );
}
