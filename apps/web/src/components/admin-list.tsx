import { FC } from "react";
import { Article } from "@/lib/types/article";
import ArticleCardAdmin from "./ui/article-card-admin";
import { cookies } from "next/headers";
import Search from "./search";
import { getArticles, getArticlesPages } from "@/lib/articles";
import ArtcilesPagination from "./ArticlesPagination";

interface AdminListProps {
  query: string;
  currentPage: number;
}

const AdminList: FC<AdminListProps> = async ({ query, currentPage }) => {
  const totalPages = Math.ceil((await getArticlesPages(query)) / 3);
  const articles: Article[] = await getArticles(query, currentPage);

  const cookieStore = cookies();
  const token = cookieStore.get("access_token");

  return (
    <>
      <Search placeholder="Search articles ..." />
      <div className="flex flex-col gap-2 pt-0">
        {articles.map((article: Article) => (
          <ArticleCardAdmin
            token={token?.value}
            key={article._id}
            article={article}
          />
        ))}
      </div>
      <ArtcilesPagination totalPages={totalPages} />
    </>
  );
};

export default AdminList;
