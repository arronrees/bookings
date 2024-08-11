import { Event } from '@/constant.types';
import { API_URL } from '@/constants';
import Image from 'next/image';

export default async function Home() {
  async function fetchEvents() {
    const data = await fetch(
      `${API_URL}/api/events?populate=image&filters[availability][$ne]=Unavailable`,
      { cache: 'no-store' }
    ).then((res) => res.json());

    return data.data as Event[];
  }

  const events = await fetchEvents();

  return (
    <div>
      <h1 className='text-2xl mb-6'>Current Events</h1>
      <section className='grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3'>
        {events &&
          events.map((event) => (
            <div
              key={event.id}
              className='flex flex-col w-full h-full rounded bg-slate-100 shadow'
            >
              <div className='relative h-56 w-full'>
                <Image
                  src={`${API_URL}${event.attributes.image.data.attributes.formats.medium.url}`}
                  alt=''
                  fill
                  className='object-cover rounded-t'
                  sizes='33vw'
                />
              </div>
              <div className='p-3 flex flex-col gap-1'>
                <div className='flex gap-2 items-center justify-between'>
                  <p className='text-lg'>{event.attributes.title}</p>
                  <p className='text-xs text-slate-500'>
                    {new Date(event.attributes.date).toLocaleDateString()}
                  </p>
                </div>
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
                    className={`text-xs rounded-full py-1 px-3 ${
                      event.attributes.ticketsAvailable == 0
                        ? 'bg-red-100'
                        : 'bg-indigo-100'
                    }`}
                  >
                    {event.attributes.ticketsAvailable} tickets remaining
                  </span>
                </div>
                <div className='mt-4 flex gap-2 items-center justify-between'>
                  <p className='font-semibold text-slate-500'>
                    {new Intl.NumberFormat('en-GB', {
                      style: 'currency',
                      currency: 'GBP',
                    }).format(event.attributes.cost)}
                  </p>
                  {event.attributes.availability === 'Available' &&
                    event.attributes.ticketsAvailable > 0 && (
                      <a href={`/events/${event.id}`} className='btn max-w-max'>
                        View More
                      </a>
                    )}
                </div>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}
