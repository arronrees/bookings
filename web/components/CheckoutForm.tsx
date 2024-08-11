'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CheckoutForm({ eventId }: { eventId: number }) {
  const router = useRouter();

  const [quantity, setQuantity] = useState<number>(1);
  const [pending, setPending] = useState<boolean>(false);

  async function handleTicketPurchase(e: React.FormEvent) {
    e.preventDefault();

    setPending(true);

    const data = await fetch('/api/checkout', {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, quantity }),
      method: 'POST',
    }).then((res) => res.json());

    if (data.data) {
      router.push(data.data);
      setPending(false);
      return;
    }
  }

  return (
    <form
      onSubmit={handleTicketPurchase}
      method='POST'
      className='flex items-center gap-2 mt-6'
    >
      <input
        type='number'
        name='quantity'
        id='quantity'
        value={quantity}
        min={1}
        max={10}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        className='px-4 py-2 rounded border text-sm'
      />
      <button type='submit' className='btn max-w-max' disabled={pending}>
        Buy Ticket
      </button>
    </form>
  );
}
