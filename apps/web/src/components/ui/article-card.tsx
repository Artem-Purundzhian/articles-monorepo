import { FC } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";
import { buttonVariants } from "./button";
import { Link2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Article } from "@/lib/types/article";

interface cardProps {
  article: Article;
}

const ArticleCard: FC<cardProps> = ({ article }) => {
  return (
    <button
      key={article.id}
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-muted",
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
        <div className="text-xs font-medium opacity-75">{article.author}</div>
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
            buttonVariants({ variant: "ghost", size: "icon" }),
            "w-6 h-6",
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
  );
};

export default ArticleCard;
