import { useLocation, useSearchParams } from 'react-router-dom';
import { PagePath } from './PagePath';
import { Loader } from './Loader';
import { Selector } from './Selector';
import { Card } from './Card';
import { FetchError } from './FetchError';
import React from 'react';
import { Product } from '../types/product';
import { filterProducts } from '../utils/filterProducts';
import { PaginationButtons } from './PaginationButtons';

type Props = {
  products: Product[];
  loaded: boolean;
  hasError: boolean;
  title: string;
};

export const PageContent: React.FC<Props> = ({
  products,
  loaded,
  hasError,
  title,
}) => {
  const { pathname } = useLocation();
  const path = pathname.slice(1);

  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort');
  const itemsOnPage = searchParams.get('items');
  const query = searchParams.get('query');
  const page = searchParams.get('page');

  const filteredProducts = filterProducts({
    products: [...products],
    sortBy,
    itemsOnPage,
    query,
    page,
  });

  const productEmpty = query !== null && !filteredProducts.length && !loaded;

  const productsLength = products.length;

  return (
    <div className="grids mx-[16px] sm:mx-[32px]">
      <div className="col-[1/5] sm:col-[1/13] xl:col-[1/25]">
        <PagePath />

        <h1 className="page-title">{title}</h1>

        {loaded && !hasError ? (
          <Loader />
        ) : (
          <div className={`${hasError ? 'hidden' : 'flex flex-col'}`}>
            <div>
              <p className="page-text-models">{`${products.length} models`}</p>

              <Selector />

              <div
                className={`
                    ${
                      itemsOnPage === 'all' || itemsOnPage === null
                        ? 'mb-[64px] xl:mb-[80px]'
                        : 'mb-[24px] sm:mb-[40px]'
                    }
                  `}
              >
                <Card products={filteredProducts} />
              </div>
            </div>

            {itemsOnPage && itemsOnPage !== 'all' && (
              <PaginationButtons productsLength={productsLength} />
            )}
          </div>
        )}

        {productEmpty && (
          <h1
            className="
              page-title
            flex
              justify-center
              text-red-color
            "
          >{`There are no ${path} matching the query`}</h1>
        )}

        {!loaded && hasError && (
          <FetchError title={`There are no ${path} yet`} />
        )}
      </div>
    </div>
  );
};
