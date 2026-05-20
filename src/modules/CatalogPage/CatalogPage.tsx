import React, { useEffect } from 'react';
import { CategoryTemplate } from '../shared/templates/CategoryTemplate';
import { useSearchParams } from 'react-router-dom';
import { DefaultValues } from '../../enums/DefaultValues';
import { ItemPerPage } from '../../enums/ItemsPerPage';
import { SearchParam } from '../../enums/SearchFields';
import { useAppSelector } from '../../hooks/hooks';
import { useFilteredProducts } from '../../hooks/useFilteredProducts';
import { usePaginatedProducts } from '../../hooks/usePaginatedProducts';

type Props = {
  category: string;
};

export const CatalogPage: React.FC<Props> = ({ category }) => {
  const { products } = useAppSelector(state => state.products);
  const [searchParams] = useSearchParams();

  const query = searchParams.get(SearchParam.Query) || DefaultValues.Query;
  const sortBy = searchParams.get(SearchParam.Sort) || DefaultValues.Sort;
  const perPage =
    searchParams.get(SearchParam.PerPage) || DefaultValues.PerPage;
  const page = +(searchParams.get(SearchParam.Page) || DefaultValues.Page);

  const filteredProducts = useFilteredProducts(
    products,
    category,
    query,
    sortBy,
  );

  const { paginated: paginatedProducts, totalPages } = usePaginatedProducts(
    filteredProducts,
    perPage === ItemPerPage.All ? ItemPerPage.All : parseInt(perPage, 10),
    page,
  );

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }, [page]);

  return (
    <CategoryTemplate
      category={category}
      paginatedProducts={paginatedProducts}
      totalPages={totalPages}
      filteredProducts={filteredProducts}
      currentPage={page}
    />
  );
};
