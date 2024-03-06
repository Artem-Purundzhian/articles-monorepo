import { unstable_noStore as noStore } from "next/cache";

export async function getArticles(query: string, currentPage: number) {
  noStore();
  try {
    const res = await fetch(
      `http://localhost:3333/articles/?query=${query}&page=${currentPage ? currentPage : 1}`,
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
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function getArticlesPages(query: string) {
  noStore();
  try {
    return 10;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
