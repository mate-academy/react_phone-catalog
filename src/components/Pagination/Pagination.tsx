/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useMemo,
  useEffect,
} from 'react';
import ClassNames from 'classnames';
import { nanoid } from 'nanoid';
import { paginationView } from '../../functions/paginationView';
import { ReactComponent as Arrow } from '../../icons/small-arrow.svg';

import './pagination.scss';

type Props = {
  total: number,
  perPage: number,
  page: number,
  onPageChange: (num: number) => void,
  nextPage: () => void,
  prevPage: () => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  page,
  perPage,
  onPageChange,
  nextPage,
  prevPage,
}) => {
  const [prevActive, setPrevActive] = useState(true);
  const [nextActive, setNextActive] = useState(true);

  const maxPage = Math.ceil(total / perPage);

  useEffect(() => {
    if (page === 1) {
      setPrevActive(false);
    } else {
      setPrevActive(true);
    }

    if (page === maxPage) {
      setNextActive(false);
    } else {
      setNextActive(true);
    }
  }, [page]);

  const prevPageHandler = () => {
    if (page - 1 > 0) {
      prevPage();
    }
  };

  const nextPageHandler = () => {
    if (page < maxPage) {
      nextPage();
    }
  };

  const pages = useMemo(() => {
    return paginationView(page, total, perPage);
  }, [total, page, perPage]);

  return (
    <div className="pagination">
      <button
        type="button"
        className="prev-btn"
        onClick={prevPageHandler}
        disabled={!prevActive}
      >
        <Arrow />
      </button>

      <ul className="pagination__list">
        {pages.map((item: any) => (
          <li key={nanoid()}>
            <button
              type="button"
              className={ClassNames(
                'item',
                { item_active: item === page },
              )}
              onClick={() => onPageChange(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="next-btn"
        onClick={nextPageHandler}
        disabled={!nextActive}
      >
        <Arrow />
      </button>
    </div>
  );
};
