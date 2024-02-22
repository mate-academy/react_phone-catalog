/* eslint-disable jsx-a11y/control-has-associated-label */

import cn from 'classnames';
import './PagePagination.scss';
import { Icon } from '../Icon';
import { FilterType } from '../../types';

export type Props = {
  productsCount: number,
  currentPage: number,
  setCurrentPageValue: (page: number) => void,
  filterValue: FilterType,
};

const getPages = (
  productsCount: number,
  filterValue: FilterType,
) => (
  Array.from(
    { length: +filterValue ? Math.ceil(productsCount / +filterValue) : 1 },
    (_, i) => i + 1,
  )
);

export const PagePagination: React.FC<Props> = ({
  productsCount,
  currentPage,
  setCurrentPageValue,
  filterValue,
}) => {
  const pages = getPages(productsCount, filterValue);
  const isPrevButtonDisabled = currentPage <= 1;
  const isNextButtonDisabled = currentPage >= pages.length;

  const handleSelectPage = (page: number) => {
    setCurrentPageValue(page);
  };

  const handlePrevClick = () => {
    if (currentPage <= 1) {
      return;
    }

    setCurrentPageValue(currentPage - 1);
  };

  const handleNextClick = () => {
    if (isNextButtonDisabled) {
      return;
    }

    setCurrentPageValue(currentPage + 1);
  };

  return (
    <div className="page-pagination" data-cy="pagination">
      <button
        type="button"
        className={cn(
          'page-pagination__button',
          'page-pagination__arrow-button',
          { 'page-pagination__arrow-button--disabled': isPrevButtonDisabled },
        )}
        onClick={() => handlePrevClick()}
      >
        <Icon
          iconName="arrowLeft"
        />
      </button>

      <ul className="page-pagination__buttons-list">
        {pages.map(page => (
          <li key={page}>
            <button
              type="button"
              key={page}
              className={cn(
                'page-pagination__button',
                'page-pagination__page-button',
                {
                  'page-pagination__page-button--active': page === currentPage,
                },
              )}
              data-cy="paginationLeft"
              onClick={() => handleSelectPage(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={cn(
          'page-pagination__button',
          'page-pagination__arrow-button',
          { 'page-pagination__arrow-button--disabled': isNextButtonDisabled },
        )}
        data-cy="paginationRight"
        onClick={() => handleNextClick()}
      >
        <Icon
          iconName="arrowRight"
        />
      </button>
    </div>
  );
};
