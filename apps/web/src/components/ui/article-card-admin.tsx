import { Article } from '@/lib/types/article';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Link2, Trash2Icon } from 'lucide-react';
import { Button, buttonVariants } from './button';

import { FC } from 'react';

interface cardProps {
  article: Article;
}

const ArticleCardAdmin: FC<cardProps> = ({ article }) => {
  return (
    <div
      key={article.id}
      className={cn(
        'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all'
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
          Published: {format(new Date(article.published), 'yyyy-MM-dd, HH:mm')}
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
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
        <div className="flex items-center gap-2">
          <Button variant="destructive" size="sm">
            <Trash2Icon className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="sm">
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCardAdmin;
