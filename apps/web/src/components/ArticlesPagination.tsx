"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { generatePagination } from "@/lib/articles";

export default function ArtcilesPagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="py-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={createPageURL(currentPage - 1)}
              className={currentPage <= 1 ? "hidden" : ""}
            />
          </PaginationItem>
          {allPages.map((page, index) => {
            if (page != "...") {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={createPageURL(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            } else {
              return (
                <PaginationItem key={page + index}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
          })}
          <PaginationItem>
            <PaginationNext
              href={createPageURL(currentPage + 1)}
              className={currentPage >= totalPages ? "hidden" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
