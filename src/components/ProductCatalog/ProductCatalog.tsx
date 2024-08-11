/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import { getSearchWith } from '../../services/getSearchWith'; // Import the utility function
import './ProductCatalog.scss';
import '../../styles/utils/typography.scss';
import '../../styles/button.scss';

type Props = {
  products: Product[];
};

export const ProductCatalog: React.FC<Props> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOption = searchParams.get('sortOption') || 'Newest';
  const itemsOnPage = searchParams.get('itemsOnPage') || '4';
  const currentPage = Number(searchParams.get('currentPage')) || 1;

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(
      getSearchWith(
        {
          sortOption:
            event.target.value === 'Newest' ? null : event.target.value,
          currentPage: null,
        },
        searchParams,
      ),
    );
  };

  const handleItemsOnPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    console.log('Items on page selected:', value);

    setSearchParams(
      getSearchWith(
        {
          itemsOnPage: value === '1' ? '0' : value,
          currentPage: null,
        },
        searchParams,
      ),
    );
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams(
      getSearchWith(
        {
          currentPage: newPage === 1 ? null : newPage.toString(),
        },
        searchParams,
      ),
    );
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case 'Newest':
        return b.year - a.year;
      case 'Alphabetically':
        return a.name.localeCompare(b.name);
      case 'Cheapest':
        return a.price - b.price;
      default:
        return 0;
    }
  });

  const totalItems = sortedProducts.length;

  console.log('Total items:', totalItems);

  const itemsPerPage = parseInt(itemsOnPage, 10) === 0 ? totalItems : parseInt(itemsOnPage, 10);

  console.log('Items per page:', itemsPerPage);

  const totalPages = itemsPerPage > 0 ? Math.ceil(totalItems / itemsPerPage) : 1;

  const totalPagesArray = Array.from({ length: totalPages }, (_, index) => index);

  const handlePrevButton = () => {
    if (currentPage > 1) {
      setSearchParams(getSearchWith({ currentPage: `${currentPage - 1}` }, searchParams));
    }
  };

  const handleNextButton = () => {
    if (currentPage < totalPages) {
      setSearchParams(getSearchWith({ currentPage: `${currentPage + 1}` }, searchParams));
    }
  };

  const displayedPages = (() => {
    if (currentPage === 1) {
      return totalPagesArray.slice(0, 4);
    }

    if (currentPage > totalPagesArray.length - 3) {
      return totalPagesArray.slice(totalPagesArray.length - 4);
    }

    return totalPagesArray.slice(currentPage - 2, currentPage + 2);
  })();

  const displayedProducts = itemsPerPage > 0 ? sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  ) : sortedProducts;

  console.log('Displayed products:', displayedProducts.length);

  return (
    <div className="catalog">
      <div className="catalog__controls">
        <div className="catalog__controls__box">
          <p className="small-text">Sort by</p>
          <select
            name="sort_options"
            className="catalog__dropdown paragraph"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option className="catalog__dropdown__options" value="Newest">
              Newest
            </option>
            <option
              className="catalog__dropdown__options"
              value="Alphabetically"
            >
              Alphabetically
            </option>
            <option className="catalog__dropdown__options" value="Cheapest">
              Cheapest
            </option>
          </select>
        </div>
        <div className="catalog__controls__box">
          <p className="small-text">Items on page</p>
          <select
            name="items_on_page"
            className="catalog__dropdown small-text"
            value={itemsOnPage}
            onChange={handleItemsOnPage}
          >
            <option className="catalog__dropdown__options" value={4}>
              4
            </option>
            <option className="catalog__dropdown__options" value={8}>
              8
            </option>
            <option className="catalog__dropdown__options" value={16}>
              16
            </option>
            <option className="catalog__dropdown__options" value={0}>
              All
            </option>
          </select>
        </div>
      </div>

      <div className="catalog__list">
        {displayedProducts.map(product => (
          <div className="catalog__item" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="catalog__pagination">
          <button
            type="button"
            className="prevButton button catalog__pagination__button"
            disabled={currentPage === 1}
            onClick={handlePrevButton}
          />
          <div className="catalog__pagination__list">
            {displayedPages.map(pageIndex => (
              <button
                key={pageIndex + 1}
                onClick={() => handlePageChange(pageIndex + 1)}
                className={classNames('button', 'catalog__pagination__button', {
                  'catalog__pagination__button--active':
                    currentPage === pageIndex + 1,
                })}
              >
                {pageIndex + 1}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="nextButton button catalog__pagination__button"
            disabled={currentPage === totalPagesArray.length}
            onClick={handleNextButton}
          />
        </div>
      )}
    </div>
  );
};
