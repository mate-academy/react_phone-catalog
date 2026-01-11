import cn from 'clsx';
import type { FC } from 'react';
import ArrowLeft from '/src/assets/icons/arrow-left.svg?react';
import ArrowRight from '/src/assets/icons/arrow-right.svg?react';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-10 flex justify-center items-center gap-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={cn(
          'flex justify-center items-center size-8 shadow-inner transition',
          {
            'shadow-icons hover:shadow-primary': currentPage !== 1,
            'shadow-elements': currentPage === 1,
          },
        )}
      >
        <ArrowLeft
          className={cn('size-4', {
            'fill-primary': currentPage !== 1,
            'fill-icons': currentPage === 1,
          })}
        />
      </button>

      <ol className="flex justify-center items-center gap-2">
        {pages.map(page => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={cn(
                'flex justify-center items-center size-8 shadow-inner text-body transition',
                {
                  'bg-white shadow-elements text-primary hover:shadow-primary':
                    page !== currentPage,
                  'bg-primary shadow-primary text-white ': page === currentPage,
                },
              )}
            >
              {page}
            </button>
          </li>
        ))}
      </ol>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(
          'flex justify-center items-center size-8 shadow-inner transition',
          {
            'shadow-icons hover:shadow-primary': currentPage !== totalPages,
            'shadow-elements': currentPage === totalPages,
          },
        )}
      >
        <ArrowRight
          className={cn('size-4', {
            'fill-primary': currentPage !== totalPages,
            'fill-icons': currentPage === totalPages,
          })}
        />
      </button>
    </div>
  );
};
