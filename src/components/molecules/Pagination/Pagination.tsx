import cn from 'classnames';
import { ICONS } from '../../../constants/icons';
import { Icon } from '../../atoms/Icon/Icon';
import { Typography } from '../../atoms/Typography/Typography';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

const arrowButtonClass =
  'flex h-8 w-5 sm:w-6 items-center justify-center rounded-sm border border-elements bg-white hover:border-primary hover:bg-elements hover-zoom-small dark:bg-surface-2-dark dark:hover:bg-elements';

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  if (totalPages <= 1) {
    return null;
  }

  let pageItems: PageItem[];

  if (totalPages <= 5) {
    pageItems = Array.from({ length: totalPages }, (_, index) => index + 1);
  } else if (currentPage <= 3) {
    pageItems = [1, 2, 3, 4, 'end-ellipsis', totalPages];
  } else if (currentPage >= totalPages - 2) {
    pageItems = [
      1,
      'start-ellipsis',
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  } else {
    pageItems = [
      1,
      'start-ellipsis',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      'end-ellipsis',
      totalPages,
    ];
  }
  return (
    <nav
      aria-label="Pagination"
      className="mx-auto grid w-full max-w-95 grid-cols-[20px_1fr_20px] items-center gap-2 sm:grid-cols-[24px_1fr_24px]"
    >
      {currentPage > 1 ?
        <button
          type="button"
          aria-label="Previous page"
          className={arrowButtonClass}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <Icon
            src={ICONS.ARROW.LEFT}
            className="size-4"
          />
        </button>
      : <span aria-hidden="true" />}

      <div className="flex justify-center gap-1 sm:gap-2">
        {pageItems.map((item) => {
          if (typeof item !== 'number') {
            return (
              <span
                key={item}
                aria-hidden="true"
                className="flex h-8 w-4 sm:w-8 items-center justify-center"
              >
                ...
              </span>
            );
          }
          const isCurrentPage = item === currentPage;

          return (
            <button
              key={item}
              type="button"
              aria-current={isCurrentPage ? 'page' : undefined}
              className={cn(
                'flex h-8 items-center justify-center border text-center rounded-sm hover-zoom-small',
                isCurrentPage ?
                  'w-8 border-primary bg-primary text-white dark:bg-accent-dark'
                : 'w-7 sm:w-8 border-elements text-black hover:border-primary hover:bg-elements dark:bg-surface-1-dark dark:text-white dark:hover:bg-elements',
              )}
              onClick={() => onPageChange(item)}
            >
              <Typography
                level="body"
                className="inherit"
              >
                {item}
              </Typography>
            </button>
          );
        })}
      </div>

      {currentPage < totalPages ?
        <button
          type="button"
          aria-label="Next page"
          className={arrowButtonClass}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <Icon
            src={ICONS.ARROW.RIGHT}
            className="size-4"
          />
        </button>
      : <span aria-hidden="true" />}
    </nav>
  );
};
