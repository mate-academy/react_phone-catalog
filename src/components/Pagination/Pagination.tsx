import { useEffect, useState } from 'react';
import classNames from 'classnames';
import './Pagination.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowButton } from '../Buttons/arrowButton/arrowButton';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  total: number,
  perPage: number,
  currPage: number,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const list = Math.ceil(total / perPage);

  const сurrentVisiblePages = [];

  useEffect(() => {
    if (currPage) {
      setCurrentPage(currPage);
    }
  }, [currPage]);

  if (list <= 1) {
    return null;
  }

  if (currPage > list) {
    setSearchParams({
      page: '1',
    });
  }

  for (let i = 1; i <= list; i += 1) {
    сurrentVisiblePages.push(i);
  }

  const leftHandler = () => {
    setCurrentPage(prev => prev - 1);
  };

  const rightHandler = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="pagination">
      <ArrowButton direction="left" handler={leftHandler} />

      <ul className="pagination__list">
        {сurrentVisiblePages.map(number => (
          <li
            key={number}
            className={classNames('pagination__item', {
              active: currentPage === number,
            })}
          >
            <Link
              to={{
                search: getSearchWith(searchParams, { page: `${number}` }),
              }}
              className={classNames('pagination__link', {
                active: currentPage === number,
              })}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>

      <ArrowButton direction="right" handler={rightHandler} />
    </div>
  );
};
