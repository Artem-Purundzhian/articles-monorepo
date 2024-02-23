import { FC } from 'react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import { buttonVariants } from './ui/button';
import { Link2 } from 'lucide-react';
import { Article } from '@/lib/types/article';

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

const ArticlesList: FC = async () => {
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
              <Badge className="text-xs">{article.feedTitle}</Badge>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-2">
                <div className="font-semibold">{article.title}</div>
              </div>
            </div>
            <div className="text-xs font-medium opacity-75">
              {article.author}
            </div>
          </div>
          <div
            className="line-clamp-2 text-xs text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: article.description }}
          ></div>
          <div className="flex items-center justify-between w-full mt-2">
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
            <div className="text-xs text-foreground whitespace-nowrap">
              {formatDistanceToNow(new Date(article.published), {
                addSuffix: true,
              })}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ArticlesList;
