import AdminList from "@/components/admin-list";
import CreateArticleModal from "@/components/create-article-modal";
import { cookies } from "next/headers";

const Page = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");

  return (
    <main className="mx-auto max-w-2xl container px-4 text-center">
      <CreateArticleModal token={token?.value} />
      <AdminList />
    </main>
  );
};

export default Page;
