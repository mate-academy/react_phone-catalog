import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from '../../icons';

import './Pagination.scss';

type Props = {
  currentPage: number;
  onPageChange: (value: number) => void;
  itemPerPage: number;
  totalItems: number;
};

export function getTotalNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const Pagination: FC<Props> = ({
  currentPage,
  totalItems,
  onPageChange,
  itemPerPage,
}) => {
  const totalPages = Math.ceil(totalItems / +itemPerPage);
  const pageNumbers = getTotalNumbers(1, totalPages);
  const location = useLocation();

  const initialPosition = parseInt(
    localStorage.getItem('paginationPosition') || '0',
    10,
  );
  const [position, setPosition] = useState(initialPosition);

  console.log(initialPosition);

  const itemWidth = 40;
  const frameSize = 4;
  const minPosition = 0;
  const maxPosition = pageNumbers.length - frameSize;

  const showNextButton = () => {
    // setPosition(prev => Math.min(prev + 1, maxPosition));
    const newPosition = Math.min(position + 1, maxPosition);

    setPosition(newPosition);
    localStorage.setItem('paginationPosition', newPosition.toString());
  };

  const showPrevButton = () => {
    const newPosition = Math.max(position - 1, minPosition);

    setPosition(newPosition);
    // setPosition(prev => Math.max(prev - 1, minPosition));
    localStorage.setItem('paginationPosition', newPosition.toString());
  };

  const handleChangePrev = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    onPageChange(currentPage - 1);
    showPrevButton();
  };

  const handleChangeNext = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    onPageChange(currentPage + 1);
    showNextButton();
  };

  const handleChangePage = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    number: number,
  ) => {
    e.preventDefault();
    onPageChange(number);
    if (number > currentPage) {
      showNextButton();
    } else {
      showPrevButton();
    }
  };

  useEffect(() => {
    localStorage.removeItem('paginationPosition');
  }, [location.pathname]);

  return (
    <>
      <ul className="pagination" data-cy="pagination">
        <>
          <li
            className="pagination__item pagination__item--left"
          >
            <Link
              className={cn(
                'pagination__link',
                { disabled: currentPage <= 1 },
              )}
              data-cy="paginationLeft"
              to={`${currentPage}`}
              onClick={(e) => handleChangePrev(e)}
            >
              {currentPage <= 1 ? (
                <ArrowLeft color="#b4bdc3" />
              ) : (
                <ArrowLeft />
              )}
            </Link>
          </li>
          <ul className="pagination__list">
            {pageNumbers.map(number => (
              <li
                key={number}
                className="pagination__item"
                style={{ transform: `translateX(${-(position * itemWidth)}px)` }}
              >
                <Link
                  className={cn(
                    'pagination__link',
                    { pagination__active: currentPage === number },
                  )}
                  to={`${number}`}
                  onClick={(e) => handleChangePage(e, number)}
                >
                  {number}
                </Link>
              </li>
            ))}
          </ul>
          <li
            className="pagination__item pagination__item--rigth"
          >
            <Link
              className={cn(
                'pagination__link',
                { pagination__disabled: currentPage === totalPages },
              )}
              data-cy="paginationRight"
              to={`${currentPage + 1}`}
              onClick={(e) => handleChangeNext(e)}
            >
              {currentPage === totalPages ? (
                <ArrowRight color="#b4bdc3" />
              ) : (
                <ArrowRight />
              )}
            </Link>
          </li>
        </>
      </ul>
    </>
  );
};
