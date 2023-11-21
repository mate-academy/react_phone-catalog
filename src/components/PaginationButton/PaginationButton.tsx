import { FC } from 'react';
import './PaginationButton.scss';
import cn from 'classnames';

interface Props {
  children: number;
  handlePageChange: (par: string) => void;
  page: string;
}

export const PaginationButton: FC<Props> = ({
  children,
  handlePageChange,
  page,
}) => {
  return (
    <button
      onClick={() => handlePageChange(String(children))}
      type="button"
      className={cn('pagination-button', {
        'pagination-button-black': +page === children,
      })}
    >
      {children}
    </button>
  );
};
