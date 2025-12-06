import { AccessoriesModel, PhoneModel } from '../../types/model';
import { useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.scss';
import cn from 'classnames';
import { useMemo } from 'react';
import ArrowLeft from '../../Icons/ChevronArrowLeft.svg?react';
import ArrowRight from '../../Icons/ChevronArrowRight.svg?react';

interface Props {
  items: PhoneModel[] | AccessoriesModel[];
  itemsQuantity: number;
  handleSetCurrentPage: (page: number) => void;
  handleSetNextPage: (page: number, pages: number[]) => void;
  handleSetPrevPage: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  items,
  itemsQuantity,
  handleSetCurrentPage,
  handleSetNextPage,
  handleSetPrevPage,
}) => {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || 1;
  const pages: number[] = useMemo(() => {
    const pagesArray = [];

    if (items) {
      for (let i = 1; i <= Math.ceil(items.length / itemsQuantity); i++) {
        pagesArray.push(i);
      }
    }

    return pagesArray;
  }, [itemsQuantity, items.length, items]);

  const finalPages = useMemo(() => {
    const pageNumber = Number(searchParams.get('page')) || 1;
    const totalPages = pages.length;

    if (totalPages <= 3) {
      return pages.slice(1, 3);
    }

    if (pageNumber <= 2) {
      return pages.slice(1, 4);
    }

    if (pageNumber >= totalPages - 1) {
      return pages.slice(totalPages - 3, totalPages);
    }

    const currentIndex = pageNumber - 1;

    return pages.slice(currentIndex - 1, currentIndex + 2);
  }, [pages, searchParams]);

  return (
    pages.length > 1 && (
      <div className={styles.pagination__wrapper}>
        <button
          className={`${styles.pagination__prev} ${styles.pagination__button}`}
          onClick={() => handleSetPrevPage(+currentPage)}
        >
          <ArrowLeft />
        </button>

        <div className={styles['page-selector__wrapper']}>
          <button
            className={cn(styles.pagination__button, {
              [styles['is-active']]: pages[0] === +currentPage,
            })}
            onClick={() => handleSetCurrentPage(pages[0])}
          >
            {pages[0]}
          </button>

          {+currentPage >= 4 && (
            <button className={styles.pagination__button}>...</button>
          )}

          {finalPages.map((page, index) => {
            return (
              <button
                className={cn(styles.pagination__button, {
                  [styles['is-active']]: page === +currentPage,
                })}
                key={index}
                onClick={() => handleSetCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}
        </div>
        <button
          className={`${styles.pagination__next} ${styles.pagination__button}`}
          onClick={() => handleSetNextPage(+currentPage, pages)}
        >
          <ArrowRight />
        </button>
      </div>
    )
  );
};
