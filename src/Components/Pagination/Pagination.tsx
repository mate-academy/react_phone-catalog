import './Pagination.scss';
import classNames from 'classnames';
import { DOTS, usePagination } from './usePagination';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/getSearchWith';
import { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';

type Props = {
  total: number[];
};

export const Pagination: React.FC<Props> = ({ total }) => {
  const { onPageChange } = useContext(ProductContext);
  const totalItems = total.length;

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +(searchParams.get('page') || 1);
  const itemsOnPage = searchParams.get('perPage') || 'all';

  function setSearchWith(params: any) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const paginationRange = usePagination({
    totalItems,
    itemsOnPage,
    siblingCount: 1,
  });

  const onNext = () => {
    window.scrollTo(0, 0);
    onPageChange(currentPage + 1, totalItems);
    setSearchWith({ page: (currentPage + 1).toString() });
  };

  const onPrevious = () => {
    window.scrollTo(0, 0);
    onPageChange(currentPage - 1, totalItems);
    setSearchWith({ page: (currentPage - 1).toString() });
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className="pagination">
      <li
        className={classNames('pagination__item pagination__prev', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="pagination__icon pagination__icon--left" />
      </li>
      <div className="pagination__container">
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li className="pagination__item disabled" key={`dots-${index}`}>
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={pageNumber}
              className={classNames('pagination__item', {
                'pagination__item--is-active': pageNumber === currentPage,
              })}
              onClick={() => {
                window.scrollTo(0, 0);
                setSearchWith({ page: pageNumber.toString() });
                onPageChange(+currentPage, totalItems);
              }}
            >
              {pageNumber}
            </li>
          );
        })}
      </div>
      <li
        className={classNames('pagination__next pagination__item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="pagination__icon pagination__icon--right" />
      </li>
    </ul>
  );
};
