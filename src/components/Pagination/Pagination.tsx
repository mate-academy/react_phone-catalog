import { Product } from '../../types';
import { getArrayItems, getPages } from '../../utils/paginationUtils';

type PageChangeEvent =
  | React.ChangeEvent<HTMLSelectElement>
  | React.MouseEvent<HTMLAnchorElement>;

interface PaginationProps {
  total: Product[];
  perPage: number;
  currentPage: number;
  onPageChange: (event: PageChangeEvent) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const newItems = getArrayItems(items, perPage);
  const buttons = getPages(newItems);

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            data-action="prev"
            aria-disabled={currentPage === buttons[0]}
            data-value={currentPage - 1}
            onClick={event => {
              if (currentPage > 1) {
                onPageChange(event);
              }
            }}
          >
            «
          </a>
        </li>
        {buttons.map((button: number, index: number) => (
          <li
            className={`page-item ${button === currentPage ? 'active' : ''}`}
            key={index}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${button}`}
              data-value={button}
              onClick={onPageChange}
            >
              {button}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === buttons.length ? 'disabled' : ''
          }`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            data-action="next"
            aria-disabled={currentPage === buttons.length}
            data-value={currentPage + 1}
            onClick={currentPage !== buttons.length ? onPageChange : undefined}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {total.map((item: Product, index: number) => (
          <li data-cy="item" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
