import { getSession } from '@/app/lib/session';
import RegisterForm from '@/components/auth/RegisterForm';
import { redirect } from 'next/navigation';

export default async function Register() {
  const session = await getSession();

  if (session.token) {
    return redirect('/');
  }

  return (
    <div>
      <h1 className='text-2xl mb-8 text-center font-semibold'>Register</h1>
      <section className='bg-slate-50 shadow p-4 max-w-md mx-auto'>
        <RegisterForm />
      </section>
      <div className='max-w-md mx-auto mt-4 px-4'>
        <a href='/auth/login' className='text-slate-700 font-semibold text-xs'>
          Have an account? Login
        </a>
      </div>
    </div>
  );
}
