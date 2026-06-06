import { useEffect, useMemo, useState } from 'react';
import { Catalog } from '../shared/components/Catalog';
import { PhoneCard } from '../shared/components/PhoneCard/PhoneCard';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api';
import { sortProducts } from '../../utils/sortProducts';
import { usePagination } from '../../hooks/usePagination';
import { useCatalogParams } from '../../hooks/useCatalogParams';

export const TabletsPage = () => {
  const {
    handleProductsPerPageChange,
    handleSetCurrentPage,
    handleSortValueChange,
    pageNumber,
    sort,
    productsPerPage,
  } = useCatalogParams();

  const [tablets, setTablets] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(productsFromServer =>
      setTablets(
        productsFromServer.filter(prod => prod.category === 'tablets'),
      ),
    );
  }, []);

  const sortedProducts = useMemo(() => {
    return sortProducts(tablets, sort);
  }, [tablets, sort]);

  const { currentPage, totalPages, visibleItems } = usePagination(
    sortedProducts,
    pageNumber,
    productsPerPage,
  );

  return (
    <Catalog
      title="Tablets"
      products={sortedProducts}
      renderItem={product => <PhoneCard product={product} />}
      sortByValue={sort}
      setSortByValue={handleSortValueChange}
      itemsOnPageValue={productsPerPage}
      setItemsOnPageValue={handleProductsPerPageChange}
      currentPage={currentPage}
      totalPages={totalPages}
      visibleItems={visibleItems}
      setCurrentPage={handleSetCurrentPage}
    />
  );
};
