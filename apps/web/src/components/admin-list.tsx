import { FC } from 'react';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import { Link2 } from 'lucide-react';

export interface Article {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: Date;
  category: string;
  title: string;
  description: string;
  content: string;
  feedTitle: string;
  link: string;
  author: string;
  mediaLink: string;
}

async function getData() {
  const res = await fetch('http://localhost:3333/articles', {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const AdminList: FC = async () => {
  const articles: Article[] = await getData();

  return (
    <div className="flex flex-col gap-2 pt-0">
      {articles.map((article) => (
        <button
          key={article.id}
          className={cn(
            'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-muted'
          )}
        >
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center pb-2">
              <div className="text-xs">Source: {article.feedTitle}</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-2">
                <div className="font-semibold">{article.title}</div>
              </div>
            </div>
            <div className="text-xs font-medium opacity-75">
              Author: {article.author}
            </div>
            <div className="text-xs text-foreground whitespace-nowrap">
              Published:{' '}
              {format(new Date(article.published), 'yyyy-MM-dd, HH:mm')}
            </div>
          </div>
          <div className="flex items-center w-full mt-2">
            Link:
            <a
              target="_blank"
              href={article.link}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'w-6 h-6'
              )}
            >
              <Link2 className="w-4 h-4" />
            </a>
          </div>
        </button>
      ))}
    </div>
  );
};

export default AdminList;
