import './ProductList.scss';

import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getSortedProducts } from '../../helpers/getSortedProducts';

import { Product } from '../../types/Product';

import { Picker } from '../Picker';
import { ProductItem } from '../ProductItem';
import { Pagination } from '../Pagination';

type Props = {
  products: Product[],
};

export const ProductList: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || products.length;
  const start = currentPage * perPage - perPage;
  const end = Math.min(currentPage * perPage, products.length);
  const sortBy = searchParams.get('sortBy');

  const sortValues = ['Newest', 'Alphabetically', 'Price'];
  const itemsPageValues = ['4', '8', '16', 'All'];

  const sortedProducts: Product[] = useMemo(() => (
    getSortedProducts(
      products,
      sortBy,
    )
  ), [products, sortBy]);

  const visibleProducts = sortedProducts.slice(start, end);

  return (
    <>
      <div className="product-list">
        <div className="product-list__content">
          <div className="product-list__pickers">
            <div className="product-list__picker">
              <Picker
                options={sortValues}
                label="Sort by"
                startValue="Choose an option"
                searchParamsKey="sortBy"
              />
            </div>

            <div className="product-list__picker">
              <Picker
                options={itemsPageValues}
                label="Items on page"
                startValue="All"
                searchParamsKey="perPage"
              />
            </div>
          </div>

          <ul
            className="product-list__product-items"
            data-cy="productList"
          >
            {visibleProducts.map(product => (
              <ProductItem
                key={product.itemId}
                product={product}
              />
            ))}
          </ul>

          {(perPage < products.length) && (
            <div className="product-list__pagination">
              <Pagination
                total={products.length}
                perPage={perPage}
                currentPage={currentPage}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
