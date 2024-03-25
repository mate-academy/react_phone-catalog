import classNames from 'classnames';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import style from './Pagination.module.scss';

type Props = {
  total: number;
  perPage: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  page,
  setPage,
}) => {
  const maxPage = Math.ceil(total / +perPage);

  const pages = () => {
    const arr: number[] = [];

    for (let i = 1; i <= maxPage; i += 1) {
      arr.push(i);
    }

    return (
      <>
        {arr.map(pageNum => (
          <button
            key={pageNum}
            className={classNames(style.pagination__button_page, {
              [style.pagination__button_active]: +page === +pageNum,
            })}
            type="button"
            aria-label="pagination"
            onClick={() => setPage(+pageNum)}
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

  return (
    <div className="pagination" data-cy="pagination">
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
  );
};
