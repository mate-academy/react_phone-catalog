import classNames from 'classnames';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';

import style from './Pagination.module.scss';

type Props = {
  total: number;
  perPage: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  itemsOnPage: string;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  page,
  setPage,
  itemsOnPage,
}) => {
  const maxPage = Math.ceil(total / +perPage);

  const getPagesRange = () => {
    const range = 3;
    const start = Math.max(1, page - range);
    const end = Math.min(maxPage, page + range);

    return Array.from({length: end - start + 1}, (_, i) => start + i);
  };

  const pages = () => {
    const range = getPagesRange();

    return (
      <>
        {range.map(pageNum => (
          <button
            key={pageNum}
            className={classNames(style.pagination__button_page, {
              [style.pagination__button_active]: +page === pageNum,
            })}
            type="button"
            aria-label="pagination"
            onClick={() => setPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </>
    );
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage(prevPage => prevPage - 1);
  };

  return itemsOnPage !== 'All' ? (
    <div className={style.pagination} data-cy="pagination">
      <button
        className={style.pagination__button}
        type="button"
        aria-label="pagination"
        onClick={handlePrevPage}
        data-cy="paginationLeft"
        disabled={page === 1}
      >
        <IoIosArrowBack />
      </button>
      {pages()}
      <button
        className={style.pagination__button}
        type="button"
        aria-label="pagination"
        onClick={handleNextPage}
        data-cy="paginationRight"
        disabled={maxPage === page}
      >
        <IoIosArrowForward />
      </button>
    </div>
  ) : null;
};
