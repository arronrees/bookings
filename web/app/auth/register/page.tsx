import RegisterForm from '@/components/auth/RegisterForm';

export default function Register() {
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
