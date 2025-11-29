import { AccessoriesModel, PhoneModel } from '../../types/model';
import { useSearchParams } from 'react-router-dom';
import './Pagination.scss';
import cn from 'classnames';
import { useMemo } from 'react';

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
    // Перетворюємо рядок 'page' на число.
    const pageNumber = Number(searchParams.get('page')) || 1;
    const totalPages = pages.length;

    // Випадок 1: Якщо сторінок 3 або менше, просто повертаємо всі сторінки
    if (totalPages <= 3) {
      return pages.slice(1, 3);
    }

    if (pageNumber <= 2) {
      // Відображаємо [1, 2, 3]
      return pages.slice(1, 4);
    }

    // Випадок 3: Поточна сторінка - одна з останніх двох (totalPages або totalPages - 1)
    if (pageNumber >= totalPages - 1) {
      // Відображаємо останні 3 сторінки
      return pages.slice(totalPages - 3, totalPages);
    }

    // Випадок 4: Поточна сторінка знаходиться посередині
    // Якщо currentPage = 5, index = 4. Нам потрібен діапазон [4, 5, 6]
    // slice(index - 1, index + 2) => slice(3, 6)
    const currentIndex = pageNumber - 1;

    return pages.slice(currentIndex - 1, currentIndex + 2);
  }, [pages, searchParams]); // Важливо додати searchParams як залежність

  return (
    pages.length > 1 && (
      <div className="pagination__wrapper">
        <button
          className="pagination__prev pagination__button"
          onClick={() => handleSetPrevPage(+currentPage)}
        >
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              // eslint-disable-next-line max-len
              d="M5.47149 0.528606C5.21114 0.268256 4.78903 0.268256 4.52868 0.528606L0.528677 4.52861C0.268327 4.78896 0.268327 5.21107 0.528677 5.47141L4.52868 9.47141C4.78903 9.73176 5.21114 9.73176 5.47149 9.47141C5.73184 9.21107 5.73184 8.78896 5.47149 8.52861L1.94289 5.00001L5.47149 1.47141C5.73184 1.21107 5.73184 0.788955 5.47149 0.528606Z"
              fill="#B4BDC4"
            />
          </svg>
        </button>

        <div className="page-selector__wrapper">
          <button
            className={cn('pagination__button', {
              'is-active': pages[0] === +currentPage,
            })}
            onClick={() => handleSetCurrentPage(pages[0])}
          >
            {pages[0]}
          </button>

          {+currentPage >= 4 && (
            <button className={cn('pagination__button')}>...</button>
          )}

          {finalPages.map((page, index) => {
            return (
              <button
                className={cn('pagination__button', {
                  'is-active': page === +currentPage,
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
          className="pagination__next pagination__button"
          onClick={() => handleSetNextPage(+currentPage, pages)}
        >
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              // eslint-disable-next-line max-len
              d="M0.528758 0.528606C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606L5.47157 4.52861C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141L1.47157 9.47141C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861L4.05735 5.00001L0.528758 1.47141C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z"
              fill="#B4BDC4"
            />
          </svg>
        </button>
      </div>
    )
  );
};
