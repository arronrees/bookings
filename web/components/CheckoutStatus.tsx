'use client';

import { useEffect } from 'react';

export default function CheckoutStatus() {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }
  }, []);

  return null;
}
