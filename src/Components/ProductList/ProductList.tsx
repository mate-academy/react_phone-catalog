import React, { useContext, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Pagination } from '../Pagination/Paginatio';
import { ProductCards } from '../ProductCards/ProductCards';
import { SelectBlock } from '../SelectBlock/SelectBlock';
import { getFilter } from '../../services/getFilter';
import { getSearchWith } from '../../utils/searchHelper';
import { ProductsContext } from '../../context/ProductContext';
import { Title } from '../Title/Title';
import { Path } from '../Path/Path';
import { useLoading } from '../../hooks/useLoading';
import { Loader } from '../Loader/Loader';

import './ProductList.scss';

type Props = {
  pageName: string;
  title: string;
};

export const ProductList: React.FC<Props> = ({ pageName, title }) => {
  const { pathname } = useLocation();
  const { getCategoriesProducts } = useContext(ProductsContext);
  const isLoading = useLoading();

  const products = getCategoriesProducts(pathname);
  const productsLength = products.length;

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = +(searchParams.get('page') || 1);
  const perPage = +(searchParams.get('perPage') || 8);
  const query = searchParams.get('query');
  const sort = searchParams.get('sort');

  const setCurrentPage = (newPage: number) => {
    setSearchParams(
      getSearchWith(searchParams, {
        page: newPage.toString() || null,
      }),
    );
  };

  const visibleProducts = useMemo(() => {
    return getFilter({ products, query, sort });
  }, [products, query, sort]);

  const searchResult = visibleProducts.length;

  const firstItem = (currentPage - 1) * perPage;
  const lastItem =
    currentPage * perPage < visibleProducts.length
      ? currentPage * perPage
      : visibleProducts.length;

  const slicedProducts = useMemo(() => {
    return visibleProducts.slice(firstItem, lastItem);
  }, [visibleProducts, firstItem, lastItem]);

  return (
    <div className="product-list">
      <Path category={pageName} />

      <div className="product-list__title">
        <Title title={title} />
      </div>

      {isLoading && <Loader />}

      {!isLoading && (
        <>
          {query ? (
            <p className="product-list__quantity">{`${searchResult} result`}</p>
          ) : (
            <p className="product-list__quantity">{`${productsLength} models`}</p>
          )}

          <div className="product-list__select">
            {!!productsLength && (
              <SelectBlock visibleProducts={visibleProducts} />
            )}
          </div>

          <ProductCards slicedProducts={slicedProducts} />

          <div className="product-list__pagination">
            <Pagination
              visibleProducts={visibleProducts}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              perPage={perPage}
            />
          </div>

          {!visibleProducts.length && (
            <div className="product-list__no-result" />
          )}
        </>
      )}
    </div>
  );
};
