import { getSession } from '@/app/lib/session';
import { Event, User } from '@/constant.types';
import { API_URL, SITE_URL } from '@/constants';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

export async function POST(request: Request) {
  const { eventId, quantity } = await request.json();

  if (!eventId) {
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

  async function fetchEvent() {
    const data = await fetch(
      `${API_URL}/api/events/${eventId}?populate=image`
    ).then((res) => res.json());

    return data.data as Event;
  }

  const event = await fetchEvent();

  if (!event) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'No event found',
      }),
      {
        status: 404,
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

  try {
    const session = await stripe.checkout.sessions.create({
      metadata: {
        userId: user.id,
        eventId: event.id,
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
      success_url: `${SITE_URL}/events/${eventId}/success`,
      cancel_url: `${SITE_URL}/events/${eventId}`,
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
