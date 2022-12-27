import classNames from 'classnames';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from 'src/utils/helpers/searchHelper';

type Props = {
  pageNumbers: number[],
  currentPage: number,
};

export const PaginationNumbers: FC<Props> = ({
  pageNumbers,
  currentPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOnClick = (current: number) => {
    setSearchParams(
      getSearchWith(searchParams, { page: `${current}` || null }),
    );
  };

  return (
    <>
      {pageNumbers.map(pageNumber => {
        return (
          <button
            key={pageNumber}
            type="button"
            className={classNames(
              'pagination__page-number',
              { 'pagination__page-number--active': currentPage === pageNumber },
            )}
            onClick={() => handleOnClick(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}

    </>
  );
};
