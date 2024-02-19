import './Pagination.scss';
import cn from 'classnames';

interface Props {
  itemsPerPage: number,
  totalItems: number
  currentPage: number,
  onClick: (pageNumber: number) => void,
}

export const Pagination: React.FC<Props> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  onClick,
}) => {
  const numberOfPages = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
    numberOfPages.push(i);
  }

  const cantMoveLeft = currentPage <= 1;
  const cantMoveRight = currentPage >= numberOfPages[numberOfPages.length - 1];

  return (
    <ul className="pagination">
      <li>
        <button
          type="button"
          className="pagination__page"
          onClick={() => onClick(currentPage - 1)}
          disabled={cantMoveLeft}
        >
          {'<'}
        </button>
      </li>
      {numberOfPages.map(numberOfPage => (
        <li key={numberOfPage}>
          <button
            className={cn('pagination__page', {
              'pagination__page-active': numberOfPage === currentPage,
            })}
            type="button"
            onClick={() => onClick(numberOfPage)}
          >
            {numberOfPage}
          </button>
        </li>
      ))}
      <li>
        <button
          type="button"
          className="pagination__page"
          onClick={() => onClick(currentPage + 1)}
          disabled={cantMoveRight}
        >
          {'>'}
        </button>
      </li>
    </ul>
  );
};
