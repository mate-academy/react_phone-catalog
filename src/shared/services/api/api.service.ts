import { ItemsOnPage, PaginationPage, SortBy } from '@shared/types/common';
import { ProductCoverModel, ProductModel } from '@shared/types/Product';
import {
  PAGINATION_ITEMS_10,
  PAGINATION_ITEMS_16,
  PAGINATION_ITEMS_32,
} from '@shared/utils/constants';

interface FilterProductsProps {
  variant: 'hot' | 'new';
  productsCovers: ProductCoverModel[];
}

interface GeneratePaginationProps {
  page?: number;
  productsCovers: ProductCoverModel[];
}

interface PrepareProductsResponseProps {
  data: ProductModel[];
  filters: {
    sortBy?: SortBy;
    itemsOnPage?: ItemsOnPage;
    page?: PaginationPage | null;
  };
}

export const filterProductsCovers = ({
  variant,
  productsCovers,
}: FilterProductsProps) => {
  switch (variant) {
    case 'new': {
      return productsCovers.filter(({ year }) => year === 2022);
    }

    case 'hot': {
      return productsCovers.filter(
        ({ fullPrice, price }) => fullPrice - price > 200,
      );
    }
  }
};

export const generateProductsCoversPagination = ({
  page,
  productsCovers,
}: GeneratePaginationProps) => {
  if (typeof page === 'undefined') {
    return {
      data: productsCovers,
      meta: {
        page: 1,
        totalPages: 1,
        end: true,
        start: true,
        total: productsCovers.length,
      },
    };
  }

  const to = page * PAGINATION_ITEMS_10;
  const from = to - PAGINATION_ITEMS_10;

  const slicedData = productsCovers.slice(from, to);

  return {
    data: slicedData,
    meta: {
      page,
      total: slicedData.length,
      totalPages: Math.ceil(slicedData.length / PAGINATION_ITEMS_10),
      end:
        to === productsCovers.length || slicedData.length < PAGINATION_ITEMS_10,
      start: from === 0,
    },
  };
};

const sortProducts = (
  data: ProductModel[],
  sortBy?: SortBy,
): ProductModel[] => {
  const dataCopy = [...data];

  switch (sortBy) {
    case 'high_to_low': {
      dataCopy.sort(
        (a, b) =>
          (b.priceDiscount ?? b.priceRegular) -
          (a.priceDiscount ?? a.priceRegular),
      );

      break;
    }

    case 'low_to_high': {
      dataCopy.sort(
        (a, b) =>
          (a.priceDiscount ?? a.priceRegular) -
          (b.priceDiscount ?? b.priceRegular),
      );

      break;
    }
  }

  return dataCopy;
};

export const prepareProductsResponse = ({
  data,
  filters,
}: PrepareProductsResponseProps) => {
  let filteredData = data;
  const page = filters.page ?? 1;

  filteredData = sortProducts(data, filters.sortBy);

  if (page === 'all') {
    return {
      data: filteredData,
      meta: {
        page: 1,
        totalPages: 1,
        end: true,
        start: true,
        total: filteredData.length,
      },
    };
  }

  const pageNumber = Number(page);
  const isItemsOnPage =
    filters.itemsOnPage &&
    [PAGINATION_ITEMS_16.toString(), PAGINATION_ITEMS_32.toString()].includes(
      filters.itemsOnPage,
    );

  const itemsOnPage = isItemsOnPage
    ? Number(filters.itemsOnPage)
    : PAGINATION_ITEMS_16;

  const to = pageNumber * itemsOnPage;
  const from = to - itemsOnPage;

  const slicedData = filteredData.slice(from, to);

  return {
    data: slicedData,
    meta: {
      page: pageNumber,
      end: to === filteredData.length || slicedData.length < itemsOnPage,
      start: from === 0,
      total: filteredData.length,
      totalPages: Math.ceil(filteredData.length / itemsOnPage),
    },
  };
};
