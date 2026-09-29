import React, { useMemo } from 'react';
import { publicPath } from '../../utils/publicPath';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useSearchParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { useShop } from '../../context/ShopContext';
import { Category, Product } from '../../types/product.types';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Dropdown } from '../../components/Dropdown';
import { ProductsList } from '../../components/ProductsList';
import { Pagination } from '../../components/Pagination';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';
import './CatalogPage.scss';

interface Props {
  category: Category;
  title: string;
}

type SortBy = 'newest' | 'cheapest' | 'alphabetically';
type PerPage = '4' | '8' | '16' | 'all';

const DEFAULT_SORT: SortBy = 'newest';
const DEFAULT_PER_PAGE: PerPage = '16';
const DEFAULT_PAGE = 1;

const sortOptions: { value: SortBy; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'cheapest', label: 'Cheapest' },
  { value: 'alphabetically', label: 'Alphabetically' },
];

const perPageOptions: { value: PerPage; label: string }[] = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

function sortProducts(products: Product[], sortBy: SortBy): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'cheapest':
      return sorted.sort((a, b) => a.price - b.price);
    case 'alphabetically':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest':
    default:
      return sorted.sort((a, b) => b.year - a.year);
  }
}

export const CatalogPage: React.FC<Props> = ({ category, title }) => {
  useDocumentTitle(`${title} - Nice Gadgets`);
  const {
    data: allProducts,
    isLoading,
    error,
  } = useFetch<Product[]>(publicPath('/api/products.json'));
  const { favouriteIds, cartIds, toggleFavourite, addToCart } = useShop();

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = (searchParams.get('sort') as SortBy) || DEFAULT_SORT;
  const perPage = (searchParams.get('perPage') as PerPage) || DEFAULT_PER_PAGE;
  const page = Number(searchParams.get('page')) || DEFAULT_PAGE;

  const updateParams = (updates: Record<string, string | number>) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      const isDefault =
        (key === 'sort' && value === DEFAULT_SORT) ||
        (key === 'perPage' && value === DEFAULT_PER_PAGE) ||
        (key === 'page' && Number(value) === DEFAULT_PAGE);

      if (isDefault) {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    });

    setSearchParams(next);
  };

  const categoryProducts = useMemo(
    () => (allProducts ?? []).filter(product => product.category === category),
    [allProducts, category],
  );

  const sortedProducts = useMemo(
    () => sortProducts(categoryProducts, sortBy),
    [categoryProducts, sortBy],
  );

  const totalPages =
    perPage === 'all'
      ? 1
      : Math.max(1, Math.ceil(sortedProducts.length / Number(perPage)));

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const size = Number(perPage);
    const start = (page - 1) * size;

    return sortedProducts.slice(start, start + size);
  }, [sortedProducts, perPage, page]);

  return (
    <div className="catalog-page">
      <Breadcrumbs items={[{ label: title }]} />

      <h1 className="catalog-page__title">{title}</h1>
      <p className="catalog-page__count">{categoryProducts.length} models</p>

      {isLoading && <Loader />}
      {error && <ErrorMessage message="Failed to load products" />}

      {!isLoading && !error && categoryProducts.length === 0 && (
        <p className="catalog-page__empty">There are no {category} yet</p>
      )}

      {!isLoading && !error && categoryProducts.length > 0 && (
        <>
          <div className="catalog-page__controls">
            <Dropdown
              label="Sort by"
              value={sortBy}
              options={sortOptions}
              onChange={value =>
                updateParams({ sort: value, page: DEFAULT_PAGE })
              }
            />
            <Dropdown
              label="Items on page"
              value={perPage}
              options={perPageOptions}
              onChange={value =>
                updateParams({ perPage: value, page: DEFAULT_PAGE })
              }
            />
          </div>

          <ProductsList
            products={visibleProducts}
            favouriteIds={favouriteIds}
            cartIds={cartIds}
            onToggleFavourite={toggleFavourite}
            onAddToCart={addToCart}
            variant="catalog"
          />

          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={value => updateParams({ page: value })}
            sticky
          />
        </>
      )}
    </div>
  );
};
