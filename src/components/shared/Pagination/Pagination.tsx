import React from 'react';
import './Pagination.style.scss';
import { Button } from '../Buttons/Buttons';
import classNames from 'classnames';
import { SearchParams } from '../../../types/SearchParams';

type Props = {
  totalPages: number;
  visiblePages: number[];
  activePageNumber: number;
  firstVisiblePage: number;
  lastVisiblePage: number;
  handlePagination: (param: Partial<SearchParams>) => void;
}

export const Pagination: React.FC<Props> = ({
  totalPages,
  visiblePages,
  activePageNumber,
  firstVisiblePage,
  lastVisiblePage,
  handlePagination,
}) => {
  return (
    <div className="pagination">
      <Button
        direction={'back'}
        disabled={activePageNumber === 1}
        handleClick={() => {
          if (activePageNumber === firstVisiblePage) {
            handlePagination({
              firstVisiblePage: (firstVisiblePage - 1).toString(),
              activePageNumber: (activePageNumber - 1).toString(),
            });
          } else {
            handlePagination({
              activePageNumber: (activePageNumber - 1).toString(),
            });
          }
        }}
      />

      <div className="pagination__pages">
        {visiblePages.map(page => (
          <div
            key={page}
            className={classNames('pagination__page', {
              'pagination__page--active': activePageNumber === page,
            })}
            onClick={() =>
              handlePagination({ activePageNumber: page.toString() })
            }
          >
            <p className="pagination__page__content">{page}</p>
          </div>
        ))}
      </div>

      <Button
        direction={'forward'}
        disabled={activePageNumber === totalPages}
        handleClick={() => {
          if (activePageNumber === lastVisiblePage) {
            handlePagination({
              firstVisiblePage: (firstVisiblePage + 1).toString(),
              activePageNumber: (activePageNumber + 1).toString(),
            });
          } else {
            handlePagination({
              activePageNumber: (activePageNumber + 1).toString(),
            });
          }
        }}
      />
    </div>
  );
};
