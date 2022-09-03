import React, {
  useEffect,
  useState,
} from 'react';
import './Pagination.scss';

type Props = {
  total: number;
  itemsPerPage: number;
  setCurrentPage: (arg: number) => void;
  currentPage: number,
};

export const Pagination: React.FC<Props> = (
  {
    total,
    itemsPerPage = 16,
    setCurrentPage,
    currentPage,
  },
) => {
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const last = Math.ceil(total / itemsPerPage);

  const paginate = (currPage: number, lastPage: number) => {
    const result = [];

    for (
      let i = Math.max(2, (currPage - 1));
      i <= Math.min((lastPage - 1), (currPage + 1));
      i += 1
    ) {
      result.push(i);
    }

    if ((currPage - 1) > 2) {
      result.unshift('...');
    }

    if ((currPage + 1) < (lastPage - 1)) {
      result.push('...');
    }

    result.unshift(1);
    if (lastPage !== 1) {
      result.push(lastPage);
    }

    return result.map((value, index) => ({
      value,
      id: index + 1,
    }));
  };

  const currentPagination = paginate(currentPage, last);

  useEffect(() => {
    if (currentPage === currentPagination[currentPagination.length - 1].value) {
      setIsNextDisabled(true);
    } else {
      setIsNextDisabled(false);
    }

    if (currentPage > 1) {
      setIsPrevDisabled(false);
    } else {
      setIsPrevDisabled(true);
    }
  }, [itemsPerPage]);

  return (
    <div data-cy="pagination" className="pagination">
      <div className="pagination__buttons">
        <button
          data-cy="paginationLeft"
          type="button"
          onClick={() => {
            if (currentPage !== 1) {
              setIsNextDisabled(false);
              setIsPrevDisabled(false);
              setCurrentPage(currentPage - 1);
            } else {
              setIsPrevDisabled(true);
            }
          }}
          disabled={isPrevDisabled}
          className="pagination__buttonarrow pagination__buttonarrow--prev"
        >
          {' '}
        </button>

        <div className="pagination__buttons-pages">

          {currentPagination.map(item => {
            if (item.value === '...') {
              return (
                <p
                  key={item.id}
                  className="pagination__buttons-dots"
                >
                  {item.value}
                </p>
              );
            }

            return (
              <button
                data-cy="paginationRight"
                key={item.id}
                type="button"
                onClick={() => {
                  setCurrentPage(+item.value);
                  if (item.value === 1) {
                    setIsPrevDisabled(true);
                  } else {
                    setIsPrevDisabled(false);
                  }

                  if (item.value === last) {
                    setIsNextDisabled(true);
                  } else {
                    setIsNextDisabled(false);
                  }
                }}
                className={currentPage === +item.value
                  ? 'pagination__button pagination__button--selected'
                  : 'pagination__button'}
              >
                {item.value}
              </button>
            );
          })}
        </div>

        <button
          id="button-next"
          type="button"
          onClick={() => {
            if (currentPage !== last) {
              setIsNextDisabled(false);
              setIsPrevDisabled(false);
              setCurrentPage(currentPage + 1);
            } else {
              setIsNextDisabled(true);
            }
          }}
          disabled={isNextDisabled}
          className="pagination__buttonarrow pagination__buttonarrow--next"
        >
          {' '}
        </button>
      </div>
    </div>
  );
};
