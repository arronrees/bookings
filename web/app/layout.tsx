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
        <div className='min-h-screen flex flex-col'>
          <Toaster position='top-center' closeButton />
          <Header />
          <div className='p-6 lg:px-8 max-w-7xl mx-auto w-full'>{children}</div>
          <div className='mt-auto'>
            <div className='text-center text-xs p-4 bg-slate-200 mt-16 font-light'>
              This is a development site and the products are not real.
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
