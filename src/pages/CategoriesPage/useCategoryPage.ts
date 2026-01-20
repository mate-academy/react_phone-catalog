import { useEffect, useState } from 'react';
import { ProductCategory } from '../../types/ProductCategory';
import { PerPage } from '../../types/PerPages';
import { Sort } from '../../types/Sort';
import { Product } from '../../types/Product';
import { AppErrors } from '../../types/AppErrors';
import { getCachedProducts } from '../../utils/hooks/API/getCachedProducts';
import { ApiError } from '../../services/Errors';

type Params = {
  category: ProductCategory;
  page: number;
  perPage: PerPage;
  sort: Sort;
  query: string;
};

export const useCategoryPage = ({
  category,
  page,
  perPage,
  sort,
  query,
}: Params) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppErrors | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = () => setRefetchIndex(i => i + 1);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getCachedProducts(category)
      .then(({ items }) => {
        let result = items.filter(product => product.category === category);

        if (query.trim()) {
          const normalizedQuery = query.trim().toLowerCase();

          result = result.filter(product =>
            product.name.toLowerCase().includes(normalizedQuery),
          );
        }

        result.sort((a, b) => {
          switch (sort) {
            case 'alphabetically':
              return a.name.localeCompare(b.name);
            case 'cheapest':
              return a.price - b.price;
            case 'expensive':
              return b.price - a.price;
            case 'new':
              return b.year - a.year;
            case 'old':
              return a.year - b.year;

            default:
              return 0;
          }
        });

        setTotal(result.length);

        const limit = perPage === 'all' ? result.length : Number(perPage);
        const start = (page - 1) * limit;

        setProducts(result.slice(start, start + limit));
      })
      .catch(errorData => {
        if (errorData instanceof ApiError) {
          setError(errorData.code);
        } else {
          setError('UNKNOWN_ERROR');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category, page, perPage, sort, query, refetchIndex]);

  return { products, total, isLoading, error, refetch };
};
