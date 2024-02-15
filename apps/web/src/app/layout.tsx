import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
        <header className="mx-auto container px-4 max-w-2xl h-37.5px flex items-center justify-between -mt-2 mb-4">
          <h1 className="">Articles app</h1>
          <div className="flex gap-x-4">
            <a
              href="/blog"
              target="_self"
              className="hover:underline hover:underline-offset-4 hover:transition-transform"
            >
              log in
            </a>
            <a
              href="/music"
              target="_self"
              className="hover:underline hover:underline-offset-4 hover:transition-transform"
            >
              log out
            </a>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
