import React, { useMemo } from "react";
import styles from "./Pagination.module.scss";
import { getShortPagination } from "../../utils";
import classNames from "classnames";

interface PaginationType {
  totalPages: number;
  currentPage: number;
  setPage: (p: number) => void;
  setPerPage: (v: string) => void;
}

const FIRST_PAGE = 1;

export const Pagination: React.FC<PaginationType> = ({
  totalPages,
  currentPage,
  setPage,
  setPerPage,
}) => {
  const pages = useMemo(
    () => getShortPagination(currentPage, totalPages),
    [currentPage, totalPages, setPage, setPerPage],
  );

  const isFirst = currentPage === FIRST_PAGE;
  const isLast = currentPage === totalPages;

  return (
    <section className={styles.pagination}>
      <div className={styles.content}>
        <nav className={styles.nav}>
          <button
            className={classNames(styles.button, "button", {
              disabled: isFirst,
            })}
            onClick={() => {
              setPage(
                Number(currentPage) - 1 < FIRST_PAGE
                  ? FIRST_PAGE
                  : currentPage - 1,
              );
            }}
          >
            {isFirst ? (
              <img
                src="/img/general/icons/arrow.svg"
                alt="arrow left"
                className={classNames(styles.icon, styles.iconLeft)}
              />
            ) : (
              <img
                src="/img/general/icons/arrow-white.svg"
                alt="arrow left"
                className={classNames(styles.icon, styles.iconLeft)}
              />
            )}
          </button>
          <div className={styles.list}>
            {pages.map(item => (
              <button
                onClick={() => setPage(item)}
                key={item}
                className={classNames(
                  styles.pageNumber,
                  "text-body",
                  "button",
                  { [styles.selected]: currentPage === item },
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            className={classNames(styles.button, "button", {
              disabled: isLast,
            })}
            onClick={() => {
              setPage(
                Number(currentPage) + 1 > totalPages
                  ? totalPages
                  : currentPage + 1,
              );
            }}
          >
            {isLast ? (
              <img
                src="/img/general/icons/arrow.svg"
                alt="arrow left"
                className={styles.icon}
              />
            ) : (
              <img
                src="/img/general/icons/arrow-white.svg"
                alt="arrow left"
                className={styles.icon}
              />
            )}
          </button>
        </nav>
      </div>
    </section>
  );
};
