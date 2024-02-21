import ArticlesList from '@/components/articles-list';
import { cookies } from 'next/headers';

export default function Home() {
  const cookieStore = cookies()
  const token = cookieStore.get('access_token')
  console.log(token);
  return (
    <main className="mx-auto max-w-2xl container px-4">
      <ArticlesList />
    </main>
  );
}
