import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Breadcrumbs } from '../UI/Breadcrumbs/Breadcrumbs';
import { Pagination } from './Pagination/Pagination';
import { NoResults } from './NoResults/NoResults';
import { Loader } from '../UI/Loader/Loader';
import { SortSelect } from './SortSelect';
import { PerPageSelect } from './PerPageSelect';
import { sortProducts } from '../../helpers/filters';
import { Search } from '../Search/Search';
import { useProducts } from '../../contexts/productsContext';
import './ProductPage.scss';

type ProductPageProps = {
  type: 'phones' | 'tablets' | 'accessories';
  title: string;
};

export const ProductPage = ({ type, title }: ProductPageProps) => {
  const [searchParams] = useSearchParams();
  const { products, isLoading } = useProducts();

  const perPage = searchParams.get('perPage') || 'all';
  const activeSorter = searchParams.get('sort') || 'age';
  const query = searchParams.get('query') || '';
  const productsNum = products[type].length;

  const sortedProducts = useMemo(
    () => sortProducts(products[type], activeSorter),
    [products, activeSorter],
  );

  if (!isLoading && productsNum === 0) {
    return <NoResults categoryName={title} />;
  }

  if (query) {
    return <Search query={query} products={sortedProducts} />;
  }

  return (
    <div className="products-page">
      <Breadcrumbs />

      <h1 className="products-page__title">{title}</h1>
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
