import { useEffect, useMemo, useState } from 'react';
import { Catalog } from '../shared/components/Catalog';
import { PhoneCard } from '../shared/components/PhoneCard/PhoneCard';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api';
import { sortProducts } from '../../utils/sortProducts';
import { usePagination } from '../../hooks/usePagination';
import { useCatalogParams } from '../../hooks/useCatalogParams';

export const AccessoriesPage = () => {
  const {
    handleProductsPerPageChange,
    handleSetCurrentPage,
    handleSortValueChange,
    pageNumber,
    sort,
    productsPerPage,
  } = useCatalogParams();

  const [accessories, setAccessories] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(productsFromServer =>
      setAccessories(
        productsFromServer.filter(prod => prod.category === 'accessories'),
      ),
    );
  }, []);

  const sortedProducts = useMemo(() => {
    return sortProducts(accessories, sort);
  }, [accessories, sort]);

  const { currentPage, totalPages, visibleItems } = usePagination(
    sortedProducts,
    pageNumber,
    productsPerPage,
  );

  return (
    <Catalog
      title="Accessories"
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
