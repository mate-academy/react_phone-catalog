import { useEffect, useState } from 'react';
import styles from './PhonesPage.module.scss';

import { Product } from '../../shared/interfaces/Product';
import { ProductCard } from '../../components/ProductCard';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductsParams } from '../../components/ProductsParams/ProductsParams';
import { Paginator } from '../../components/Paginator/Paginator';
import { useProductsSearchParams } from '../../shared/hooks/useProductsSearchP';
import { usePreparedProducts } from '../../shared/hooks/usePreparedProducts';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  const { sortBy, itemsPerPage, page, setSort, setItems, setPage } =
    useProductsSearchParams();

  const visibleProducts = usePreparedProducts({
    products: phones,
    sortBy,
    itemsPerPage,
    page,
  });

  useEffect(() => {
    fetch('api/products.json')
      .then(res => res.json())
      .then((data: Product[]) => {
        const onlyPhones = data.filter(p => p.category === 'phones');

        setPhones(onlyPhones);
      });
  }, []);

  const totalPages =
    itemsPerPage === 'all' ? 1 : Math.ceil(phones.length / itemsPerPage);

  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <h1 className={styles.title}>Mobile phones</h1>
      <p className={styles.subtitle}>{phones.length} models</p>

      <ProductsParams
        sortBy={sortBy}
        onSortChange={setSort}
        itemsPerPage={itemsPerPage}
        onItemsChange={setItems}
      />

      <div className={styles.list}>
        {visibleProducts.map(product => (
          <div key={product.id} className={styles.cardWrapper}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {itemsPerPage !== 'all' && totalPages > 1 && (
        <Paginator
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};
