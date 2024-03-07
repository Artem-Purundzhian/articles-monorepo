import AdminList from "@/components/admin-list";
import CreateArticleModal from "@/components/create-article-modal";
import { cookies } from "next/headers";

const Page = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <main className="mx-auto max-w-2xl container px-4 text-center">
      <CreateArticleModal token={token?.value} />
      <AdminList query={query} currentPage={currentPage} />
    </main>
  );
};

export default Page;
