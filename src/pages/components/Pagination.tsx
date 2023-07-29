/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../../styles/styles.scss';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  phonesPepPege: number,
  totalPhones: number,
  onPaginate: (pagenumber: number) => void,
};

export const Pagination: React.FC<Props> = ({
  phonesPepPege, totalPhones, onPaginate,
}) => {
  const pageNumers: number[] = [];
  const [params] = useSearchParams();
  const page = params.get('page') || 1;

  for (let i = 1; i <= Math.ceil(totalPhones / phonesPepPege); i++) {
    pageNumers.push(i);
  }

  function handlePagination(number: number) {
    if (number < pageNumers[0] || number > pageNumers[pageNumers.length - 1]) {
      return;
    }

    onPaginate(number);
  }

  return (
    <>
      <ul className="pagination">
        <li
          className="pagination__items items"
          onClick={() => handlePagination(+page - 1)}
        >
          <img src="images/icons/ArrowLeft.svg" alt="" />
        </li>
        {pageNumers.map(number => (
          <li
            className={classNames(
              'pagination__items items',
              { 'pagination__items--isActive': +page === number },
            )}
            key={number}
            onClick={() => handlePagination(number)}
          >
            {number}
          </li>
        ))}
        <li
          className="pagination__items items"
          onClick={() => handlePagination(+page + 1)}
        >
          <img src="images/icons/ArrowRight.svg" alt="" />
        </li>
      </ul>
    </>
  );
};
