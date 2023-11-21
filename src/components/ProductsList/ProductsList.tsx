import { useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../ProductCard';
import { Pagination } from '../Pagination';
import { NoSearchResults } from '../NoSearchResults';
import { Dropdown } from '../Dropdown';
import { ProductsCardType } from '../../types/ProductsCardType';
import { Product } from '../../types/Product';
import { getPageProducts } from '../../utils/helpers/getPageProducts';
import { useAppSelector } from '../../utils/hooks/hooks';
import { sortOptions } from '../../utils/helpers/sortOptions';
import { perPageOptions } from '../../utils/helpers/perPageOtions';
import { getQueryProducts } from '../../utils/helpers/getQueryProducts';
import './ProductsList.scss';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || 'all';
  const { pathname } = useLocation();
  const showOptions = !pathname.includes('favorites');
  const { query } = useAppSelector(state => state.products);

  const prepearedProducts = useMemo(() => {
    return getQueryProducts(products, query);
  }, [products, query]);

  const showPagination = useMemo(() => (
    perPage !== 'all' && prepearedProducts.length / +perPage > 1
  ), [perPage, prepearedProducts]);

  const currentProducts: Product[] = useMemo(() => {
    return getPageProducts(prepearedProducts, perPage, currentPage);
  }, [products, perPage, currentPage, query]);

  return (
    <div className="productsList section" data-cy="productList">
      <p className="productsList__count">{`${prepearedProducts.length} models`}</p>

      {showOptions && (
        <div className="productsList__options">
          <div className="productsList__options-option">
            <p className="productsList__options-title">Sort by</p>
            <Dropdown params="sort" items={sortOptions} />
          </div>

          <div className="productsList__options-option">
            <p className="productsList__options-title">Items on page</p>
            <Dropdown params="perPage" items={perPageOptions} />
          </div>
        </div>
      )}

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
