import { FC, Suspense } from "react";
import { Article } from "@/lib/types/article";
import Search from "./search";
import ArticleCard from "./ui/article-card";

interface ArticleListProps {
  query: string;
  currentPage: number;
}

async function getData(query: string) {
  const res = await fetch(
    `http://localhost:3333/articles/?query=${query}&page=2`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    console.log(res);
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const ArticlesList: FC<ArticleListProps> = async ({ query, currentPage }) => {
  const articles: Article[] = await getData(query);

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
    </>
  );
};

export default ArticlesList;
