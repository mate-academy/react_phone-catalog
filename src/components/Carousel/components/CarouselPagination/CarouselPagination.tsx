import React from 'react';
import paginationStyles from './CarouselPagination.module.scss';
import classNames from 'classnames';

type Props = {
  categories: string[];
  onClick?: (index: number) => void;
  activeIndex: number;
};

export const CarouselPagination: React.FC<Props> = React.memo(
  ({ categories, onClick = () => {}, activeIndex }) => {
    return (
      <div className={classNames(paginationStyles.pagination)}>
        {categories.map((_, index) => (
          <button
            key={index}
            className={paginationStyles.pagination__button}
            onClick={() => onClick(index)}
          >
            <span
              className={classNames(
                paginationStyles.pagination__buttonContent,
                {
                  [paginationStyles['pagination__buttonContent--active']]:
                    activeIndex === index,
                },
              )}
            />
          </button>
        ))}
      </div>
    );
  },
);

CarouselPagination.displayName = 'CarouselPagination';
