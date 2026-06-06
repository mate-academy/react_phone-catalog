import { useEffect, useMemo, useState } from 'react';
import { Catalog } from '../shared/components/Catalog';
import { PhoneCard } from '../shared/components/PhoneCard/PhoneCard';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api';
import { sortProducts } from '../../utils/sortProducts';
import { usePagination } from '../../hooks/usePagination';
import { useCatalogParams } from '../../hooks/useCatalogParams';
import styles from './TabletsPage.module.scss';
import { Loader } from '../shared/components/Loader/Loader';

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
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setIsLoad(true);

    getProducts()
      .then(productsFromServer =>
        setTablets(
          productsFromServer.filter(prod => prod.category === 'tablets'),
        ),
      )
      .finally(() => setIsLoad(false));
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
    <>
      {isLoad ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
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
      )}
    </>
  );
};
