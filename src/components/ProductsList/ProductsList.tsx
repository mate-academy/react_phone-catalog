import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../ProductCard';
import { Pagination } from '../Pagination';
import { ProductsCardType } from '../../types/ProductsCardType';
import { Product } from '../../types/Product';
import { getPageProducts } from '../../utils/helpers/getPageProducts';
import './ProductsList.scss';
import { useAppSelector } from '../../utils/hooks/hooks';
import { NoSearchResults } from '../NoSearchResults';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || 'all';
  const { query } = useAppSelector(state => state.products);

  const prepearedProducts = useMemo(() => (
    products.filter(product => product.name
      .toLowerCase()
      .includes(query.toLowerCase()))
  ), [products, query]);

  const showPagination = useMemo(() => (
    perPage !== 'all' && prepearedProducts.length / +perPage > 1
  ), [perPage, prepearedProducts]);

  const currentProducts: Product[] = useMemo(() => {
    return getPageProducts(prepearedProducts, perPage, currentPage);
  }, [products, perPage, currentPage, query]);

  return (
    <div className="productsList section" data-cy="productList">
      {prepearedProducts.length === 0 && <NoSearchResults />}
      <ul className="productsList__list">
        {currentProducts.map((product) => {
          return (
            <li key={product.id} className="productsList__item">
              <ProductCard product={product} type={ProductsCardType.DISCOUNT} />
            </li>
          );
        })}
      </ul>

      {showPagination && (
        <Pagination
          totalItems={prepearedProducts.length}
          currentPage={+currentPage}
          perPage={+perPage}
        />
      )}
    </div>
  );
};
