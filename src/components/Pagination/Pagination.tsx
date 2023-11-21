import { FC, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Pagination.scss';
import { PaginationSideButton }
  from '../PaginationSideButton/PaginationSideButton';
import { PaginationButton } from '../PaginationButton/PaginationButton';

interface Props {
  total: number;
  perPage: string;
  handlePageChange: (par: string) => void;
  page: string;
}

export const Pagination: FC<Props> = ({
  total,
  perPage,
  handlePageChange,
  page,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const amountOfButtons = useMemo(() => {
    return Math.ceil(total / +perPage);
  }, [total, perPage]);

  const buttonsNames = useMemo(() => {
    const res = [];

    for (let i = 1; i <= amountOfButtons; i += 1) {
      res.push(i);
    }

    return res;
  }, [amountOfButtons]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if ((+perPage === 16 && +page > 0) || (+perPage === 8 && +page > 2)) {
      params.delete('page');
      setSearchParams(params.toString());
    }
  }, [perPage, page]);

  return (
    <div className="pagination">
      {amountOfButtons > 1 && (
        <>
          <PaginationSideButton
            page={page}
            handlePageChange={handlePageChange}
            amountOfButtons={amountOfButtons}
          >
            {'<'}
          </PaginationSideButton>
          {buttonsNames.map((name: number) => (
            <PaginationButton
              page={page}
              handlePageChange={handlePageChange}
            >
              {name}
            </PaginationButton>
          ))}
          <PaginationSideButton
            page={page}
            handlePageChange={handlePageChange}
            amountOfButtons={amountOfButtons}
          >
            {'>'}
          </PaginationSideButton>
        </>
      )}
    </div>
  );
};
