/* eslint-disable react/button-has-type */
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getPreparitionProducts }
  from '../../helpers/getFunctions/getPreparitionProducts';
import { ProductsList } from '../ProductsList';
import { NoResult } from '../NoResult';
import { FilterPanel } from '../FilterPanel';
import { ProductsHeader } from '../ProductsHeader';
import { PageControl } from '../PageControl';

import './ProductsCatalog.scss';

type Props = {
  products: Product[],
  title: string,
};

export const ProductsCatalog: React.FC<Props> = ({ products, title }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const itemsNumber = searchParams.get('itemsOnPage') || '16';

  const sortedProducts = getPreparitionProducts(products, searchParams);

  const start = (+page - 1) * (+itemsNumber) || 0;
  const end = (+page - 1) * (+itemsNumber) + (+itemsNumber) || products.length;

  const visibleProducts = sortedProducts.slice(start, end);

  const countPages = Math.ceil(sortedProducts.length / +itemsNumber)
    || false;

  return (
    <section className="products-catalog">
      <div className="container">
        <div className="products-catalog__content">
          <div className="products-catalog__header">
            <ProductsHeader
              title={title}
              length={products.length}
            />
          </div>

          {visibleProducts.length ? (
            <>
              <FilterPanel />

              <ProductsList
                products={visibleProducts}
                data-cy="productList"
              />

              {
                (countPages && countPages !== 1) && (
                  <PageControl length={sortedProducts.length} />
                )
              }
            </>
          ) : (
            <NoResult message="There are no products on this page" />
          )}
        </div>
      </div>
    </section>
  );
};
