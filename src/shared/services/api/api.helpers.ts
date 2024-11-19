import { ProductCoverModel } from '@shared/types/Product';

interface FilterProductsProps {
  variant: 'hot' | 'new';
  productsCovers: ProductCoverModel[];
}

interface GeneratePaginationProps {
  page?: number;
  productsCovers: ProductCoverModel[];
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
        page: null,
        end: true,
        start: true,
        total: productsCovers.length,
      },
    };
  }

  const to = page * 10;
  const from = to - 10;

  const slicedData = productsCovers.slice(from, to);

  return {
    data: slicedData,
    meta: {
      page,
      total: slicedData.length,
      end: to === productsCovers.length || slicedData.length < 10,
      start: from === 0,
    },
  };
};
