import { ArrowDirections } from '../../../../helpers/enums/ArrowDirections';
import { Arrow } from '../../../Arrow';
import { Page } from './Page';

type PaginationProps = {
  total: number
  perPage: number
  currentPage?: number
  onPageChange: (page: number) => void
};

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: PaginationProps) => {
  const pages = [1];

  for (let p = 2; p <= Math.ceil(total / perPage); p += 1) {
    pages.push(p);
  }

  return (
    <div className="products__pagination pagination" data-cy="pagination">
      <Arrow
        direction={ArrowDirections.left}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        dataCy="paginationLeft"
      />

      <ul className="pagination__pages">
        {pages.map(page => (
          <li key={Date.now() + page}>
            <Page
              pageNumber={page}
              isSelected={page === currentPage}
              onClick={onPageChange}
            />
          </li>
        ))}
      </ul>

      <Arrow
        direction={ArrowDirections.right}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pages.length}
        dataCy="paginationRight"
      />
    </div>
  );
};

Pagination.defaultProps = {
  currentPage: 1,
};
