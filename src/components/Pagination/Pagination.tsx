import React from 'react';
import cn from 'classnames';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getPage } from '../../store';
import { setPage } from '../../store/pagination';

type PaginationProps = {
  pageNumbers: any;
};

const Pagination: React.FC<PaginationProps> = ({ pageNumbers }) => {
  const dispatch = useDispatch();
  const page = useSelector(getPage);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const handlePage = (event: number) => {
    searchParams.set('page', event.toString());

    history.push({
      search: searchParams.toString(),
    });
    dispatch(setPage(+event));
  };

  return (
    <section className="pagination">
      <button
        type="button"
        className="pagination__button"
        aria-label="Previous"
        onClick={() => handlePage(page - 1)}
        disabled={page === 1}
      >
        {
          (page === 1)
            ? <img src="img/arrow_left.svg" alt="arrow" />
            : <img src="img/arrow_left_dark.svg" alt="arrow" />
        }
      </button>
      <ul className="pagination__list">
        {[...Array(pageNumbers)].map((_, i: number) => (
          <li
            key={i}
            className="pagination__item"
          >
            <button
              type="button"
              className={cn('pagination__button', {
                'pagination__button-active': page === (i + 1),
              })}
              onClick={() => handlePage(i + 1)}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="pagination__button"
        aria-label="Next"
        onClick={() => handlePage(page + 1)}
        disabled={page === pageNumbers}
      >
        {
          (page === pageNumbers)
            ? <img src="img/arrow_right.svg" alt="arrow" />
            : <img src="img/arrow_right_dark.svg" alt="arrow" />
        }
      </button>
    </section>
  );
};

export default Pagination;
