import { FC } from 'react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

export interface Article {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: Date;
  category: string;
  title: string;
  description: string;
  link: string;
  author: string;
  mediaLink: string;
}

async function getData() {
  const res = await fetch('http://localhost:3333/articles', {
    headers: {
      'Content-Type': 'application/json',
    },
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
      {articles.map((article: any) => (
        <button
          key={article.id}
          className={cn(
            'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-muted'
          )}
        >
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="font-semibold">{article.title}</div>
              </div>
              <div className={cn('ml-auto text-xs text-foreground')}>
                {formatDistanceToNow(new Date(article.createdAt), {
                  addSuffix: true,
                })}
              </div>
            </div>
            <div className="text-xs font-medium">{article.author}</div>
          </div>
          <div className="line-clamp-2 text-xs text-muted-foreground">
            {/* {article.description.substring(0, 300)} */}
            {article.description}
          </div>
          <div className="flex items-center gap-2">
            <Badge>Badge</Badge>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ArticlesList;
