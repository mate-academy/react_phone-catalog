import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { sortProducts } from '../../helpers/utils/sortProducts';
import { Product } from '../../helpers/types/Product';
import { ProductsCard } from '../ProductsCard';
import { Pagination } from '../Pagination';
import './ProductsList.scss';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'age';
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || 'all';

  const sortedProducts = useMemo(
    () => sortProducts(products, sort), [products, sort],
  );

  useEffect(() => {
    if (perPage !== 'all') {
      const fromItem = (+page - 1) * +perPage + 1;
      const toItem = Math.min(+page * +perPage, products.length);

      setVisibleProducts(sortedProducts.slice(fromItem - 1, toItem));
    } else {
      setVisibleProducts([...sortedProducts]);
    }
  }, [sortedProducts, page, perPage]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sort', event.target.value);
    setSearchParams(searchParams);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('perPage', event.target.value);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  return (
    <div className="ProductsList">
      <div className="ProductsList__selections">
        <div className="ProductsList__select">
          <label
            htmlFor="sortBy"
            className="ProductsList__select-label"
          >
            Sort by
          </label>
          <select
            name="sortBy"
            id="sortBy"
            value={sort}
            onChange={handleSortChange}
            className="ProductsList__select-field"
          >
            <option value="age">Newest</option>
            <option value="name">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
          <img
            src="img/icons/vector_icon_gray.svg"
            alt="Vector icon gray"
            className="ProductsList__select-arrow"
          />
        </div>

        <div className="ProductsList__select ProductsList__select--narrow">
          <label
            htmlFor="perPage"
            className="ProductsList__select-label"
          >
            Items on page
          </label>
          <select
            name="perPage"
            id="perPage"
            className="ProductsList__select-field"
            value={perPage}
            onChange={handlePerPageChange}
          >
            <option value="all">All</option>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
          </select>
          <img
            src="img/icons/vector_icon_gray.svg"
            alt="Vector icon gray"
            className="ProductsList__select-arrow"
          />
        </div>
      </div>

      <ul className="ProductsList__content" data-cy="productList">
        {visibleProducts.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </ul>

      {products.length > 4 && (
        <Pagination totalItems={products.length} />
      )}
    </div>
  );
};
