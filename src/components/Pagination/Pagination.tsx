/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/comma-dangle */
import { useState, useEffect, useCallback, useMemo } from 'react';
import cn from 'classnames';
import { SetURLSearchParams } from 'react-router-dom';
import { getNumbers } from '../../helpers/getNumbers';

interface Props {
  total: number;
  perPage: string;
  currentPage: number;
  productsLength: number;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  productsLength,
  searchParams,
  setSearchParams,
}) => {
  const [isPaginationHide, setIsPaginationHide] = useState(false);
  const [startValue, setStartValue] = useState(1);
  const [endValue, setEndValue] = useState(5);

  useEffect(() => {
    if (perPage === 'all' || productsLength <= +perPage) {
      setIsPaginationHide(true);
    } else {
      setIsPaginationHide(false);
    }
  }, [productsLength, perPage]);

  const getPageNumbers = useMemo(() => {
    const firstThree = [1, 2, 3];
    const lastThree = [total - 2, total - 1, total];

    switch (true) {
      case firstThree.includes(currentPage):
        setStartValue(1);
        setEndValue(5);
        break;
      case lastThree.includes(currentPage):
        setStartValue(total - 4);
        setEndValue(total);
        break;
      default:
        setStartValue(currentPage - 2);
        setEndValue(currentPage + 2);
    }

    return getNumbers(startValue, endValue);
  }, [total, currentPage, startValue, endValue]);

  const onPageChange = useCallback(
    (pageNumber: number) => {
      const params = new URLSearchParams(searchParams);

      params.set('page', pageNumber.toString());
      setSearchParams(params);
    },
    [searchParams]
  );

  return (
    <section
      className={cn('section pagination', {
        'pagination--hide': isPaginationHide,
      })}
    >
      <div className="section__container">
        <ul className="pagination__items">
          <li className="pagination__item pagination__item--prev">
            <button
              type="button"
              className={cn('arrow-btn pagination__link', {
                'arrow-btn--disabled': currentPage === 1,
              })}
              onClick={() => onPageChange(currentPage - 1)}
            >
              <img
                className="like-btn__icon"
                src={
                  currentPage === 1
                    ? './img/arrow_left_disabled.svg'
                    : './img/arrow_left.svg'
                }
                alt="arrow-btn"
                loading="lazy"
              />
            </button>
          </li>
          {getPageNumbers.map((number) => (
            <li className="pagination__item" key={number}>
              <button
                type="button"
                className={cn('pagination__link', {
                  'pagination__link--active': currentPage === number,
                })}
                onClick={() => onPageChange(number)}
              >
                {number}
              </button>
            </li>
          ))}
          <li className="pagination__item pagination__item--next">
            <button
              type="button"
              className={cn('arrow-btn pagination__link', {
                'arrow-btn--disabled': currentPage === total,
              })}
              onClick={() => onPageChange(currentPage + 1)}
            >
              <img
                className="like-btn__icon"
                src={
                  currentPage === total
                    ? './img/arrow_right_disabled.svg'
                    : './img/arrow_right.svg'
                }
                alt="arrow-btn"
                loading="lazy"
              />
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};
