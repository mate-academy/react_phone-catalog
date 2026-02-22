import cn from 'clsx';
import type { FC } from 'react';

interface Props {
  className?: string;
}

export const Search: FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="text-small text-secondary dark:text-d-secondary">
        Search
      </span>

      <input
        placeholder="Search..."
        className="text-buttons text-primary dark:text-d-white dark:bg-d-surface2 dark:hover:shadow-d-icons hover:shadow-secondary shadow-elements flex h-10 cursor-pointer items-center justify-between bg-white px-3 shadow-inner transition dark:shadow-transparent"
      />
    </div>
  );
};
