import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CatalogLayout } from '../components/templates/CatalogLayout/CatalogLayout';
import { useAppState } from '../store/store';
import { BREAKPOINTS } from '../constants/breakpoints';
import type { Category } from '../types/category';
import type { CatalogFilters } from '../types/Catalog';
import {
  CATEGORY_TITLES,
  MODEL_WORDS,
  SORT_OPTIONS,
} from '../constants/catalog';

type Props = {
  category: Category;
};

const getResponsivePageSize = () => {
  if (window.matchMedia(`(min-width: ${BREAKPOINTS.lg}px)`).matches) return 12;
  if (window.matchMedia(`(min-width: ${BREAKPOINTS.em}px)`).matches) return 9;
  if (window.matchMedia(`(min-width: ${BREAKPOINTS.sm}px)`).matches) return 6;
  return 4;
};

const parsePage = (value: string | null, fallback: number) => {
  const page = Number(value);

  return Number.isInteger(page) && page > 0 ? page : fallback;
};

const formatModel = (id: string) =>
  id
    .replace('apple-', '')
    .split('-')
    .map((word) => MODEL_WORDS[word] ?? word[0].toUpperCase() + word.slice(1))
    .join(' ');

const capacityInGB = (capacity: string) => {
  const amount = Number.parseFloat(capacity);

  return capacity.toUpperCase().includes('TB') ? amount * 1024 : amount;
};

export const CatalogPage: React.FC<Props> = ({ category }) => {
  const products = useAppState((state) => state[category]);
  const ratings = useAppState((state) => state.ratings);
  const [searchParams, setSearchParams] = useSearchParams();

  const shouldScrollToPage = useRef(false);

  const [pageSize, setPageSize] = useState(getResponsivePageSize);

  const filters: CatalogFilters = {
    model: searchParams.get('model') ?? '',
    capacity: searchParams.get('capacity') ?? '',
  };

  const requestedSort = searchParams.get('sort');
  const sortBy =
    requestedSort && SORT_OPTIONS.includes(requestedSort) ?
      requestedSort
    : SORT_OPTIONS[0];

  useEffect(() => {
    const breakpoints = [BREAKPOINTS.sm, BREAKPOINTS.em, BREAKPOINTS.lg].map(
      (width) => window.matchMedia(`(min-width: ${width}px)`),
    );

    const handleBreakpointChange = () => {
      setPageSize(getResponsivePageSize());
    };

    breakpoints.forEach((breakpoint) =>
      breakpoint.addEventListener('change', handleBreakpointChange),
    );

    return () => {
      breakpoints.forEach((breakpoint) =>
        breakpoint.removeEventListener('change', handleBreakpointChange),
      );
    };
  }, [category]);

  useEffect(() => {
    if (!shouldScrollToPage.current) return;
    shouldScrollToPage.current = false;
    document.getElementById('catalog-controls')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [category]);

  const updateSearchParams = (updates: Record<string, string>) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        nextParams.set(key, value);
      } else {
        nextParams.delete(key);
      }
    });

    setSearchParams(nextParams);
  };

  const filteredProducts = products.filter((product) => {
    const matchesModel =
      !filters.model || product.namespaceId === filters.model;

    const matchesCapacity =
      !filters.capacity ||
      (category === 'accessories' ?
        product.capacityAvailable.includes(filters.capacity)
      : product.capacity === filters.capacity);

    return matchesModel && matchesCapacity;
  });

  const sortedProducts = [...filteredProducts].sort((first, second) => {
    switch (sortBy) {
      case 'Price low': {
        const firstProductPrice =
          first.priceDiscount ? first.priceDiscount : first.priceRegular;
        const secondProductPrice =
          second.priceDiscount ? second.priceDiscount : second.priceRegular;
        return firstProductPrice - secondProductPrice;
      }
      case 'Price high': {
        const firstProductPrice =
          first.priceDiscount ? first.priceDiscount : first.priceRegular;
        const secondProductPrice =
          second.priceDiscount ? second.priceDiscount : second.priceRegular;
        return secondProductPrice - firstProductPrice;
      }
      case 'Newest':
        return second.year - first.year;
      case 'Top rated':
        return (ratings[second.id] ?? 0) - (ratings[first.id] ?? 0);
      default:
        return 0;
    }
  });

  const models = [...new Set(products.map((product) => product.namespaceId))]
    .sort((idA, idB) =>
      formatModel(idA).localeCompare(formatModel(idB), 'en', {
        numeric: true,
        sensitivity: 'base',
      }),
    )
    .map((id) => ({
      value: id,
      label: formatModel(id),
    }));

  const capacities = [
    ...new Set(products.flatMap((product) => product.capacityAvailable)),
  ].sort((first, second) => capacityInGB(first) - capacityInGB(second));

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const pageLimit = Math.max(totalPages, 1);

  const from = Math.min(parsePage(searchParams.get('from'), 1), pageLimit);

  const to = Math.min(
    Math.max(parsePage(searchParams.get('to'), from), from),
    pageLimit,
  );

  const currentPage = to;

  const visibleProducts = sortedProducts.slice(
    (from - 1) * pageSize,
    to * pageSize,
  );

  const canLoadMore = currentPage < totalPages;

  const handleLoadMore = () => {
    if (!canLoadMore) return;

    updateSearchParams({ to: String(currentPage + 1) });
  };

  const handleSortChange = (value: string) => {
    updateSearchParams({
      sort: value === SORT_OPTIONS[0] ? '' : value,
      from: '',
      to: '',
    });
  };

  const handleFiltersChange = (nextFilters: CatalogFilters) => {
    updateSearchParams({
      model: nextFilters.model,
      capacity: nextFilters.capacity,
      from: '',
      to: '',
    });
  };

  const handlePageChange = (page: number) => {
    shouldScrollToPage.current = true;

    updateSearchParams({
      from: String(page),
      to: String(page),
    });
  };

  return (
    <CatalogLayout
      title={CATEGORY_TITLES[category]}
      products={visibleProducts}
      totalItems={filteredProducts.length}
      sortOptions={SORT_OPTIONS}
      sortBy={sortBy}
      onSortChange={handleSortChange}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      canLoadMore={canLoadMore}
      onLoadMore={handleLoadMore}
      filters={filters}
      filterOptions={{ models, capacities }}
      onFiltersChange={handleFiltersChange}
      filterLabel={category === 'accessories' ? 'Display' : 'Storage'}
      filterAnyLabel={
        category === 'accessories' ? 'Any display' : 'Any storage'
      }
    />
  );
};
