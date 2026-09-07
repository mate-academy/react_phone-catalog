import { useEffect, useMemo, useState } from 'react';
import { useFilteredProducts } from '../../hooks/useFilteredProducts';
import { Category } from '../../types/category';
import { SortOption } from '../../types/sortOption';
import { QuantitativeOption } from '../../types/quantitativeOption';
import { OptionsType } from '../../types/optionsType';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ResponsiveHeader } from '../../components/ResponsiveHeader';
import { PageFilter } from '../../components/PageFilter';
import { ProductsList } from '../../components/ProductsList';
import { Pagination } from '../../components/Pagination';

import '../../styles/utils/page.scss';
import { ProductNotFound } from '../../components/ProductNotFound';

export type Options = {
  option: SortOption | QuantitativeOption;
  type: OptionsType;
};

type Props = {
  title: string;
  category: Category;
};

export const ProductsPage: React.FC<Props> = ({ title, category }) => {
  const { products, status } = useFilteredProducts(category);

  const [searchParams] = useSearchParams();

  const itemsPerPage = searchParams.get('itemsPerPage') || '';
  const sortOption = searchParams.get('sort') || '';
  const currentPage = Number(searchParams.get('page') || '1');
  const searchQuery = searchParams.get('search') || '';

  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [isLoading, setIsLoading] = useState(false);

  // Processing when user entering text on input
  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
    }

    const handler = setTimeout(() => {
      if (searchQuery) {
        setDebouncedQuery(searchQuery);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setDebouncedQuery('');
      }
    }, 1300); // 1.3 second debounce for search input

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const sortedProducts = useMemo(() => {
    if (status === 'succeeded') {
      let sorted = [...products];
      let visiblePages = 1;

      if (debouncedQuery) {
        const queryWords = debouncedQuery
          .toLowerCase()
          .split(' ')
          .filter(Boolean);

        sorted = sorted.filter(product => {
          const productName = product.name.toLowerCase();

          return queryWords.every(word => productName.includes(word));
        });
      }

      if (sortOption) {
        sorted = sorted.sort((a, b) => {
          switch (sortOption) {
            case 'Newest':
              return b.year - a.year;
            case 'Alphabetically':
              return a.name.localeCompare(b.name);
            case 'Cheapest':
              return a.price - b.price;
            default:
              return 0;
          }
        });
      }

      if (itemsPerPage && itemsPerPage !== 'All') {
        visiblePages = Math.ceil(sorted.length / +itemsPerPage);

        sorted = sorted.slice(
          (currentPage - 1) * +itemsPerPage, // First visible item
          +itemsPerPage * currentPage, // Last visible item
        );
      }

      return { sorted, visiblePages };
    }

    return { sorted: [], visiblePages: 1 };
  }, [products, currentPage, itemsPerPage, sortOption, debouncedQuery, status]);

  return (
    <div className="page">
      <Breadcrumbs />

      <div className="page__title">
        <ResponsiveHeader>{title}</ResponsiveHeader>
      </div>

      <p className="page__subtitle text-gray">{`${products.length} models`}</p>

      {!!sortedProducts.sorted.length && <PageFilter />}

      <ProductsList
        products={sortedProducts.sorted}
        status={isLoading ? 'loading' : status} // Sets loading when user entering query on input, or when products is loading
      />

      {!sortedProducts.sorted.length && status === 'succeeded' && (
        <ProductNotFound category={category} />
      )}

      <Pagination pages={sortedProducts.visiblePages} />
    </div>
  );
};
