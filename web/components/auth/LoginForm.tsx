'use client';
import { login } from '@/app/lib/actions/auth';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = {
  errorMessage: null,
  success: false,
};

export default function LoginForm() {
  const [state, formAction] = useFormState(login, initialState);
  const { pending } = useFormStatus();

  return (
    <form className='flex flex-col gap-4' action={formAction}>
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
        {state.errorMessage && (
          <div className='text-red-500 text-xs font-medium mb-4'>
            {state.errorMessage}
          </div>
        )}
        <button
          type='submit'
          className='btn'
          aria-disabled={pending}
          disabled={pending}
        >
          {pending ? 'Submitting...' : 'Login'}
        </button>
      </div>
    </form>
  );
}
