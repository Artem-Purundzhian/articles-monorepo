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
  console.log("count numbers");
  try {
    const res = await fetch(
      `http://localhost:3333/articles/count/?query=${query}`,
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

export const generatePagination = (currentPage: number, totalPages: number) => {
  noStore();
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

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
