import { useEffect, useState } from 'react';
import styles from './PhonesPage.module.scss';
import { Product } from '../../shared/interfaces/Product';
import { ProductCard } from '../../components/ProductCard';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import {
  ItemsPerPage,
  SortBy,
  usePreparedProducts,
} from '../../shared/hooks/usePreparedProducts';
import { ProductsParams } from '../../components/ProductsParams/ProductsParams';
import { Paginator } from '../../components/Paginator/Paginator';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  useEffect(() => {
    fetch('api/products.json')
      .then(res => res.json())
      .then((data: Product[]) => {
        const onlyPhones = data.filter(p => p.category === 'phones');

        setPhones(onlyPhones);
      });
  }, []);

  const [sortBy, setSortBy] = useState<SortBy>('age');
  const [itemsPerPage, setItemsPerPage] = useState<ItemsPerPage>('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [itemsPerPage, sortBy]);

  const visibleProducts = usePreparedProducts({
    products: phones,
    sortBy,
    itemsPerPage,
    page,
  });

  const totalPage =
    itemsPerPage === 'all' ? 1 : Math.ceil(phones.length / itemsPerPage);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mobile phones</h1>
      <p className={styles.subtitle}>{phones.length} models</p>

      <Breadcrumbs />

      <ProductsParams
        sortBy={sortBy}
        onSortChange={setSortBy}
        itemsPerPage={itemsPerPage}
        onItemsChange={setItemsPerPage}
      />

      <div className={styles.list}>
        {visibleProducts.map(product => (
          <div key={product.id} className={styles.cardWrapper}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <Paginator
        currentPage={page}
        totalPages={totalPage}
        onPageChange={setPage}
      />
    </div>
  );
};
