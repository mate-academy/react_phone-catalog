/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { NewParamsProps } from '../../types/NewParams';

type PaginationProps = {
  addParam: (newParams: NewParamsProps) => void;
  productsQuantity: number,
};

export const Pagination: React.FC<PaginationProps> = ({
  addParam,
  productsQuantity,
}) => {
  const [searchParams] = useSearchParams();
  const elementsPerPage = searchParams.get('perPage') || '4';
  const curPage = searchParams.get('page') || '1';

  const countingPages = () => Array.from({
    length: (Math.ceil(productsQuantity / +elementsPerPage)),
  }, (_, i) => i + 1);

  const setPages = (newPage: number | null = null) => {
    addParam({ page: newPage });
  };

  useEffect(() => {
    if (elementsPerPage === 'all') {
      setPages(0);
    }
  }, [elementsPerPage]);

  return (
    <>
      {
        elementsPerPage !== 'all' && (
          <div
            className="pagination"
            data-cy="pagination"
          >
            <button
              type="button"
              data-cy="paginationLeft"
              className="pagination__button"
              disabled={+curPage === 1}
              onClick={() => setPages(+curPage - 1)}
            />
            <div className="pagination__container">
              {countingPages().map(page => (
                <div
                  key={page}
                  className={classNames('pagination__page',
                    { 'pagination__page--active': page === +curPage })}
                  onClick={() => setPages(page)}
                >
                  {page}
                </div>
              ))}
            </div>
            <button
              type="button"
              data-cy="paginationRight"
              className="pagination__button pagination__button--right"
              disabled={+curPage === countingPages().length}
              onClick={() => setPages(+curPage + 1)}
            />
          </div>
        )
      }
    </>
  );
};
