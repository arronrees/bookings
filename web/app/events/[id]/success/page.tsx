import { Event } from '@/constant.types';
import { API_URL } from '@/constants';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: any;
}) {
  if (!params.id) {
    return redirect('/');
  }

  if (
    !searchParams.quantity ||
    !searchParams.cost ||
    !searchParams.date ||
    !searchParams.booking_id
  ) {
    return redirect('/');
  }

  async function fetchEvent() {
    const data = await fetch(
      `${API_URL}/api/events/${params.id}?populate=image`,
      { cache: 'no-store' }
    ).then((res) => res.json());

    return data.data as Event;
  }

  const event = await fetchEvent();

  if (!event) {
    return redirect('/');
  }

  return (
    <div>
      <section className='grid gap-4 md:gap-6 max-w-2xl mx-auto'>
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
          <p className='font-light'>
            <span className='block font-semibold text-xl mb-1'>
              Congratulations!
            </span>
            You&apos;re going to see{' '}
            <span className='font-medium'>{event.attributes.title}</span> on{' '}
            <span className='font-medium'>
              {new Date(event.attributes.date).toDateString()}
            </span>
          </p>
        </div>
        <div className='rounded bg-slate-50 shadow p-6 flex flex-col gap-3 text-sm'>
          <div className='grid gap-2 md:grid-cols-[10rem,1fr]'>
            <p className='font-medium text-slate-500'>Purchase Date</p>
            <p>{searchParams.date}</p>
          </div>
          <span className='block w-full h-[1px] bg-slate-200/70'></span>
          <div className='grid gap-2 md:grid-cols-[10rem,1fr]'>
            <p className='font-medium text-slate-500'>Quantity</p>
            <p>{searchParams.quantity}</p>
          </div>
          <span className='block w-full h-[1px] bg-slate-200/70'></span>
          <div className='grid gap-2 md:grid-cols-[10rem,1fr]'>
            <p className='font-medium text-slate-500'>Cost (each)</p>
            <p>
              {new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
              }).format(searchParams.cost)}
            </p>
          </div>
          <span className='block w-full h-[1px] bg-slate-200/70'></span>
          <div>
            <a
              href={`/bookings/${searchParams.booking_id}`}
              className='block btn max-w-max'
            >
              View booking
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
