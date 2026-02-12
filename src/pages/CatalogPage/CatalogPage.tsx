/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useMemo, useState } from 'react';
import Alert from '@mui/material/Alert';
import styles from './CatalogPage.module.scss';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/api';
import { Loader } from '../../components/Loader';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Dropdown } from '../../components/Dropdown';
import { Pagination } from '../../components/Pagination';

interface Props {
  title: string;
  category: 'phones' | 'tablets' | 'accessories';
}

export const CatalogPage: React.FC<Props> = ({ title, category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const modelsAmount = products.length;

  const sortBy = searchParams.get('sort') || 'age';
  const itemsOnPage = searchParams.get('perPage') || `${products.length}`;
  const currentPage = searchParams.get('page') || '1';

  const totalPages = itemsOnPage ? Math.ceil(modelsAmount / +itemsOnPage) : 1;

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sortBy) {
      case 'price':
        return sorted.sort((a, b) => a.price - b.price);
      case 'title':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'age':
      default:
        return sorted.sort((a, b) => b.year - a.year);
    }
  }, [products, sortBy]);

  const currentProducts = useMemo(() => {
    const start = (+currentPage - 1) * +itemsOnPage;
    const end = +currentPage * +itemsOnPage;

    return sortedProducts.slice(start, end);
  }, [sortedProducts, currentPage, itemsOnPage]);

  useEffect(() => {
    setLoading(true);
    setError('');

    getProducts()
      .then(data => {
        const filteredData = data.filter(item => item.category === category);

        setProducts(filteredData);
      })
      .catch(() => {
        setError('Unable to load data');

        setTimeout(() => {
          navigate('..');
          setError('');
        }, 5000);
      })
      .finally(() => setLoading(false));
  }, [category, navigate]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div style={{ marginTop: 50 }}>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  if (products.length === 0 && !error && !loading) {
    return (
      <div style={{ marginTop: 50 }}>
        <Alert severity="warning">There are no {category} yet</Alert>
      </div>
    );
  }

  return (
    <section className={classNames('section', styles.catalog)}>
      <BreadCrumbs
        products={products}
        classNameProps={styles.catalog__breadcrumbs}
      />
      <h1 className={classNames('title', styles.catalog__title)}>{title}</h1>
      <p className={styles.catalog__amount}>{modelsAmount} models</p>

      <div className={styles.catalog__filters}>
        <Dropdown name="sort" className={styles.filters__item} />
        <Dropdown name="perPage" className={styles.filters__item} />
      </div>

      <div
        className={classNames(
          styles['catalog__product-list'],
          styles['product-list'],
        )}
      >
        {currentProducts.map(product => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              classNameProp={styles['product-list__item']}
            />
          );
        })}
      </div>

      {totalPages > 1 && (
        <Pagination
          className={styles.catalog__pagination}
          currentPage={+currentPage}
          totalPages={totalPages}
        />
      )}
    </section>
  );
};
