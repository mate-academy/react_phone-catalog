import cn from 'clsx';
import type { FC } from 'react';

type Props = {
  page: string;
  className?: string;
};

export const PaginationButton: FC<Props> = ({ page, className }) => {
  return (
    <button className={cn('', className)}>
      {page}
    </button>
  );
};
