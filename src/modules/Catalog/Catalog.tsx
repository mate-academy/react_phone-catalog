import { useEffect, useMemo, useState } from 'react';
import { Select } from '../shared/Select';
import styles from './Catalog.module.scss';
import { ProductCard } from '../shared/ProductCard';
import { ProductDetails } from '../../interfaces/Product';
import { Pagination } from '../shared/Pagination';
import { Breadcrumbs } from '../shared/Breadcrumbs';

type Props = {
  title: string;
  service: {
    getAll: () => Promise<ProductDetails[]>;
  };
};

export const Catalog: React.FC<Props> = ({ title, service }) => {
  const [sort, setSort] = useState('newest');
  const [perPage, setPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<ProductDetails[]>([]);

  useEffect(() => {
    service.getAll().then(setItems);
  }, []);

  const visibleItems = useMemo(() => {
    const visible = [...items];

    if (sort === 'alpha') {
      visible.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'cheapest') {
      visible.sort((a, b) => a.priceDiscount - b.priceDiscount);
    }

    const start = (currentPage - 1) * perPage;

    return visible.slice(start, start + perPage);
  }, [sort, items, currentPage, perPage]);

  return (
    <>
      <div className="inline-container">
        <Breadcrumbs />
      </div>
      <section className={styles.catalog}>
        <div className="inline-container">
          <h1 className={`page-title ${styles.catalog__title}`}>{title}</h1>
          <p className={styles.catalog__info}>{items.length} models</p>
          <div className={styles.catalog__sort}>
            <Select
              label="Sort by"
              value={sort}
              onChange={value => {
                setCurrentPage(1);
                setSort(value);
              }}
              options={[
                { label: 'Newest', value: 'newest' },
                { label: 'Alphabetically', value: 'alpha' },
                { label: 'Cheapest', value: 'cheapest' },
              ]}
              className={`${styles.catalog__select} ${styles[`catalog__select--sort`]}`}
            />
            <Select
              label="Items on page"
              value={perPage}
              onChange={value => {
                setCurrentPage(1);
                setPerPage(value);
              }}
              options={[
                { label: '8', value: 8 },
                { label: '14', value: 14 },
                { label: '20', value: 20 },
              ]}
              className={`${styles.catalog__select} ${styles[`catalog__select--perpage`]}`}
            />
          </div>
          <ul className={styles.catalog__list}>
            {visibleItems.map(product => {
              return <ProductCard key={product.id} item={product} />;
            })}
          </ul>
          <Pagination
            className={styles.catalog__pagintaion}
            total={items.length}
            perPage={+perPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>
    </>
  );
};
