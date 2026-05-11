import React, { useEffect, useMemo, useState } from 'react';
import styles from './CatalogPage.module.scss';
import { getCountByCategorys } from '../shared/constants/Categorys';
import { getData } from '../../api/fetchClient';
import { Product } from '../../types/ProductType';
import { Icon } from '../../components/Icon';
import { ProductCard } from '../../components/ProductCard';
import { Dropdown } from '../../components/Dropdown';
import { PerPageType } from '../../types/PerPageType';
import { SortType } from '../../types/SortType';
import { Navigate, useParams } from 'react-router-dom';
import { PathLine } from '../../components/PathLine/PathLine';

export const CatalogPage = () => {
  const { category } = useParams<{ category: string }>();

  const [counts, setCounts] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);

  const [sort, setSort] = useState<SortType>('name');
  const [perPage, setPerPage] = useState<PerPageType>(16);

  const [page, setPage] = useState<number>(1);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const prData = await getData();

      setProducts(prData);
      setPerPage(16);
    }

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

  const handlePagePrev = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const handlePageNext = () => {
    if (page < pageCount) {
      setPage(prev => prev + 1);
    }
  };

  const handlePageSet = (value: number | string) => {
    const pageValue = +value;

    if (
      pageValue <= pageCount &&
      pageValue > 0 &&
      typeof pageValue === 'number'
    ) {
      setPage(pageValue);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [sort, perPage]);

  const pages = useMemo(() => {
    const mass: (number | string)[] = [];
    let range = 4;

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
      <div className={styles.section}>
        <div className={styles.top}>
          <PathLine />
          <div className={styles.title}>
            <div className={styles.title__text}>
              {category === 'phones'
                ? 'Mobile phones'
                : category === 'tablets'
                  ? 'Tablets'
                  : 'Accessories'}
            </div>
            <div className={styles.title__count}>{counts} models</div>
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
              discont={product.year <= lastYear - 3}
            />
          ))}
        </div>
        <div className={styles.pagination}>
          <div
            className={`${styles.pagination__prev} ${styles.pagination__button}`}
            onClick={() => handlePagePrev()}
          >
            <Icon name="arrowleft" className={styles.prev} />
          </div>
          <div className={styles.pagination__container}>
            {pages.map(p => (
              <div
                key={p}
                className={`${styles.pagination__button} ${page === p && styles.pagination__active}`}
                onClick={() => handlePageSet(p)}
              >
                {p}
              </div>
            ))}
          </div>
          <div
            className={`${styles.pagination__next} ${styles.pagination__button}`}
            onClick={() => handlePageNext()}
          >
            <Icon name="arrowright" className={styles.next} />
          </div>
        </div>
      </div>
    </>
  );
};
