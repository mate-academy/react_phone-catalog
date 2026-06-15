import { useEffect, useMemo, useState } from 'react';
import { Catalog } from '../shared/components/Catalog';
import { ProductCard } from '../shared/components/ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api';
import { sortProducts } from '../../utils/sortProducts';
import { usePagination } from '../../hooks/usePagination';
import { useCatalogParams } from '../../hooks/useCatalogParams';
import { Loader } from '../shared/components/Loader/Loader';

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
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setIsLoad(true);

    getProducts()
      .then(productsFromServer =>
        setAccessories(
          productsFromServer.filter(prod => prod.category === 'accessories'),
        ),
      )
      .finally(() => setIsLoad(false));
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
    <>
      {isLoad ? (
        <Loader />
      ) : (
        <Catalog
          title="Accessories"
          products={sortedProducts}
          renderItem={product => <ProductCard product={product} />}
          sortByValue={sort}
          setSortByValue={handleSortValueChange}
          itemsOnPageValue={productsPerPage}
          setItemsOnPageValue={handleProductsPerPageChange}
          currentPage={currentPage}
          totalPages={totalPages}
          visibleItems={visibleItems}
          setCurrentPage={handleSetCurrentPage}
        />
      )}
    </>
  );
};
