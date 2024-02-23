import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Articles app',
  description: 'Articles fetched from rss feeds',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body className={inter.className}>
        <header className="mx-auto pt-8 container px-4 max-w-2xl h-37.5px flex items-center justify-between mb-4">
          <h1 className="">
            <Link href="/">Article app</Link>
          </h1>
          <div className="flex gap-x-4">
            <Link className={buttonVariants({ size: 'sm' })} href="sign-in">
              Log in
            </Link>
            <Link
              className={buttonVariants({ variant: 'secondary', size: 'sm' })}
              href="sign-up"
            >
              Sing up
            </Link>
          </div>
        </header>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
