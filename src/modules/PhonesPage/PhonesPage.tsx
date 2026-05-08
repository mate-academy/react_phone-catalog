import React, { useEffect, useMemo, useState } from 'react';
import styles from './PhonesPage.module.scss';
import { getCountByCategorys } from '../shared/constants/Categorys';
import { getData } from '../../api/fetchClient';
import { Product } from '../../types/ProductType';
import { Icon } from '../../components/Icon';
import { ProductCard } from '../../components/ProductCard';
import { Dropdown } from '../../components/Dropdown';
import { PerPageType } from '../../types/PerPageType';
import { SortType } from '../../types/SortType';

export const PhonesPage = () => {
  const [phoneCounts, setPhoneCounts] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);

  const [sort, setSort] = useState<SortType>('name');
  const [perPage, setPerPage] = useState<PerPageType>(16);

  const [page, setPage] = useState<number>(1);
  const [category, setCategory] = useState('phones');

  useEffect(() => {
    async function fetchData() {
      const pcData = await getCountByCategorys();
      const prData = await getData();

      setPhoneCounts(pcData.phoneCounts);
      setProducts(prData);
      setPerPage(16);
    }

    fetchData();
  }, []);

  const visibleProducts = useMemo(() => {
    if (!products) {
      return [];
    }

    let result = products.filter(p => p.category === category);

    switch (sort) {
      case 'name':
        result = [...result].sort((f, s) => s.name.localeCompare(f.name));
        break;
      case 'date':
        result = [...result].sort((f, s) => s.year - f.year);
        break;
      case 'price':
        result = [...result].sort((f, s) => f.price - s.price);
        break;
    }

    return result.slice((page - 1) * perPage, page * perPage);
  }, [products, sort, page, perPage, category]);

  return (
    <>
      <div className={styles.section}>
        <div className={styles.top}>
          <div className={styles.path}>
            <div className={styles.path__icon}>
              <Icon name="home" />
            </div>
          </div>

          <div className={styles.title}>
            <div className={styles.title__text}>Mobile phones</div>
            <div className={styles.title__count}>{phoneCounts} models</div>
          </div>
          <Dropdown
            sort={sort}
            updateSort={setSort}
            perPage={perPage}
            updatePerPage={setPerPage}
          />
        </div>

        <div className={styles.items}>
          {visibleProducts?.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              discont={product.year <= 2020 ? true : false}
            />
          ))}
        </div>
      </div>
    </>
  );
};
