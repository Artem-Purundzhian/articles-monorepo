import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Link from 'next/link';
import { Toaster } from '@/components/ui/toaster';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/logout-button';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Articles app',
  description: 'Articles fetched from rss feeds',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const token = cookieStore.get('access_token');

  if (token?.value) {
    try {
      const response = await fetch('http://localhost:3333/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
      });

      const res = await response.json();

      if (response.ok) {
        if (res.email) {
          console.log(res);
        } else {
          redirect('/sign-in');
        }
      } else {
        console.log(res);
        redirect('/sign-in');
      }
    } catch (err) {
      console.log(err);
      redirect('/sign-in');
    }
  } else {
    redirect('/sign-in');
  }

  return (
    <html lang="en" className="dark bg-background">
      <body className={inter.className}>
        <header className="mx-auto pt-8 container px-4 max-w-2xl h-37.5px flex items-center justify-between mb-4">
          <h1 className="">
            <Link href="/">Article app</Link>
          </h1>
          <div className="flex gap-x-4">
            <LogoutButton />
          </div>
        </header>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
