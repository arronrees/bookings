import { getSession } from '@/app/lib/session';
import CheckoutForm from '@/components/CheckoutForm';
import { Event } from '@/constant.types';
import { API_URL } from '@/constants';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function EventPage({
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

  const session = await getSession();

  return (
    <div>
      <section className='grid gap-4 md:gap-6 max-w-2xl mx-auto'>
        <div className='relative h-[350px]'>
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
          <div className='mb-4 flex flex-wrap gap-2'>
            <span
              className={`text-xs rounded-full py-1 px-3 ${
                event.attributes.availability === 'Available'
                  ? 'bg-green-200'
                  : event.attributes.availability === 'Sold Out'
                  ? 'bg-red-200'
                  : event.attributes.availability === 'Unavailable'
                  ? 'bg-slate-300'
                  : ''
              }`}
            >
              {event.attributes.availability}
            </span>
            <span
              className={`text-xs rounded-full py-1 px-3 bg-indigo-100 ${
                event.attributes.ticketsAvailable == 0
                  ? 'bg-red-100'
                  : 'bg-indigo-100'
              }`}
            >
              {event.attributes.ticketsAvailable} tickets remaining
            </span>
          </div>
          <p className='font-light text-sm'>{event.attributes.description}</p>

          {session.isLoggedIn ? (
            event.attributes.availability === 'Available' &&
            event.attributes.ticketsAvailable > 0 && (
              <CheckoutForm eventId={event.id} />
            )
          ) : (
            <a href='/auth/login' className='btn max-w-max mt-4'>
              Login to buy ticket
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
