/* eslint-disable react/display-name */
import { FC, memo, useMemo } from 'react';

import styles from './Pagination.module.scss';
import { SearchLink } from '../SearchLink';
import cn from 'classnames';
import { getVisiblePages } from '../../../utils/getVisiblePages';
import { backToTop } from '../../../utils/backToTop';

type Props = {
  currentPage: number;
  totalPages: number;
};

const MAX_VISIBLE_PAGES = 4;

export const Pagination: FC<Props> = memo(({ currentPage, totalPages }) => {
  const firstPage = 1;
  const lastPage = totalPages;

  const visiblePages = useMemo(
    () => getVisiblePages(currentPage, totalPages, MAX_VISIBLE_PAGES),
    [currentPage, totalPages],
  );

  const showStartEllipsis = useMemo(
    () => visiblePages[0] > firstPage + 1,
    [visiblePages],
  );

  const showEndEllipsis = useMemo(
    () => visiblePages[visiblePages.length - 1] < lastPage - 1,
    [visiblePages, lastPage],
  );

  const disablePrevPage = currentPage === firstPage;

  const disableNextPage = currentPage === lastPage;

  const jumpBackPage = useMemo(
    () => Math.max(visiblePages[0] - MAX_VISIBLE_PAGES, 1),
    [visiblePages],
  );

  const jumpForwardPage = useMemo(
    () =>
      Math.min(
        visiblePages[visiblePages.length - 1] + MAX_VISIBLE_PAGES,
        totalPages,
      ),
    [visiblePages, totalPages],
  );

  return (
    <div className={styles.wrapper}>
      {/* Previous page link */}
      <SearchLink
        paramsToUpdate={{ page: currentPage - 1 }}
        className={cn(styles.iconLink, {
          [styles.iconLinkDisabled]: disablePrevPage,
        })}
        onClick={e => {
          if (disablePrevPage) {
            e.preventDefault();
          } else {
            backToTop();
          }
        }}
      >
        <span className={`${styles.icon} ${styles.iconPrev}`}></span>
      </SearchLink>

      <ul className={styles.pagesNums}>
        {/* Show first page if it is not in the visible range */}
        {visiblePages[0] > firstPage && (
          <li className={styles.pageNum}>
            <SearchLink
              paramsToUpdate={{ page: firstPage }}
              className={styles.pageNumLink}
              onClick={backToTop}
            >
              {firstPage}
            </SearchLink>
          </li>
        )}

        {/* Clickable ellipsis to jump back */}
        {showStartEllipsis && (
          <li className={styles.ellipsis}>
            <SearchLink
              paramsToUpdate={{ page: jumpBackPage }}
              className={styles.pageNumLink}
              onClick={backToTop}
            >
              ...
            </SearchLink>
          </li>
        )}

        {/* Render the range of visible page numbers */}
        {visiblePages.map(pageNumber => (
          <li key={pageNumber} className={styles.pageNum}>
            <SearchLink
              paramsToUpdate={{ page: pageNumber }}
              className={cn(styles.pageNumLink, {
                [styles.pageNumLinkActive]: pageNumber === currentPage,
              })}
              onClick={backToTop}
            >
              {pageNumber}
            </SearchLink>
          </li>
        ))}

        {/* Clickable ellipsis to jump forward */}
        {showEndEllipsis && (
          <li className={styles.ellipsis}>
            <SearchLink
              paramsToUpdate={{ page: jumpForwardPage }}
              className={styles.pageNumLink}
              onClick={backToTop}
            >
              ...
            </SearchLink>
          </li>
        )}

        {/* Show last page if it is not in the visible range */}
        {visiblePages[visiblePages.length - 1] < lastPage && (
          <li className={styles.pageNum}>
            <SearchLink
              paramsToUpdate={{ page: lastPage }}
              className={styles.pageNumLink}
              onClick={backToTop}
            >
              {lastPage}
            </SearchLink>
          </li>
        )}
      </ul>

      {/* Next page link */}
      <SearchLink
        paramsToUpdate={{ page: currentPage + 1 }}
        className={cn(styles.iconLink, {
          [styles.iconLinkDisabled]: disableNextPage,
        })}
        onClick={e => (disableNextPage ? e.preventDefault() : backToTop())}
      >
        <span className={`${styles.icon} ${styles.iconNext}`}></span>
      </SearchLink>
    </div>
  );
});
