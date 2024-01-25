import { useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import './styles.scss';

import { getPreperedProducts } from '../../libs/helpers';
import {
  BreadCrumbs, Dropdown, Pagination, ProductsList,
} from '../../libs/components';
import { AppRoutes, SearchParams } from '../../libs/enums';
import { ProductType, SearchParamsType } from '../../libs/types';
import { usePagination } from '../../libs/hooks';
import { NoSearchResults } from './components/NoSearchResults';
import { NoProducts } from './components/NoProducts';
import { NoFavorites } from './components/NoFavorites';

type Props = React.HTMLProps<HTMLElement> & {
  products: ProductType[],
  pageTitle: string,
};

export const Products: React.FC<Props> = ({ products, pageTitle, ...rest }) => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const productsQty = products.length;

  const preperedProducts = useMemo(() => {
    const params: SearchParamsType = Object.fromEntries(searchParams.entries());

    return getPreperedProducts(products, params);
  }, [products, searchParams]);

  const preperedProductsQty = preperedProducts.length;
  const hasQuery = searchParams.has(SearchParams.QUERY);
  const qtyUnits = hasQuery ? 'results' : 'models';
  const noProducts = pathname === AppRoutes.FAVORITES
    ? <NoFavorites />
    : <NoProducts />;
  const noResult = hasQuery ? <NoSearchResults /> : noProducts;

  const {
    currentPage,
    pages,
    isShowPagination,
    showedItems,
  } = usePagination(preperedProducts);

  return (
    <main className="products-page" {...rest}>
      <div className="products-page__container">
        <BreadCrumbs />

        <div className="products-page__top">
          <h1>{pageTitle}</h1>
          <div className="products-page__qty">
            {`${preperedProductsQty} ${qtyUnits}`}
          </div>
        </div>

        {preperedProductsQty && productsQty ? (
          <div className="products-page__content">
            <div className="products-page__filters">
              <Dropdown
                className="products-page__filters-sort"
                label="Sort by"
                fields={SearchParams.SORT}
              />

              <Dropdown
                className="products-page__filters-per-page"
                label="Items on page"
                fields={SearchParams.PER_PAGE}
              />
            </div>

            <ProductsList products={showedItems} />

            {isShowPagination && (
              <Pagination
                className="products-page__pagination"
                currentPage={currentPage}
                pages={pages}
              />
            )}
          </div>
        ) : (
          noResult
        )}
      </div>
    </main>
  );
};
