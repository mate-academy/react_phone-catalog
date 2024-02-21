/* eslint-disable max-len */
import { useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../helpers/hooks/hooks';
import { Product } from '../../helpers/types/Product';
import { getQueryProducts } from '../../helpers/functionService/getQueryProducts';
import { getPageProducts } from '../../helpers/functionService/getPageProducts';
import { Dropdown } from '../Dropdown/Dropdown';
import { sortOptions } from '../../helpers/functionService/sortOptions';
import { perPageOptions } from '../../helpers/functionService/perPageOptions';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductsCardType } from '../../helpers/types/ProductsCardType';
import './ProductsList.scss';
import { Pagination } from '../Pagination/Pagination';

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

      {prepearedProducts.length === 0
        && (<h2 className="productsList__not-found">There are no products matching the query</h2>)}

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
