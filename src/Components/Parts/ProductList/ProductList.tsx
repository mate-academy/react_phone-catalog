import { FC } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Product } from '../../../types/Product';
import { useAppContext } from '../../../context/AppContext';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { sortProducts } from '../../helpers/sortProducts';
import { NotResults } from '../NotResults/NotResults';
import { Dropdowns } from '../Dropdowns/Dropdowns';

import { ProductItem } from '../ProductItem/ProductItem';
import { Pagination } from '../Pagination/Pagination';
import './ProductList.scss';

const optionSort = ['newest', 'hotprice', 'alphabetically'];
const viewPerPage = ['4', '8', '16', 'all'];

type Props = {
  products: Product[];
  title: string;
};

export const ProductList: FC<Props> = ({ products, title }) => {
  const { isShowResSearch, productsToSearch } = useAppContext();
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  let countProducts = products.length;
  let paginationCount = 0;
  const currentPage = Number(searchParams.get('page')) || 1;
  const sortedBy = searchParams.get('sortBy') || '';

  if (isShowResSearch) {
    countProducts = productsToSearch.length;
  } else {
    countProducts = products.length;
  }

  const perPage = Number(searchParams.get('perPage')) || countProducts;
  const lastPage = Math.ceil(countProducts / perPage);

  if (isShowResSearch) {
    paginationCount = productsToSearch.length;
  } else {
    paginationCount = products.length;
  }

  const isPaginationShow = perPage !== countProducts && lastPage > 1;

  const start = currentPage * perPage - perPage;
  const end =
    currentPage * perPage <= paginationCount
      ? currentPage * perPage
      : paginationCount;

  const sortedProducts = sortProducts(products, sortedBy);
  const sortedSearchProducts = sortProducts(productsToSearch, sortedBy);
  const visibleProducts = sortedProducts.slice(start, end);
  const visibleSearchProducts = sortedSearchProducts.slice(start, end);

  return (
    <div className="product-list">
      <div className="product-list__container">
        <div className="product-list__top-row">
          <Breadcrumbs />
        </div>
        <h1 className="product-list__title title">{title}</h1>
        <p className="product-list__count">{`${countProducts} models`}</p>
        {!products.length ? (
          <NotResults categoryName={pathname.slice(1)} />
        ) : (
          <>
            <div className="product-list__dropdowns">
              <Dropdowns
                options={optionSort}
                startValue={`${sortedBy}`}
                label="Sort by"
                searchParamsKey="sortBy"
              />
              <Dropdowns
                options={viewPerPage}
                startValue={`${perPage}`}
                label="Items on page"
                searchParamsKey="perPage"
              />
            </div>

            {isShowResSearch ? (
              <div className="results-search__container">
                <p className="results-search__count">{`${sortedSearchProducts.length} results`}</p>

                {sortedSearchProducts.length !== 0 ? (
                  <div className="product-list__content grid">
                    {visibleSearchProducts.map(product => (
                      <ProductItem product={product} key={product.id} />
                    ))}
                  </div>
                ) : (
                  <p className="results-search__not-found">
                    Nothing was found for your request
                  </p>
                )}
              </div>
            ) : (
              <div className="product-list__content grid">
                {visibleProducts.map(product => (
                  <ProductItem product={product} key={product.id} />
                ))}
              </div>
            )}
          </>
        )}

        <div className="product-list__pagination">
          {isPaginationShow && (
            <Pagination
              total={paginationCount}
              perPage={perPage}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};
