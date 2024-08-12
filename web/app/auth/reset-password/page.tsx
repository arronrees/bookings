import { getSession } from '@/app/lib/session';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import { redirect } from 'next/navigation';

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: any;
}) {
  const session = await getSession();

  if (session.token) {
    return redirect('/');
  }

  return (
    <div>
      <h1 className='text-2xl mb-8 text-center font-semibold'>
        Reset Password
      </h1>
      <section className='bg-slate-50 shadow p-4 max-w-md mx-auto'>
        <ResetPasswordForm code={searchParams.code} />
        <div className='mt-4'>
          <a href='/auth/login' className='text-slate-500 font-medium text-xs'>
            Remember your password?
          </a>
        </div>
      </section>
    </div>
  );
}
