import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Button } from '@/components/ui/button';

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
    <html lang="en">
      <body className={inter.className + ' dark p-8'}>
        <header className="mx-auto container px-4 max-w-2xl h-37.5px flex items-center justify-between mb-4">
          <h1 className="">Articles app</h1>
          <div className="flex gap-x-4">
            <Button size="sm">Log in</Button>
            <Button variant="secondary" size="sm">
              Sign up
            </Button>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
