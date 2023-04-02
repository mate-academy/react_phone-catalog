import cn from 'classnames';
import { Button } from '../Button';
import { getPages } from '../../helpers/helpers';
import './pagination.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total, perPage, onPageChange, currentPage,
}) => {
  const pageAmount = Math.ceil(total / perPage);
  const pageNumbers = getPages(pageAmount);

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', { disabled: currentPage === 1 })}
        >
          <Button
            width="32px"
            height="32px"
            disabled={currentPage === 1}
            handler={() => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            <img src="./img/icons/arrowLeft.svg" alt="prev" />
          </Button>
        </li>

        {pageNumbers.map(page => (
          <li
            key={page}
            className={cn(
              'page-item ',
              { 'pagination__button--active': page === currentPage },
            )}
          >
            <Button
              width="32px"
              height="32px"
              type={page === currentPage ? 'button--page' : ''}
              handler={() => onPageChange(page)}
            >
              {page}
            </Button>
          </li>
        ))}

        <Button
          width="32px"
          height="32px"
          disabled={currentPage === pageAmount}
          handler={() => {
            if (currentPage <= total) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          <img src="./img/icons/arrowRight.svg" alt="next" />
        </Button>
      </ul>
    </>
  );
};
