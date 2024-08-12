import { getSession } from '@/app/lib/session';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { redirect } from 'next/navigation';

export default async function ForgotPassword() {
  const session = await getSession();

  if (session.token) {
    return redirect('/');
  }

  return (
    <div>
      <h1 className='text-2xl mb-8 text-center font-semibold'>
        Forgot Password
      </h1>
      <section className='bg-slate-50 shadow p-4 max-w-md mx-auto'>
        <ForgotPasswordForm />
        <div className='mt-4'>
          <a href='/auth/login' className='text-slate-500 font-medium text-xs'>
            Remember your password?
          </a>
        </div>
      </section>
    </div>
  );
}
