import { useCallback } from 'react';
import cn from 'classnames';
import { Button } from '../Button';
import { getNumbers } from '../../helpers/helpers';
import './pagination.scss';
import { PageList } from '../PageList';

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
  const pageNumbers = getNumbers(pageAmount);

  const handlePrevClick = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage]);

  const handleNextClick = useCallback(() => {
    if (currentPage <= total) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage]);

  if (currentPage === 0 || pageAmount < 2) {
    return null;
  }

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', { disabled: currentPage === 1 })}
      >
        <Button
          width="32px"
          height="32px"
          disabled={currentPage === 1}
          handler={handlePrevClick}
        >
          <img src="./img/icons/arrowLeft.svg" alt="prev" />
        </Button>
      </li>

      <PageList
        pages={pageNumbers}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <Button
        width="32px"
        height="32px"
        disabled={currentPage === pageAmount}
        handler={handleNextClick}
      >
        <img src="./img/icons/arrowRight.svg" alt="next" />
      </Button>
    </ul>
  );
};
