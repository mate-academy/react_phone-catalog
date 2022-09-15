import React from 'react';

import classnames from 'classnames';
import './Pagination.scss';

type Props = {
  btn: number[],
  coutPage: number,
  page: number,
  pageChange: (num: number) => void,
};

export const Pagination: React.FC<Props> = ({
  btn,
  coutPage,
  page = 1,
  pageChange,
}) => {
  return (
    <div className="Pagination">
      <button
        type="button"
        disabled={page === 1}
        className="Pagination__btn Pagination__btn--arrow"
        onClick={() => pageChange(page - 1)}
      >
        <i className="icon-Chevron-Arrow-Left" />
      </button>
      <button
        type="button"
        hidden={page < 4}
        className="Pagination__btn"
        onClick={() => pageChange(1)}
      >
        ...
      </button>

      {btn.map((elem) => (
        <button
          type="button"
          key={elem}
          className={classnames('Pagination__btn', { 'Pagination__btn--active': page === elem })}
          hidden={
            elem !== page
            && elem !== page + 1
            && elem !== page + 2
            && elem !== page - 1
            && elem !== page - 2
          }
          onClick={() => pageChange(elem)}
        >
          {elem}
        </button>
      ))}
      <button
        type="button"
        className="Pagination__btn"
        hidden={page >= coutPage - 2}
        onClick={() => pageChange(coutPage)}
      >
        ...
      </button>
      <button
        type="button"
        className="Pagination__btn Pagination__btn--arrow"
        disabled={page === coutPage}
        onClick={() => pageChange(page + 1)}
      >
        <i className="icon-Chevron-Arrow-Right" />
      </button>
    </div>
  );
};
