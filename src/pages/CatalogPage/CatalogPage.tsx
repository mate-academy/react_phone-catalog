import { useEffect, useMemo } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { CatalogTemplate } from '@/components/templates';
import { CATALOG_SORT_OPTIONS } from '@/components/organisms';
import { CATALOG_PAGE_SIZE_OPTIONS } from '@/components/organisms/Catalog/CatalogFilter/CatalogFilter.constants';

import { useProducts } from '@/entities/product/model/product.queries';
import { useProductRatings } from '@/entities/product/model/product-ratings.queries';

import { useTopSales } from '@/shared/api/topsales.queries';
import { resolveCatalogPagination } from '@/shared/lib/resolveCatalogPagination';
import { Category } from '@/shared/types/Category';

import { NotFoundPage } from '../NotFoundPage';

export const CatalogPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  const { t } = useTranslation();

  const { catalogSlug } = useParams<'catalogSlug'>();
  const [searchParams, setSearchParams] = useSearchParams();

  const title = catalogSlug || '';

  useEffect(() => {
    document.title = `${t(title)} | NICE GADGETS`;
  }, [title, t]);

  const { data: products, isPending, isError } = useProducts();

  const {
    data: ratings = [],
    isPending: isRatingsPending,
    isError: isRatingsError,
  } = useProductRatings();

  const {
    data: topSales = [],
    isPending: isTopSalesPending,
    isError: isTopSalesError,
  } = useTopSales();

  const isValidCategory = Object.values(Category).some(
    (category) => category === title,
  );

  const items = useMemo(() => {
    return (products ?? []).filter((item) => item.category === title);
  }, [products, title]);

  const ratingsMap = useMemo(() => {
    return new Map(ratings.map((item) => [item.namespaceId, item]));
  }, [ratings]);

  const salesMap = useMemo(
    () => new Map(topSales.map((sale) => [sale.product_id, sale.quantity])),
    [topSales],
  );

  const sortBy =
    CATALOG_SORT_OPTIONS.find(
      (option) => option === searchParams.get('sort'),
    ) ?? CATALOG_SORT_OPTIONS[0];

  const isRatingSort = sortBy === 'Highest rated' || sortBy === 'Lowest rated';

  const sortedItems = useMemo(() => {
    return [...items].sort((first, second) => {
      switch (sortBy) {
        case 'Cheapest':
          return first.price - second.price;

        case 'Most expensive':
          return second.price - first.price;

        case 'Newest':
          return second.year - first.year;

        case 'Top sales': {
          const firstSales = salesMap.get(first.id) ?? 0;
          const secondSales = salesMap.get(second.id) ?? 0;

          return secondSales - firstSales;
        }

        case 'Highest rated':
        case 'Lowest rated': {
          const firstRating = ratingsMap.get(first.namespace_id);
          const secondRating = ratingsMap.get(second.namespace_id);

          if (!firstRating && !secondRating) return 0;
          if (!firstRating) return 1;
          if (!secondRating) return -1;

          const ratingDifference =
            sortBy === 'Highest rated' ?
              secondRating.rating - firstRating.rating
            : firstRating.rating - secondRating.rating;

          if (ratingDifference !== 0) {
            return ratingDifference;
          }

          return secondRating.reviewsCount - firstRating.reviewsCount;
        }

        default:
          return 0;
      }
    });
  }, [items, sortBy, ratingsMap, salesMap]);

  const { currentPage, totalPages, startIndex, itemsPerPage } =
    resolveCatalogPagination({
      pageParam: searchParams.get('page'),
      perPageParam: searchParams.get('perPage'),
      totalItems: sortedItems.length,
      allowedPageSizes: CATALOG_PAGE_SIZE_OPTIONS,
    });

  const visibleItems = sortedItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(page));

    setSearchParams(params);
  };

  if (!isValidCategory) {
    return <NotFoundPage />;
  }

  if (isError) {
    return <h2>Product error</h2>;
  }

  if (isRatingSort && isRatingsError) {
    return <h2>Failed to load product ratings</h2>;
  }

  if (sortBy === 'Top sales' && isTopSalesError) {
    return <h2>Failed to load top sales</h2>;
  }

  return (
    <CatalogTemplate
      data={{
        items: visibleItems,
        totalItems: items.length,
        title,
        isLoading:
          isPending ||
          (isRatingSort && isRatingsPending) ||
          (sortBy === 'Top sales' && isTopSalesPending),
      }}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};
