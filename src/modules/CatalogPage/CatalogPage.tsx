import React, { useEffect, useMemo, useState } from 'react';
import styles from './CatalogPage.module.scss';
import { getCountByCategorys } from '../shared/constants/Categorys';
import { getProductData } from '../../api/fetchClient';
import { Product } from '../../types/ProductType';
import { Icon } from '../../components/Icon';
import { ProductCard } from '../../components/ProductCard';
import { Dropdown } from '../../components/Dropdown';
import { PerPageType } from '../../types/PerPageType';
import { SortType } from '../../types/SortType';
import { Navigate, useParams } from 'react-router-dom';
import { PathLine } from '../../components/PathLine/PathLine';
import { Loader } from '../../components/Loader';
import { useLocalStorage } from '../shared/hooks/useLocalStorage';

export const CatalogPage = () => {
  const { category } = useParams<{ category: string }>();
  const [loader, setLoader] = useState<boolean>(true);

  const [counts, setCounts] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);

  const [sort, setSort] = useLocalStorage<SortType>('sort_type', 'name');
  const [perPage, setPerPage] = useLocalStorage<PerPageType>('on_page', 16);

  const [page, setPage] = useState<number>(1);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const prData = await getProductData();

      setProducts(prData);
      setLoader(false);
    }

    setLoader(true);

    fetchData();
  }, []);

  useEffect(() => {
    async function getCountByCategory() {
      const pcData = await getCountByCategorys();

      if (category === 'phones') {
        setCounts(pcData.phoneCounts);
      } else if (category === 'tablets') {
        setCounts(pcData.tabletCounts);
      } else {
        setCounts(pcData.accessorieCounts);
      }
    }

    getCountByCategory();
  }, [category]);

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

  const pageCount = useMemo(() => {
    if (!products) {
      return 1;
    }

    const totalItems = products.filter(p => p.category === category).length;

    return Math.ceil(totalItems / perPage) || 1;
  }, [products, category, perPage]);

  const handlePageSet = (value: number | string) => {
    const pageValue = +value;

    if (
      pageValue <= pageCount &&
      pageValue > 0 &&
      typeof pageValue === 'number'
    ) {
      setPage(pageValue);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    setPage(1);
  }, [sort, perPage]);

  const pages = useMemo(() => {
    const mass: (number | string)[] = [];
    let range;

    if (screenWidth >= 1200) {
      range = 8;
    } else if (screenWidth >= 768) {
      range = 7;
    } else if (screenWidth >= 640) {
      range = 6;
    } else if (screenWidth >= 480) {
      range = 5;
    } else {
      range = 4;
    }

    if (pageCount <= range) {
      for (let i = 1; i <= pageCount; i++) {
        mass.push(i);
      }

      return mass;
    }

    mass.push(1);

    const middleCount = range - 3;

    let start = Math.max(2, page - Math.floor(middleCount / 2));

    if (start + middleCount > pageCount - 1) {
      start = pageCount - middleCount;
    }

    for (let i = 0; i < middleCount; i++) {
      mass.push(start + i);
    }

    const lastNumberInMass = mass[mass.length - 1] as number;

    if (lastNumberInMass < pageCount - 1) {
      mass.push('...');
    } else if (lastNumberInMass === pageCount - 1) {
    }

    if (mass[mass.length - 1] !== pageCount) {
      mass.push(pageCount);
    }

    return mass;
  }, [pageCount, page, screenWidth]);

  if (category && !['phones', 'tablets', 'accessories'].includes(category)) {
    return <Navigate to="/not-found" />;
  }

  const filteredYears =
    products
      ?.filter(prod => prod.category === category)
      .map(prod => prod.year) || [];

  const lastYear = filteredYears.length > 0 ? Math.max(...filteredYears) : 2026;

  return (
    <>
      <div className={styles.page}>
        <div className={styles.top}>
          <PathLine />
          <div className={styles.title}>
            <h1>
              {category === 'phones'
                ? 'Mobile phones'
                : category === 'tablets'
                  ? 'Tablets'
                  : 'Accessories'}
            </h1>
            <div className={styles.count}>{counts} models</div>
          </div>
          <Dropdown
            sort={sort}
            updateSort={setSort}
            perPage={perPage}
            updatePerPage={setPerPage}
          />
        </div>

        <div className={styles.items}>
          {loader ? (
            <Loader />
          ) : (
            visibleProducts?.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                discount={product.year <= lastYear - 3}
              />
            ))
          )}
        </div>
        <div className={styles.pagination}>
          <div
            className={`
              ${styles.button}
              ${styles['button--control']}
              ${page !== 1 && [styles['button--control--active']]}
             `}
            onClick={() => handlePageSet(page - 1)}
          >
            <Icon name="arrowleft" className={styles.icon} />
          </div>
          <div className={styles.container}>
            {pages.map(p => (
              <div
                key={p}
                className={`${styles.button} ${page === p && styles['button--active']}`}
                onClick={() => handlePageSet(p)}
              >
                {p}
              </div>
            ))}
          </div>
          <div
            className={`
              ${styles.button}
              ${styles['button--control']}
              ${page < pageCount && [styles['button--control--active']]}
            `}
            onClick={() => handlePageSet(page + 1)}
          >
            <Icon name="arrowright" className={styles.icon} />
          </div>
        </div>
      </div>
    </>
  );
};
