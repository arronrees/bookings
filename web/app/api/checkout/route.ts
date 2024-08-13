import { getSession } from '@/app/lib/session';
import { Event, User } from '@/constant.types';
import { API_KEY, API_URL, SITE_URL } from '@/constants';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

export async function POST(request: Request) {
  const { event, quantity }: { event: Event; quantity: number } =
    await request.json();

  if (!event) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'No event ID',
      }),
      {
        status: 400,
      }
    );
  }

  if (!quantity || quantity < 1) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'No quantity specified',
      }),
      {
        status: 400,
      }
    );
  }

  const session = await getSession();

  if (!session.userId) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'No session',
      }),
      {
        status: 401,
      }
    );
  }

  if (event.attributes.ticketsAvailable < quantity) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Not enough tickets available',
      }),
      {
        status: 400,
      }
    );
  }

  async function fetchUser() {
    const data = await fetch(`${API_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${session.token}` },
      cache: 'no-store',
    }).then((res) => res.json());

    return data as User;
  }

  const user = await fetchUser();

  if (!user) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'No user found',
      }),
      {
        status: 401,
      }
    );
  }

  const newBooking = await fetch(`${API_URL}/api/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    cache: 'no-store',
    body: JSON.stringify({
      data: {
        user: { connect: [user.id] },
        event: { connect: [event.id] },
        status: 'Processing',
        quantity,
        amount_total: quantity * event.attributes.cost,
      },
    }),
  }).then((res) => res.json());

  if (!newBooking) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Could not create booking',
      }),
      {
        status: 500,
      }
    );
  }

  const updateTicketAvailablity = await fetch(
    `${API_URL}/api/events/${event.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      cache: 'no-store',
      body: JSON.stringify({
        data: {
          ticketsAvailable: event.attributes.ticketsAvailable - quantity,
        },
      }),
    }
  );

  if (!updateTicketAvailablity) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Could not create booking',
      }),
      {
        status: 500,
      }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      metadata: {
        bookingId: newBooking.data?.id,
      },
      customer_email: user.email,
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: `${event.attributes.title} Ticket`,
              images: [
                `${API_URL}${event.attributes.image.data.attributes.url}`,
              ],
              description: event.attributes.description,
            },
            unit_amount: event.attributes.cost * 100,
          },
          quantity,
        },
      ],
      success_url: `${SITE_URL}/events/${
        event.id
      }/success?quantity=${quantity}&cost=${
        event.attributes.cost
      }&date=${new Date().toDateString()}&booking_id=${newBooking.data.id}`,
      cancel_url: `${SITE_URL}/events/${event.id}/cancel?booking_id=${newBooking.data.id}`,
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: session.url,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Could not create checkout, please try again',
      }),
      {
        status: 500,
      }
    );
  }
}
