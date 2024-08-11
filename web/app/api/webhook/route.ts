import { API_KEY, API_URL, STRIPE_WEBHOOK_SECRET } from '@/constants';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return new Response('No signature', {
      status: 401,
    });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(err);

    return new Response('Stripe webook error', {
      status: 400,
    });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;

      const updateBooking = await fetch(
        `${API_URL}/api/bookings/${data.metadata?.bookingId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            data: {
              status: 'Paid',
              stripeData: data,
            },
          }),
        }
      );

      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response('Success', {
    status: 200,
  });
}
