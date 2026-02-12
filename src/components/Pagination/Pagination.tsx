import { useEffect, useState } from 'react';
import { SearchLink } from '../SearchLink/SearchLink';
import styles from './Pagination.module.scss';
import classNames from 'classnames';

type Props = {
  currentPage: number;
  totalPages: number;
};

export const Pagination: React.FC<Props> = ({ currentPage, totalPages }) => {
  const [visiblePages, setVisiblePages] = useState(5);

  // old version:
  // const start = Math.max(1, currentPage - 1);
  // const end = Math.min(totalPages, currentPage + 2);

  // const pages = Array.from(
  //   { length: end - start + 1 },
  //   (_, i) => start + i
  // );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) {
        setVisiblePages(3);
      } else if (window.innerWidth < 768) {
        setVisiblePages(5);
      } else {
        setVisiblePages(7);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(visiblePages / 2);

    if (totalPages <= visiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= halfVisible) {
      pages.push(...Array.from({ length: visiblePages - 1 }, (_, i) => i + 1));
      pages.push('...', totalPages);
    } else if (currentPage >= totalPages - halfVisible) {
      pages.push(1, '...');
      pages.push(
        ...Array.from(
          { length: visiblePages - 1 },
          (_, i) => totalPages - visiblePages + 2 + i,
        ),
      );
    } else {
      pages.push(1, '...');
      pages.push(
        ...Array.from(
          { length: visiblePages - 2 },
          (_, i) => currentPage - halfVisible + 1 + i,
        ),
      );
      pages.push('...', totalPages);
    }

    return pages;
  };

  const isPreviosButtonDisabled = currentPage === 1;
  const isNextButtonDisabled = currentPage === totalPages;
  const previosPage = currentPage === 2 ? null : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  return (
    <div className={styles.pagination}>
      <SearchLink
        className={classNames(
          'button button--small',
          isPreviosButtonDisabled ? 'button--disabled' : 'button--icon',
        )}
        disabled={isPreviosButtonDisabled}
        params={{ page: previosPage }}
        aria-label={
          isPreviosButtonDisabled ? 'It is the first page' : 'To previous page'
        }
      >
        <span
          className={classNames(
            'icon',
            'icon--rotate-180',
            isPreviosButtonDisabled
              ? 'icon--chevron-disabled'
              : 'icon--chevron-active',
          )}
        />
      </SearchLink>

      {getPageNumbers().map((page, index) => {
        const toPage = page === 1 ? null : page.toString();
        const isCurrentPage = currentPage === page;

        return page === '...' ? (
          <span className={styles.ellipsis} key={`ellipsis-${index}`}>
            ...
          </span>
        ) : (
          <SearchLink
            className={classNames(
              'button button--small',
              isCurrentPage ? 'button--filled' : 'button--text',
            )}
            params={{ page: toPage }}
            key={page}
            disabled={isCurrentPage}
            aria-label={
              isNextButtonDisabled ? 'It is the last page' : 'To next page'
            }
          >
            {page}
          </SearchLink>
        );
      })}

      <SearchLink
        className={classNames(
          'button button--small',
          isNextButtonDisabled ? 'button--disabled' : 'button--icon',
        )}
        disabled={isNextButtonDisabled}
        params={{ page: nextPage }}
      >
        <span
          className={classNames(
            'icon',
            isNextButtonDisabled
              ? 'icon--chevron-disabled'
              : 'icon--chevron-active',
          )}
        />
      </SearchLink>
    </div>
  );
};
