import React, { useMemo } from 'react';
import './Paginaation.scss';
import classNames from 'classnames';

type Props = {
  pageNumbers: number[];
  paginate: (n: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  isPageActive: number | undefined;
};

export const Pagination: React.FC<Props> = ({
  pageNumbers,
  paginate,
  nextPage,
  previousPage,
  isPageActive,
}) => {
  const visiblePages = 7;

  const visibleNumbers = useMemo(() => {
    if (pageNumbers.length <= visiblePages) {
      return pageNumbers;
    }

    let start = 0;
    let end = visiblePages;

    if (isPageActive && isPageActive <= 4) {
      start = 0;
      end = visiblePages;
    } else if (isPageActive && isPageActive >= pageNumbers.length - 3) {
      start = pageNumbers.length - visiblePages;
      end = pageNumbers.length;
    } else if (isPageActive) {
      start = isPageActive - 4;
      end = isPageActive + 3;
    }

    return pageNumbers.slice(start, end);
  }, [pageNumbers, isPageActive]);

  return (
    <div className="catalog__pagination-buttons">
      <img
        src="img/ui-kit/Slider-button-small-right.png"
        alt="slider-button"
        className="slider-products__slide-icon--left"
        onClick={previousPage}
      />

      <div className="catalog__pagination-number-buttons">
        {visibleNumbers.map(number => (
          <div
            className={classNames('catalog__pagination-number-button', {
              'pagination-active': isPageActive === number,
            })}
            key={number}
            onClick={() => paginate(number)}
          >
            {number}
          </div>
        ))}
      </div>

      <img
        src="img/ui-kit/Slider-button-small-right.png"
        alt="slider-button"
        className="slider-products__slide-icon"
        onClick={nextPage}
      />
    </div>
  );
};
