import cn from 'classnames';
import {
  ArrowButton,
  ArrowButtonDirection,
  ArrowButtonOrigin,
} from '../../HomePage/ArrowButton';
import cl from './Pagination.module.scss';

type Props = {
  totalPages: number;
  currentPage: number;
  onArrowLeftClick: () => void;
  onPageClick: (ev: React.MouseEvent<HTMLLIElement>) => void;
  onArrowRightClick: () => void;
  className?: string;
};

export const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  onArrowLeftClick,
  onPageClick,
  onArrowRightClick,
  className,
}) => {
  function getVisiblePages(current: number, total: number) {
    const pages = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 2) {
        pages.push(1, 2, 3, '...', total);
      } else if (current >= total - 1) {
        pages.push(1, '...', total - 2, total - 1, total);
      } else {
        pages.push(1, '...', current - 1, current, current + 1, '...', total);
      }
    }

    return pages;
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className={`${cl.pagination} ${className}`}>
      <ArrowButton
        direction={ArrowButtonDirection.LEFT}
        onClick={onArrowLeftClick}
        origin={ArrowButtonOrigin.ONLIST}
        disabled={currentPage === 1}
        className={cl.arrowRight}
      />

      <ol className={cl.pagesList}>
        {visiblePages.map((page, index) => (
          <li
            key={index}
            className={cn(cl.pagesList__page, {
              [cl.pagesList__page_active]: currentPage === page,
            })}
            // change page on click only if page cell isn't '...'
            onClick={page === '...' ? () => {} : onPageClick}
          >
            {page}
          </li>
        ))}
      </ol>

      <ArrowButton
        direction={ArrowButtonDirection.RIGHT}
        onClick={onArrowRightClick}
        origin={ArrowButtonOrigin.ONLIST}
        disabled={currentPage === totalPages}
        className={cl.arrowRight}
      />
    </div>
  );
};
