import { Event } from '@/constant.types';
import { API_URL } from '@/constants';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import CheckoutStatus from '@/components/CheckoutStatus';

export default async function CheckoutPage({
  params,
}: {
  params: { id: string };
}) {
  if (!params.id) {
    return redirect('/');
  }

  async function fetchEvent() {
    const data = await fetch(
      `${API_URL}/api/events/${params.id}?populate=image`
    ).then((res) => res.json());

    return data.data as Event;
  }

  const event = await fetchEvent();

  if (!event) {
    return redirect('/');
  }

  return (
    <div>
      <CheckoutStatus />
      <section className='grid gap-4 md:gap-6 md:grid-cols-2 max-w-2xl mx-auto'>
        <div className='relative h-[200px]'>
          <Image
            src={`${API_URL}${event.attributes.image.data.attributes.url}`}
            alt=''
            fill
            className='object-cover rounded shadow'
            sizes='100vw'
          />
        </div>
        <div className='flex flex-col gap-2 justify-center'>
          <p className='text-slate-500 text-sm'>
            {new Date(event.attributes.date).toLocaleDateString()}
          </p>
          <p className='font-semibold text-xl'>{event.attributes.title}</p>
        </div>
      </section>
    </div>
  );
}
