import { redirect } from 'next/navigation';
import { getSession } from '../lib/session';
import { Booking } from '@/constant.types';
import { API_URL } from '@/constants';
import BookingItem from '@/components/BookingItem';

export default async function MyBookings() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return redirect('/auth/login');
  }

  async function fetchBookings() {
    const data = await fetch(
      `${API_URL}/api/bookings?populate[event][populate][0]=image`,
      {
        headers: { Authorization: `Bearer ${session.token}` },
        cache: 'no-store',
      }
    ).then((res) => res.json());

    console.log(data);

    return data.data as Booking[];
  }

  const bookings = await fetchBookings();

  return (
    <div>
      <h1 className='text-2xl mb-6'>My Bookings</h1>
      <section className='grid gap-4 md:gap-6'>
        {bookings &&
          bookings.map((booking) => (
            <BookingItem booking={booking} key={booking.id} />
          ))}
      </section>
    </div>
  );
}
