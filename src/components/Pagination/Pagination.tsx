import React, { Dispatch, Fragment, SetStateAction } from 'react';
import cn from 'classnames';
import { v4 as getId } from 'uuid';

import './Pagination.scss';
import { ProductItem } from '../ProductItem/ProductItem';
import { Product } from '../../types/Product';

type Props = {
  productsLength: number
  itemsPerPage: number,
  currentPage: number,
  setCurrentPage: Dispatch<SetStateAction<number>>,
  products: Product[],
};

export const Pagination: React.FC<Props> = ({
  productsLength,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  products,
}) => {
  const pages = [];
  const lastPage = Math.ceil(productsLength / itemsPerPage);

  for (let i = 1; i <= lastPage; i += 1) {
    pages.push(i);
  }

  const handleNextClick = () => {
    setCurrentPage(i => {
      if (i >= lastPage) {
        return lastPage;
      }

      return i + 1;
    });
  };

  const handlePrevClick = () => {
    setCurrentPage(i => {
      if (i <= 1) {
        return 1;
      }

      return i - 1;
    });
  };

  return (
    <div className="pagination">
      <div className="pagination__list">
        {products.map(phone => (
          <Fragment key={getId()}>
            <ProductItem
              product={phone}
            />
          </Fragment>
        ))}
      </div>

      <div className="pagination__nav">
        <button
          type="button"
          className="button button__nav button--small"
          onClick={handlePrevClick}
        >
          <img src="img/icons/arrow-left.svg" alt="Arrow left" />
        </button>

        {pages.map(page => (
          <button
            key={getId()}
            type="button"
            className={cn(
              'button',
              'button__nav',
              'button--small',
              {
                'button__nav--active': currentPage === page,
              },
            )}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          className="button button__nav button--small"
          onClick={handleNextClick}
        >
          <img src="img/icons/arrow-right.svg" alt="Arrow right" />
        </button>
      </div>
    </div>
  );
};
