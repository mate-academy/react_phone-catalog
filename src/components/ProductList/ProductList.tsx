import './productList.scss';
import { useSearchParams } from 'react-router-dom';
import { useMemo, useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { getSortedProducts } from '../../helpers/getSortedProducts';
import { ProductSection } from '../../types/ProductSection';
import { Pagination } from '../Pagination/Pagination';
import { DropDown } from '../DropDown/DropDown';
import { filterProducts } from '../../helpers/filterProducts';
import { NoSearchResults } from '../NoSearchResults/NoSearchResults';
import { sortParam, itemsOnPage } from '../../types/SortTypes';

type Props = {
  products: Product[]
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || products.length;
  const start = currentPage * perPage - perPage;
  const end = Math.min(currentPage * perPage, products.length);
  const sortBy = searchParams.get('sortBy');

  const query = searchParams.get('query') || '';

  const [debounceQuery, setDebounceQuery] = useState(query);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebounceQuery(query);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const filteredProducts = useMemo(() => (
    filterProducts(products, debounceQuery)
  ), [products, debounceQuery]);

  const sortedProducts: Product[] = useMemo(() => (
    getSortedProducts(filteredProducts, sortBy)
  ), [filteredProducts, sortBy]);

  const visibleProducts = sortedProducts.slice(start, end);

  return (
    <div className="product-list">
      <p className="product-page__quantity-info">
        {`${sortedProducts.length} models`}
      </p>
      {!sortedProducts.length ? (
        <NoSearchResults />
      ) : (
        <div className="product-list__drop-downs">
          <div className="product-list__drop-down">
            <DropDown
              options={sortParam}
              label="Sort by"
              initialValue="Choose option"
              searchName="sortBy"
            />
          </div>

          <div className="phones-page__dropDown">
            <DropDown
              options={itemsOnPage}
              label="Items on page"
              initialValue="All"
              searchName="perPage"
            />
          </div>
        </div>
      )}

      <ul
        data-cy="productList"
        className="product-list__items"
      >
        {visibleProducts.map(product => {
          return (
            <li
              className="product-list__item"
              key={product.id}
            >
              <ProductCard
                title={ProductSection.HotPrice}
                product={product}
              />
            </li>
          );
        })}
      </ul>
      {(perPage < sortedProducts.length && filteredProducts.length > 0) && (
        <div className="product-list__pagination">
          <Pagination
            totalItems={sortedProducts.length}
            perPage={perPage}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};
