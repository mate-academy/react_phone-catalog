import {
  useState,
  useMemo,
  useEffect,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';

import './List.scss';
import { productFilter } from '../../../helpers/productFilter';
import { getSortedProducts } from '../../../helpers/getSortedProducts';
import { DropDown } from '../../DropDown';
import { itemsOnPage, sortParam } from '../../../types/SortTypes';
import { ProductCard } from '../Card';
import { ProductTitles } from '../../../types/ProductTitles';
import { Pagination } from '../../Pagination';
import { Product } from '../../../types/Product';

type Props = {
  products: Product[],
  isError: boolean,
  isLoading: boolean,
};

export const List: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  let perPageLength = Number(searchParams.get('perPage')) || 16;

  if (searchParams.get('perPage') === 'All') {
    perPageLength = products.length;
  }

  const startPage = (currentPage * perPageLength) - perPageLength;
  const endPage = Math.min(currentPage * perPageLength, products.length);

  const sortBy = searchParams.get('sortBy');

  const query = searchParams.get('query') || '';
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const filteredProducts = useMemo(() => (
    productFilter(products, debouncedQuery)
  ), [products, debouncedQuery]);

  const sortedProducts = useMemo(() => (
    getSortedProducts(filteredProducts, sortBy)
  ), [filteredProducts, sortBy]);

  const visibleProducts = sortedProducts.slice(startPage, endPage);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    if (!searchParams.get('page=1')) {
      searchParams.set('page', '1');
    }

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="product-list">
      <p className="product-list--quantity">
        {`${sortedProducts.length} models`}
      </p>

      {!sortedProducts.length ? (
        <h1 className="no-results">
          There are no products matching the current search criteria
        </h1>
      ) : (
        <div className="product-list__dropdowns">
          <div className="product-list__dropdowns--item">
            <DropDown
              label="Sort by"
              startValue="Choose option"
              searchName="sortBy"
              options={sortParam}
            />
          </div>

          <div className="product-list__dropdowns--item">
            <DropDown
              label="Items on page"
              startValue="16"
              searchName="perPage"
              options={itemsOnPage}
            />
          </div>
        </div>
      )}

      <ul className="product-list__list">
        <Fade duration={200} triggerOnce>
          {visibleProducts.map(currentProduct => (
            <li
              key={currentProduct.id}
              className="product-list--item"
            >
              <ProductCard
                title={ProductTitles.HotPrice}
                product={currentProduct}
              />
            </li>
          ))}
        </Fade>
      </ul>

      {(perPageLength < sortedProducts.length && filteredProducts.length > 0)
        && (
          <div className="product-list__pagination">
            <Pagination
              currentPage={currentPage}
              perPageLength={perPageLength}
              totalItems={sortedProducts.length}
            />
          </div>
        )}
    </div>
  );
};
