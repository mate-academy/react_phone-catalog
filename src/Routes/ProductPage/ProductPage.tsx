import { Navigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import { Breadcrumbs } from '../../components/UI/Breadcrumbs/Breadcrumbs';
import { Pagination } from '../../components/ProductPage/Pagination/Pagination';
import { NoResults } from '../../components/ProductPage/NoResults/NoResults';
import { sortProducts } from '../../helpers/filters';
import { Search } from '../../components/Search/Search';
import { ProductsMap, useProducts } from '../../contexts/productsContext';
import { capitalizeString } from '../../helpers/stringOperations';
import { getItemsToShowIndex } from '../../helpers/pagination';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Select } from '../../components/UI/Select/Select';
import './ProductPage.scss';
import { scrollToTop } from '../../helpers/dom';

const perPageOptions: { [key: string]: string } = {
  all: 'all',
  4: '4',
  8: '8',
  16: '16',
};

const sortOptions: { [key: string]: string } = {
  age: 'Newest',
  name: 'Alphabetically',
  price: 'Cheapest',
};

const ProductPage = ({ category }: { category: string }) => {
  const [searchParams] = useSearchParams();

  const perPage = Number(searchParams.get('perPage')) || 'all';
  const page = Number(searchParams.get('page')) || 1;
  const activeSorter = searchParams.get('sort') || 'age';
  const query = searchParams.get('query') || '';

  const { products, isLoading } = useProducts();

  const type = category as keyof ProductsMap;
  const categoryName = capitalizeString(type);
  const productsNum = products[type].length;
  const [from, to] = getItemsToShowIndex(perPage, page, productsNum);
  const sortedProducts = sortProducts(products[type], activeSorter).slice(
    from,
    to,
  );

  useEffect(() => {
    scrollToTop();
  }, []);

  if (!isLoading && productsNum === 0) {
    return <NoResults categoryName={categoryName} />;
  }

  if (query) {
    return <Search query={query} products={sortedProducts} />;
  }

  return (
    <div className="products-page">
      {!searchParams.get('perPage') && (
        <Navigate to="?sort=age&perPage=all" replace />
      )}
      <Breadcrumbs />

      <h1 className="products-page__title">{categoryName}</h1>
      <p className="products-page__count">{`${productsNum} models`}</p>

      <div className="products-page__selectors">
        <Select label="Sort by" width={176} options={sortOptions} name="sort" />

        <Select
          label="Items on page"
          width={128}
          name="perPage"
          options={perPageOptions}
        />
      </div>

      <section className="products-page__products-list">
        <ProductsList products={sortedProducts} />
        <Pagination page={page} total={productsNum} perPage={perPage} />
      </section>
    </div>
  );
};

export default ProductPage;
