import type { CatalogFilters, FilterOptions } from '../../../types/Catalog';
import type { Product } from '../../../types/Product';
import { Typography } from '../../atoms/Typography/Typography';
import { Breadcrumbs } from '../../molecules/BreadCrumbs/BreadCrumbs';
import { CatalogFilterBar } from '../../molecules/CatalogFilterBar/CatalogFilterBar';
import { Dropdown } from '../../molecules/Dropdown';
import { HeadingWithCount } from '../../molecules/HeadingWithCount';
import { Pagination } from '../../molecules/Pagination';
import { ProductCard } from '../../organisms/ProductCard/ProductCard';

const loadMoreButtonClass =
  'flex h-12 w-full max-w-[380px] items-center justify-center rounded-sm border border-elements bg-white text-primary transition-colors hover:border-primary hover-zoom-small dark:bg-surface-2-dark dark:text-white';

export type CatalogLayoutProps = {
  title: string;
  products: Product[];
  totalItems: number;
  sortOptions: string[];
  sortBy: string;
  onSortChange: (value: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  canLoadMore: boolean;
  onLoadMore: () => void;
  filters: CatalogFilters;
  filterOptions: FilterOptions;
  onFiltersChange: (filters: CatalogFilters) => void;
  filterLabel: string;
  filterAnyLabel: string;
};

export const CatalogLayout = ({
  title,
  products,
  totalItems,
  sortOptions,
  sortBy,
  onSortChange,
  currentPage,
  totalPages,
  onPageChange,
  canLoadMore,
  onLoadMore,
  filters,
  filterOptions,
  onFiltersChange,
  filterLabel,
  filterAnyLabel,
}: CatalogLayoutProps) => (
  <div className="mx-auto w-full max-w-300 px-4 pt-6 pb-20 md:px-6 lg:px-8">
    <Breadcrumbs />

    <div className="mt-6">
      <HeadingWithCount
        title={title}
        itemsCount={totalItems}
      />
    </div>

    <div
      id="catalog-controls"
      className="mt-8 grid grid-cols-1 gap-4 scroll-mt-12 sm:grid-cols-[205px_230px] sm:items-end lg:scroll-mt-16"
    >
      <Dropdown
        label="Sort by"
        options={sortOptions}
        value={sortBy}
        onChange={onSortChange}
      />

      <CatalogFilterBar
        filters={filters}
        filterOptions={filterOptions}
        onFiltersChange={onFiltersChange}
        filterLabel={filterLabel}
        filterAnyLabel={filterAnyLabel}
      />
    </div>

    {totalItems === 0 ?
      <div className="mt-10 flex flex-col items-center gap-4 py-12 text-center">
        <img
          src="/img/no-products-found.png"
          alt="No product icon"
          className="mb-2 h-32 w-auto object-contain"
        />

        <Typography level="h2">No products found :(</Typography>

        <Typography level="body">
          Try changing or clearing your filters.
        </Typography>

        {(filters.model || filters.capacity) && (
          <button
            type="button"
            onClick={() => onFiltersChange({ model: '', capacity: '' })}
            className="h-10 border border-elements px-4 text-sm hover:border-primary hover-zoom-small dark:border-white/60 dark:text-white dark:hover:border-white"
          >
            Reset filters
          </button>
        )}
      </div>
    : <section
        id="catalog-products"
        aria-label={title}
        className="mt-6 grid grid-cols-4 gap-x-4 gap-y-10 md:grid-cols-12 lg:grid-cols-24"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="col-span-4 min-w-0 scroll-mt-12 sm:col-span-2 md:col-span-6 em:col-span-4 lg:col-span-6 lg:scroll-mt-16"
          >
            <ProductCard
              className="h-110 md:h-126.5"
              product={product}
            />
          </div>
        ))}
      </section>
    }

    {(canLoadMore || totalPages > 1) && (
      <div className="mt-5 flex flex-col items-center gap-5">
        {canLoadMore && (
          <button
            type="button"
            onClick={onLoadMore}
            className={loadMoreButtonClass}
          >
            <Typography level="button">Show more</Typography>
          </button>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    )}
  </div>
);
