import { FC } from "react";
import { Article } from "@/lib/types/article";
import ArticleCardAdmin from "./ui/article-card-admin";
import { cookies } from "next/headers";

async function getData() {
  const res = await fetch("http://localhost:3333/articles", {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const AdminList: FC = async () => {
  const articles: Article[] = await getData();

  const cookieStore = cookies();
  const token = cookieStore.get("access_token");

  return (
    <div className="flex flex-col gap-2 pt-0">
      {articles.map((article: Article) => (
        <ArticleCardAdmin
          token={token?.value}
          key={article.id}
          article={article}
        />
      ))}
    </div>
  );
};

export default AdminList;
