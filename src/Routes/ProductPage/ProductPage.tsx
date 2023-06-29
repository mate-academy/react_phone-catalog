import { useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { Breadcrumbs } from '../../components/UI/Breadcrumbs/Breadcrumbs';
import { Pagination } from '../../components/ProductPage/Pagination/Pagination';
import { NoResults } from '../../components/ProductPage/NoResults/NoResults';
import { Loader } from '../../components/UI/Loader/Loader';
import { SortSelect } from '../../components/ProductPage/SortSelect';
import { PerPageSelect } from '../../components/ProductPage/PerPageSelect';
import { sortProducts } from '../../helpers/filters';
import { Search } from '../../components/Search/Search';
import { ProductsMap, useProducts } from '../../contexts/productsContext';
import './ProductPage.scss';
import { capitalizeString } from '../../helpers/stringOperations';

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const { products, isLoading } = useProducts();

  const type = pathname.slice(1);

  const perPage = searchParams.get('perPage') || 'all';
  const activeSorter = searchParams.get('sort') || 'age';
  const query = searchParams.get('query') || '';
  const productsNum = products[type as keyof ProductsMap].length;

  const sortedProducts = useMemo(
    () => sortProducts(products[type as keyof ProductsMap], activeSorter),
    [products, activeSorter],
  );

  if (!isLoading && productsNum === 0) {
    return <NoResults categoryName={capitalizeString(type)} />;
  }

  if (query) {
    return <Search query={query} products={sortedProducts} />;
  }

  return (
    <div className="products-page">
      <Breadcrumbs />

      <h1 className="products-page__title">{capitalizeString(type)}</h1>
      <p className="products-page__count">{`${productsNum} models`}</p>

      <div className="products-page__selectors">
        <SortSelect />

        <PerPageSelect />
      </div>

      {isLoading ? (
        <div className="products-page__loader-wrapper">
          <Loader width={300} />
        </div>
      ) : (
        <section className="products-page__products-list">
          <Pagination products={sortedProducts} perPage={perPage} />
        </section>
      )}
    </div>
  );
};

export default ProductPage;
