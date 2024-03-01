import ArticlesList from "@/components/articles-list";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  console.log(query, currentPage);

  return (
    <main className="mx-auto max-w-2xl container px-4">
      <ArticlesList />
    </main>
  );
}
