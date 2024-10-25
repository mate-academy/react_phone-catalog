import React from 'react';
import cn from 'classnames';
import styles from './Pagination.module.scss';
import { RoundButton } from '../../../../components/RoundButton';
import { SvgIcon } from '../../../../components/SvgIcon';
import { scrollToTop } from '../../../../utils/utility';

interface Props {
  perPage: string;
  currentPage: number;
  total: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<Props> = ({
  perPage,
  currentPage,
  total,
  onPageChange,
  className,
}) => {
  const perPageNumber = perPage === 'all' ? total : Number(perPage);

  if (total <= perPageNumber) {
    return null;
  }

  const pages = Array.from(
    { length: Math.ceil(total / +perPage) },
    (_, i) => i + 1,
  );

  const isFirstPage = currentPage === 1;
  const isLastPage = pages.length === currentPage;

  const getMiddlePages = () => {
    const pagesCount = pages.length;

    if (currentPage <= 2) {
      return [2, 3, 4];
    }

    if (currentPage >= pagesCount - 2) {
      return [pagesCount - 3, pagesCount - 2, pagesCount - 1];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const PaginationItem = ({ page }: { page: number }) => {
    return (
      <div className={cn(styles.pagination__item)}>
        <RoundButton
          className={cn({
            [styles['pagination__btn--active']]: page === currentPage,
          })}
          onClick={() => {
            onPageChange(page);
            scrollToTop();
          }}
        >
          {page}
        </RoundButton>
      </div>
    );
  };

  const onClickPrevPage = () => {
    onPageChange(Math.max(currentPage - 1, 1));
    scrollToTop();
  };

  const onClickNextPage = () => {
    onPageChange(Math.max(currentPage + 1, 1));
    scrollToTop();
  };

  return (
    <div className={cn(styles.pagination, className)}>
      <div
        className={cn(
          styles.pagination__item,
          styles['pagination__item--prev'],
        )}
      >
        <RoundButton onClick={onClickPrevPage} disabled={isFirstPage}>
          <SvgIcon type="arrow" />
        </RoundButton>
      </div>

      <div className={styles.pagination__container}>
        {pages.length <= 5 ? (
          pages.map(page => <PaginationItem key={page} page={page} />)
        ) : (
          <>
            <PaginationItem page={1} />
            {currentPage > 3 && (
              <p key={'dots-left'} className={styles.pagination__dots}>
                ...
              </p>
            )}

            {getMiddlePages().map(page => {
              return <PaginationItem key={page} page={page} />;
            })}

            {currentPage < pages.length - 3 && (
              <p key={'dots-right'} className={styles.pagination__dots}>
                ...
              </p>
            )}
            <PaginationItem page={pages.length} />
          </>
        )}
      </div>

      <div
        className={cn(
          styles.pagination__item,
          styles['pagination__item--next'],
        )}
      >
        <RoundButton onClick={onClickNextPage} disabled={isLastPage}>
          <SvgIcon type="arrow" />
        </RoundButton>
      </div>
    </div>
  );
};
