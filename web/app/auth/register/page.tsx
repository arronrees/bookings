export default function Register() {
  return (
    <div>
      <h1 className='text-2xl mb-8 text-center font-semibold'>Register</h1>
      <section className='bg-slate-50 shadow p-4 max-w-md mx-auto'>
        <form className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <label
              className='font-semibold text-slate-500 text-xs block leading-normal'
              htmlFor='username'
            >
              Name
            </label>
            <input
              className='px-4 py-2 rounded border'
              type='username'
              name='username'
              id='username'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label
              className='font-semibold text-slate-500 text-xs block leading-normal'
              htmlFor='email'
            >
              Email
            </label>
            <input
              className='px-4 py-2 rounded border'
              type='email'
              name='email'
              id='email'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label
              className='font-semibold text-slate-500 text-xs block leading-normal'
              htmlFor='password'
            >
              Password
            </label>
            <input
              className='px-4 py-2 rounded border'
              type='password'
              name='password'
              id='password'
            />
          </div>
          <div>
            <button type='submit' className='btn'>
              Register
            </button>
          </div>
        </form>
      </section>
      <div className='max-w-md mx-auto mt-4 px-4'>
        <a href='/auth/login' className='text-slate-700 font-semibold text-xs'>
          Have an account? Login
        </a>
      </div>
    </div>
  );
}
