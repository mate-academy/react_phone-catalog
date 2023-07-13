import { Navigate, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

import { Breadcrumbs, Select } from '@components/UI';
import { Pagination } from '@components/Pagination/Pagination';
import { Search } from '@components/Search/Search';
import { ProductsMap, useProducts } from '@contexts/productsContext';
import { capitalizeString } from '@helpers/stringOperations';
import { sortProducts } from '@helpers/filters';
import { scrollToTop } from '@helpers/dom';
import NotFoundPage from '@routes/NotFoundPage/NotFoundPage';
import { sortOptions, perPageOptions } from './sorters';
import './ProductPage.scss';

const ProductPage = ({ category }: { category: string }) => {
  const [searchParams] = useSearchParams();
  const { products, error } = useProducts();

  const activeSorter = searchParams.get('sort') || 'age';
  const query = searchParams.get('query') || '';

  const type = category as keyof ProductsMap;
  const categoryName = capitalizeString(type);
  const productsNum = products[type].length;

  const sortedProducts = useMemo(
    () => sortProducts(products[type], activeSorter),
    [activeSorter],
  );

  useEffect(() => {
    scrollToTop();
  }, []);

  if (error) {
    return <NotFoundPage title="Something went wrong" />;
  }

  if (query) {
    return <Search query={query} products={sortedProducts} />;
  }

  return (
    <div className="products-page">
      {!searchParams.get('sort') && (
        <Navigate to="?sort=age&perPage=all" replace />
      )}

      <Breadcrumbs />

      {productsNum === 0 ? (
        <h1 className="products-page__title">{`${categoryName} not found`}</h1>
      ) : (
        <>
          <h1 className="products-page__title">{categoryName}</h1>
          <p className="products-page__count">{`${productsNum} models`}</p>
          <div className="products-page__selectors">
            <Select
              label="Sort by"
              width={176}
              options={sortOptions}
              name="sort"
            />

            <Select
              label="Items on page"
              width={128}
              name="perPage"
              options={perPageOptions}
            />
          </div>
          <section className="products-page__products-list">
            <Pagination sortedProducts={sortedProducts} total={productsNum} />
          </section>
        </>
      )}
    </div>
  );
};

export default ProductPage;
