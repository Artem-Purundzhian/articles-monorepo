import { FC, Suspense } from "react";
import { Article } from "@/lib/types/article";
import Search from "./search";
import ArticleCard from "./ui/article-card";
import { getArticles, getArticlesPages } from "@/lib/articles";
import ArtcilesPagination from "./ArticlesPagination";

interface ArticleListProps {
  query: string;
  currentPage: number;
}

const ArticlesList: FC<ArticleListProps> = async ({ query, currentPage }) => {
  const totalPages = Math.ceil((await getArticlesPages(query)) / 3);
  const articles: Article[] = await getArticles(query, currentPage);
  return (
    <>
      <Search placeholder="Search articles..." />
      <Suspense key={query + currentPage} fallback={<div></div>}>
        <div className="flex flex-col gap-2 pt-0">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </Suspense>
      <ArtcilesPagination totalPages={totalPages} />
    </>
  );
};

export default ArticlesList;
