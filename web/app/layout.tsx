import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Event Booking System',
  description: 'Book your events here!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Toaster position='top-center' closeButton />
        <Header />
        <div className='p-6 lg:px-8 max-w-7xl mx-auto'>{children}</div>
      </body>
    </html>
  );
}
