import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../helpers/types/Product';
import { Dropdown } from '../Dropdown/Dropdown';
import { sortOptions } from '../../helpers/types/sortOptions';
import { perPageOptions } from '../../helpers/types/perPageOptions';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductsCardType } from '../../helpers/types/ProductsCardType';
import { Pagination } from '../Pagination/Pagination';
import { useAppSelector } from '../../helpers/hooks/hooks';
import { getQueryProducts } from '../../helpers/funcService/getQueryProducts';
import { getPageProducts } from '../../helpers/funcService/getPageProducts';
import './ProductsList.scss';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();

  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = searchParams.get('page') || '1';

  const { query } = useAppSelector(state => state.products);

  const prepearedProducts = useMemo(() => {
    return getQueryProducts(products, query);
  }, [products, query]);

  const showPagination = useMemo(() => (
    perPage !== 'all' && prepearedProducts.length / +perPage > 1
  ), [perPage, prepearedProducts]);

  const currentProducts: Product[] = useMemo(() => {
    return getPageProducts(prepearedProducts, perPage, currentPage);
  }, [prepearedProducts, perPage, currentPage]);

  return (
    <div className="productsList section" data-cy="productList">
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

      {/* {prepearedProducts.length === 0 && <NoSearchResults />} */}

      <ul className="productsList__list">
        {currentProducts.map(product => (
          <li key={product.id}>
            <ProductCard
              product={product}
              type={ProductsCardType.DISCOUNT}
            />
          </li>
        ))}
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
