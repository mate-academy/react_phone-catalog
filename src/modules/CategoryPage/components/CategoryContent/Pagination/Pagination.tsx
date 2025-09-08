import React from "react";
import { Link, useSearchParams } from "react-router-dom";

import type { Product } from "../../../../shared/types/Product";

import styles from "./Pagination.module.scss";

type Props = { products: Array<Product> };

export const Pagination: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();

  const currentPage = Math.max(1, Number(searchParams.get("page") || "1"));
  const itemsPerPage = Math.max(1, Number(searchParams.get("perPage") || "16"));

  const pageCount = Math.max(1, Math.ceil(products.length / itemsPerPage));
  const visiblePages = 4;

  const maxStart = Math.max(1, pageCount - (visiblePages - 1));
  const startPage = Math.max(1, Math.min(currentPage - 2, maxStart));
  const length = Math.min(visiblePages, pageCount);
  const pageList = Array.from({ length }, (_, i) => startPage + i);

  const buildLink = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page <= 1) {
       params.delete("page");
    } else {
      params.set("page", String(page));
    }

    const qs = params.toString();

    return qs ? `?${qs}` : "";
  };

  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(pageCount, currentPage + 1);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <Link
        className={styles.paginationArrowLink}
        data-disabled={currentPage === 1}
        aria-disabled={currentPage === 1}
        to={buildLink(prevPage)}
      >
        <img src="src/assets/icons/arrow-left.svg" alt="Previous page" />
      </Link>

      {pageList.map((page) => (
        <Link
          key={page}
          className={styles.paginationPageLink}
          data-active={page === currentPage}
          aria-current={page === currentPage ? "page" : undefined}
          to={buildLink(page)}
        >
          {page}
        </Link>
      ))}

      <Link
        className={styles.paginationArrowLink}
        data-disabled={currentPage === pageCount}
        aria-disabled={currentPage === pageCount}
        to={buildLink(nextPage)}
      >
        <img src="src/assets/icons/arrow-right.svg" alt="Next page" />
      </Link>
    </nav>
  );
};
