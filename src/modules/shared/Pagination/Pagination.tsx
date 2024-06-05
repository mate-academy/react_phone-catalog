import cn from 'classnames';
import Button from '../../../UI/Buttons/Button';
import s from './Pagination.module.css';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  let startPage = Math.max(currentPage - 4, 1);
  let endPage = Math.min(currentPage + 5, totalPages);

  if (endPage - startPage < 9) {
    if (currentPage < 5) {
      endPage = Math.min(startPage + 9, totalPages);
    } else {
      startPage = Math.max(endPage - 9, 1);
    }
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className={s.pagination}>
      <li
        onClick={handlePrevPage}
        className={cn('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <Button
          variant="pagination"
          size={[32, 32]}
          disabled={currentPage === 1}
        >
          <img src="img/icons/arrow-left-dark-icon.svg" alt="" />
        </Button>
      </li>

      {pages.map(page => (
        <li onClick={() => onPageChange(page)} key={page}>
          <Button
            variant="pagination"
            isSelected={currentPage === page}
            size={[32, 32]}
          >
            {page}
          </Button>
        </li>
      ))}

      <li
        onClick={handleNextPage}
        className={cn('page-item', {
          disabled: currentPage === totalPages,
        })}
      >
        <Button
          variant="pagination"
          size={[32, 32]}
          disabled={currentPage === totalPages}
        >
          <img src="img/icons/arrow-right-dark-icon.svg" alt="" />
        </Button>
      </li>
    </ul>
  );
};
