import ArticlesList from '@/components/articles-list';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl container px-4">
      <ArticlesList />
    </main>
  );
}
