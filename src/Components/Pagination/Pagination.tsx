import React, { useState } from 'react';
import './Paginaation.scss';
import classNames from 'classnames';

type Props = {
  pageNumbers: number[];
  paginate: (n: number) => void;
  previousPage: () => void;
  nextPage: () => void;
};

export const Pagination: React.FC<Props> = ({
  pageNumbers,
  paginate,
  nextPage,
  previousPage,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="catalog__pagination-buttons">
      <img
        src="/img/ui-kit/Slider-button-small-right.png"
        alt="slider-button"
        className="slider-products__slide-icon--left"
        onClick={previousPage}
      ></img>

      <div className="catalog__pagination-number-buttons">
        {pageNumbers.map(number => (
          <div
            className={classNames('catalog__pagination-number-button', {
              // "pagination-active" : isActive,
            })}
            key={number}
            onClick={() => {
              setIsActive(!isActive);
              paginate(number);
            }}
          >
            {number}
          </div>
        ))}
      </div>

      <img
        src="/img/ui-kit/Slider-button-small-right.png"
        alt="slider-button"
        className="slider-products__slide-icon"
        onClick={nextPage}
      ></img>
    </div>
  );
};
