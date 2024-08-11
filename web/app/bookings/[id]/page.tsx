import { redirect } from 'next/navigation';
import { getSession } from '../../lib/session';
import { Booking } from '@/constant.types';
import { API_URL } from '@/constants';
import BookingItem from '@/components/BookingItem';
import Image from 'next/image';

export default async function BookingPage({
  params,
}: {
  params: { id: string };
}) {
  if (!params.id) {
    return redirect('/bookings');
  }

  const session = await getSession();

  if (!session.isLoggedIn) {
    return redirect('/auth/login');
  }

  async function fetchBooking() {
    const data = await fetch(
      `${API_URL}/api/bookings/${params.id}?populate[event][populate][0]=image`,
      {
        headers: { Authorization: `Bearer ${session.token}` },
      }
    ).then((res) => res.json());

    return data.data as Booking;
  }

  const booking = await fetchBooking();

  return (
    <div>
      <p className='mb-6'>
        <span className='block font-semibold text-2xl mb-1'>Your Booking</span>
        You're going to see{' '}
        <span className='font-medium'>
          {booking.attributes.event.data.attributes.title}
        </span>{' '}
        on{' '}
        <span className='font-medium'>
          {new Date(
            booking.attributes.event.data.attributes.date
          ).toDateString()}
        </span>
      </p>
      <section className='grid gap-4 md:gap-6 lg:gap-8'>
        <div className='relative h-[350px]'>
          <Image
            src={`${API_URL}${booking.attributes.event.data.attributes.image.data.attributes.url}`}
            alt=''
            fill
            className='object-cover rounded shadow'
            sizes='100vw'
          />
        </div>
        <div className='flex flex-col gap-3 text-sm'>
          <div className='grid gap-2 md:grid-cols-[10rem,1fr]'>
            <p className='font-medium text-slate-500'>You're seeing</p>
            <p>
              <a
                href={`/events/${booking.attributes.event.data.id}`}
                className='font-semibold'
              >
                {booking.attributes.event.data.attributes.title}
              </a>
            </p>
          </div>
          <span className='block w-full h-[1px] bg-slate-200/70'></span>
          <div className='grid gap-2 md:grid-cols-[10rem,1fr]'>
            <p className='font-medium text-slate-500'>Event Date</p>
            <p>
              {new Date(
                booking.attributes.event.data.attributes.date
              ).toDateString()}
            </p>
          </div>
          <span className='block w-full h-[1px] bg-slate-200/70'></span>
          <div className='grid gap-2 md:grid-cols-[10rem,1fr]'>
            <p className='font-medium text-slate-500'>Venue</p>
            <p>{booking.attributes.event.data.attributes.location}</p>
          </div>
          <span className='block w-full h-[1px] bg-slate-200/70'></span>
          <div className='grid gap-2 md:grid-cols-[10rem,1fr]'>
            <p className='font-medium text-slate-500'>Quantity</p>
            <p>{booking.attributes.quantity}</p>
          </div>
          <span className='block w-full h-[1px] bg-slate-200/70'></span>
          <div className='grid gap-2 md:grid-cols-[10rem,1fr]'>
            <p className='font-medium text-slate-500'>Cost (each)</p>
            <p>
              {new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
              }).format(
                booking.attributes.amount_total / booking.attributes.quantity
              )}
            </p>
          </div>
          <span className='block w-full h-[1px] bg-slate-200/70'></span>
          <div className='grid gap-2 md:grid-cols-[10rem,1fr]'>
            <p className='font-medium text-slate-500'>Cost (total)</p>
            <p>
              {new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
              }).format(booking.attributes.amount_total)}
            </p>
          </div>
          <span className='block w-full h-[1px] bg-slate-200/70'></span>
          <div className='grid gap-2 md:grid-cols-[10rem,1fr]'>
            <p className='font-medium text-slate-500'>Purchase Date</p>
            <p>{new Date(booking.attributes.purchaseDate).toDateString()}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
