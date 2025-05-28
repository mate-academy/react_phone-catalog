import { FC, useContext, useMemo } from 'react';
import './Pagination.scss';
import { Icon } from '../Icon';
import { icons } from '../../../constants/iconsObject';
import classNames from 'classnames';
import { GlobalContext } from '../../../context/GlobalContext';

const PAGE_LIMIT = 4;

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const { theme } = useContext(GlobalContext);

  const totalPages = useMemo(
    () => Math.ceil(total / perPage),
    [perPage, total],
  );

  const [startPage, endPage] = useMemo(() => {
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 2);

    if (end - start + 1 < PAGE_LIMIT) {
      if (start === 1) {
        end = Math.min(totalPages, start + PAGE_LIMIT - 1);
      } else {
        start = Math.max(1, end - PAGE_LIMIT + 1);
      }
    }

    return [start, end];
  }, [currentPage, totalPages]);

  return (
    <div className="pagination">
      <button
        className={classNames('pagination__button', {
          'pagination__button--disabled': currentPage === 1,
        })}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {currentPage === 1 ? (
          <Icon icon={icons.arrow_left__disabled[theme]} />
        ) : (
          <Icon icon={icons.arrow_left[theme]} />
        )}
      </button>
      <div className="pagination__button-container">
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            className={classNames('pagination__button-page', {
              'pagination__button-page--active':
                currentPage === startPage + index,
            })}
            onClick={() => onPageChange(startPage + index)}
          >
            {startPage + index}
          </button>
        ))}
      </div>
      <button
        className={classNames('pagination__button', {
          'pagination__button--disabled': currentPage === totalPages,
        })}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {currentPage === totalPages ? (
          <Icon icon={icons.arrow_right__disabled[theme]} />
        ) : (
          <Icon icon={icons.arrow_right[theme]} />
        )}
      </button>
    </div>
  );
};
