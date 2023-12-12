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

type Props = {
  products: Product[],
  title: string,
};

export const ProductsCatalog: React.FC<Props> = ({ products, title }) => {
  const [searchParams] = useSearchParams();

  const itemsNumber = searchParams.get('itemsOnPage') || '16';
  const countPages = Math.ceil(products.length / +itemsNumber)
    || false;

  const visibleProducts = getPreparitionProducts(products, searchParams);

  return (
    <div className="products-catalog">
      <div className="products-catalog__header">
        <ProductsHeader
          title={title}
          length={products.length}
        />
      </div>

      {products.length ? (
        <>
          <FilterPanel />

          <ProductsList
            products={visibleProducts}
            data-cy="productList"
          />

          {
            countPages && (
              <PageControl length={products.length} />
            )
          }
        </>
      ) : (
        <NoResult message="There are no products on this page" />
      )}
    </div>
  );
};
