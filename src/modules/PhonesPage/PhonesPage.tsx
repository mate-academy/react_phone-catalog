import { useEffect, useMemo, useState } from 'react';
import { Catalog } from '../shared/components/Catalog';
import { PhoneCard } from '../shared/components/PhoneCard/PhoneCard';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api';
import { sortProducts } from '../../utils/sortProducts';
import { usePagination } from '../../hooks/usePagination';
import { useCatalogParams } from '../../hooks/useCatalogParams';

export const PhonesPage = () => {
  const {
    handleProductsPerPageChange,
    handleSetCurrentPage,
    handleSortValueChange,
    pageNumber,
    sort,
    productsPerPage,
  } = useCatalogParams();

  const [phones, setPhones] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(productsFromServer =>
      setPhones(productsFromServer.filter(prod => prod.category === 'phones')),
    );
  }, []);

  const sortedProducts = useMemo(() => {
    return sortProducts(phones, sort);
  }, [phones, sort]);

  const { currentPage, totalPages, visibleItems } = usePagination(
    sortedProducts,
    pageNumber,
    productsPerPage,
  );

  return (
    <Catalog
      title="Mobile phones"
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
