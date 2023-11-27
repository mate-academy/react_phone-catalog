import React from 'react';
import classnames from 'classnames';
import { Button } from '../Button';

type Props = {
  pages: number[];
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
};

export const PageList: React.FC<Props> = ({
  pages,
  currentPage,
  onPageChange,
}) => {
  return (
    <>
      {pages.map(page => (
        <li
          key={page}
          className={classnames(
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
    </>
  );
};
