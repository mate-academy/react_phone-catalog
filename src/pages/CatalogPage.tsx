import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { Pagination } from '../components/Pagination';
import { ProductContent } from '../components/ProductContent';
import { ProductFilter } from '../components/ProductFilter';
import { useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useProducts } from '../hooks/useProducts';
import { ProductCategories } from '../types/ProductCategories';
import { PRODUCTS_TITLE } from '../constants/PRODUCTS_TITLE';
import { SortBy } from '../types/SortBy';

export const CatalogPage = () => {
  const { products } = useProducts();

  const { pathname } = useLocation();
  const slashlessPathname = pathname.slice(1);

  const [searchParams] = useSearchParams();

  const filteredProducts = products.filter(
    d => d.category === slashlessPathname,
  );

  const sort = searchParams.get('sort') || '';
  const perPage = parseInt(
    searchParams.get('perPage') || filteredProducts.length.toString(),
    10,
  );
  const page = parseInt(searchParams.get('page') || '1', 10);

  // sort filteredProducts
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort as SortBy) {
      case SortBy.Newest:
        return b.year - a.year;
      case SortBy.Alphabetically:
        return a.itemId.localeCompare(b.itemId, undefined, {
          sensitivity: 'base',
        });
      case SortBy.Cheapest:
        return a.price - b.price;
      default:
        return 0;
    }
  });

  // get current filteredProducts perPage
  const indexOfLastPost = page * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;
  const currentItems = sortedProducts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="catalog-page">
      <h1 className="visually-hidden">
        {PRODUCTS_TITLE[slashlessPathname as ProductCategories]} page
      </h1>

      <Breadcrumbs />

      <div className="catalog-page__title-block">
        <h2>{PRODUCTS_TITLE[slashlessPathname as ProductCategories]}</h2>
        <p className={classNames('small-text', 'catalog-page__description')}>
          {filteredProducts.length} models
        </p>
      </div>

      <ProductFilter />

      <ProductContent items={currentItems} />

      <Pagination totalItems={filteredProducts.length} />
    </div>
  );
};
