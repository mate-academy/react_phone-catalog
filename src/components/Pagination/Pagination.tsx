import { FC } from 'react';
import classNames from 'classnames';
import { ArrowLeft } from '../../assets/icons/ArrowLeft';
import { ArrowRight } from '../../assets/icons/ArrowRight';
import './Pagination.scss';
import { SearchParam } from '../../types/SearchParams';

type Props = {
  pagesCount: number;
  currentPage: number;
  onPageChange: (param: SearchParam, value: string) => void
};

export const Pagination: FC<Props> = ({
  pagesCount,
  currentPage,
  onPageChange,
}) => {
  const pages = Array.from(Array(pagesCount + 1).keys()).slice(1);

  const handlePrevClick = () => {
    const page = currentPage - 1;

    if (page > 0) {
      onPageChange('page', `${page}`);
    }
  };

  const handleNextClick = () => {
    const page = currentPage + 1;

    if (page && page <= pages.length) {
      onPageChange('page', `${page}`);
    }
  };

  return (
    <div
      className="pagination"
      data-cy="pagination"
    >
      <button
        type="button"
        data-cy="paginationLeft"
        className="pagination-nav"
        onClick={handlePrevClick}
      >
        <ArrowLeft />
      </button>

      <div className="pagination-pages">
        {pages.map(page => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange('page', `${page}`)}
            className={classNames({
              pagination__active: currentPage === page,
            }, 'pagination-page')}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        data-cy="paginationRight"
        className="pagination-nav"
        onClick={handleNextClick}
      >
        <ArrowRight />
      </button>
    </div>
  );
};
