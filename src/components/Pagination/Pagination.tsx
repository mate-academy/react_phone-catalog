import React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { getPage, getPerPage } from '../../store';
import { setPage } from '../../store/pagination';

type PaginationProps = {
  pageNumbers: any;
};

const Pagination: React.FC<PaginationProps> = ({ pageNumbers }) => {
  const dispatch = useDispatch();
  const page = useSelector(getPage);
  const perPage = useSelector(getPerPage);

  console.log(perPage, page);

  const handlePage = (event: number) => {
    dispatch(setPage(event));
  };

  return (
    <section className="pagination">
      <button
        type="button"
        className="pagination__button"
        aria-label="Previous"
      >
        <img src="img/arrow_left.svg" alt="arrow" />
      </button>
      <ul className="pagination__list">

        {[...Array(pageNumbers)].map((_, i: number) => (
          <li
            key={i}
            className="pagination__item"
          >
            <button
              type="button"
              className="pagination__button"
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
      >
        <img src="img/arrow_right.svg" alt="arrow" />
      </button>
    </section>
  );
};

export default Pagination;
