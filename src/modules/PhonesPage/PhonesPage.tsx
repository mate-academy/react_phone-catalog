import { useEffect, useMemo, useState } from 'react';
import { Catalog } from '../shared/components/Catalog';
import { PhoneCard } from '../shared/components/PhoneCard/PhoneCard';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api';
import { sortProducts } from '../../utils/sortProducts';
import { usePagination } from '../../hooks/usePagination';
import { useCatalogParams } from '../../hooks/useCatalogParams';
import { Loader } from '../shared/components/Loader/Loader';
import styles from './PhonesPage.module.scss';

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
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setIsLoad(true);

    getProducts()
      .then(productsFromServer =>
        setPhones(
          productsFromServer.filter(prod => prod.category === 'phones'),
        ),
      )
      .finally(() => setIsLoad(false));
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
    <>
      {isLoad ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
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
      )}
    </>
  );
};
