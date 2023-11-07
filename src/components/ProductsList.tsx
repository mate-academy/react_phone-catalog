import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import { Pagination } from './Pagination';
import { getPageProducts } from '../utils/helpers/getPageProducts';
import { ProductsCardType } from '../types/ProductsCardType';
import { Product } from '../types/Product';
import '../styles/blocks/ProductsList.scss';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || 'all';

  const currentProducts: Product[] = useMemo(() => {
    return getPageProducts(products, perPage, currentPage);
  }, [products, perPage, currentPage]);

  return (
    <div className="productsList section" data-cy="productList">
      <ul className="productsList__list">
        {currentProducts.map((product) => {
          return (
            <li key={product.id} className="productsList__item">
              <ProductCard product={product} type={ProductsCardType.DISCOUNT} />
            </li>
          );
        })}
      </ul>

      {perPage !== 'all' && (
        <Pagination
          totalItems={products.length}
          currentPage={+currentPage}
          perPage={+perPage}
        />
      )}
    </div>
  );
};
