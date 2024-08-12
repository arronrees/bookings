'use client';
import { forgotPassword } from '@/app/lib/actions/auth';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';

const initialState = {
  errorMessage: null,
  success: false,
};

export default function ForgotPasswordForm() {
  const [state, formAction] = useFormState(forgotPassword, initialState);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.success) {
      toast('We have sent you an email to reset your password.');
    }
  }, [state.success]);

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
          {pending ? 'Submitting...' : 'Send Email'}
        </button>
      </div>
    </form>
  );
}
