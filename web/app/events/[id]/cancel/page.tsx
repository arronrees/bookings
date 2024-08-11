import { Event } from '@/constant.types';
import { API_KEY, API_URL } from '@/constants';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function Cancel({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: any;
}) {
  if (!params.id) {
    return redirect('/');
  }

  if (!searchParams.booking_id) {
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

  const booking = await fetch(
    `${API_URL}/api/bookings/${searchParams.booking_id}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  ).then((res) => res.json());

  if (booking.data) {
    const updateTicketAvailablity = await fetch(
      `${API_URL}/api/events/${event.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          data: {
            ticketsAvailable:
              event.attributes.ticketsAvailable +
              booking.data.attributes.quantity,
          },
        }),
      }
    );

    const deletedBooking = await fetch(
      `${API_URL}/api/bookings/${searchParams.booking_id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
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
          <p className='font-semibold text-xl'>Booking Cancelled</p>
          <p>
            Your booking for {event.attributes.title} was cancelled
            successfully. If you want to book again, please click the link
            below.
          </p>
          <p>
            <a
              href={`/events/${event.id}`}
              className='btn mt-4 block max-w-max'
            >
              View Event
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
