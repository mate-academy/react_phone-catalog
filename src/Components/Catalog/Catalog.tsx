import './Catalog.scss';

import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../Types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { SortType } from '../../Types/SortType';
import { updateSeachParams } from '../../Helpers/updateSearchParams';

type Props = {
  products: Product[],
  perPage: string,
  total: number,
  sortBy: string,
  page: string,
};

export const Catalog: React.FC<Props> = ({
  products, perPage, total, sortBy, page,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSearchParams(updateSeachParams(searchParams, { perPage: value }));
  };

  const onSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSearchParams(updateSeachParams(searchParams, { sortBy: value }));
  };

  const productStat = +perPage * (+page - 1) + 1;
  let productEnd = 0;

  if (productStat + +perPage > total) {
    productEnd = total;
  } else {
    productEnd = +perPage * +page;
  }

  let preparetedProducts = [...products];

  const preparetedVisibleProducts = () => {
    preparetedProducts = preparetedProducts.sort((a, b): any => {
      switch (sortBy) {
        case SortType.CHEAPEST:
          return a[sortBy] - b[sortBy];

        case SortType.NEWEST:
          return b[sortBy] - a[sortBy];

        case SortType.ALPHABETICALLY:
          return a[sortBy].localeCompare(b[sortBy]);

        default:
          return true;
      }
    });

    return preparetedProducts;
  };

  useEffect(() => {
    preparetedVisibleProducts();
  });

  const visibleProducts = preparetedVisibleProducts();

  const productsPerPage = (
    [...visibleProducts].slice(productStat - 1, productEnd)
  );

  return (
    <section className="catalog">
      <form method="post" className="catalog__form">
        <div className="catalog__form-wrapper">
          <label htmlFor="perPage" className="catalog__form-item">
            <span className="catalog__form-type">items on page</span>

            <select
              name="itemsPerPage"
              id="perPage"
              className="catalog__form-select"
              value={perPage}
              onChange={(event) => onPerPageChange(event)}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value={total}>All</option>
            </select>
          </label>

          <label htmlFor="perPage" className="catalog__form-item">
            <span className="catalog__form-type">Sort by</span>

            <select
              name="itemsPerPage"
              id="perPage"
              className="catalog__form-select"
              value={sortBy}
              onChange={onSortByChange}
            >
              <option value="year">Newest</option>
              <option value="name">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
          </label>
        </div>
      </form>

      <div className="catalog__container" data-cy="productList">
        {productsPerPage.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};
