import { Booking } from '@/constant.types';
import { API_URL } from '@/constants';
import Image from 'next/image';

export default function BookingItem({ booking }: { booking: Booking }) {
  return (
    <div className='grid gap-4 md:grid-cols-[16rem,1fr] rounded bg-slate-50 shadow'>
      <div className='relative h-[14rem] md:h-full w-full'>
        <Image
          src={`${API_URL}${booking.attributes.event.data.attributes.image.data.attributes.formats.medium.url}`}
          alt=''
          fill
          className='object-cover rounded-t'
          sizes='80vw'
        />
      </div>
      <div className='flex flex-col gap-3 text-sm p-6'>
        <div className='grid gap-2 md:grid-cols-[10rem,1fr]'>
          <p className='font-medium text-slate-500'>You&apos;re seeing</p>
          <a
            href={`/events/${booking.attributes.event.data.id}`}
            className='font-semibold'
          >
            {booking.attributes.event.data.attributes.title}
          </a>
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
        <span className='block w-full h-[1px] bg-slate-200/70'></span>
        <div>
          <a href={`/bookings/${booking.id}`} className='block btn max-w-max'>
            View booking
          </a>
        </div>
      </div>
    </div>
  );
}
