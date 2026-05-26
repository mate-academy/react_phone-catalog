/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';

import { useParams, useSearchParams, Link } from 'react-router-dom';

import { Product } from '../HomePage/HomePage';

import styles from './CatalogPage.module.scss';

import home from '../../api/icons/Home.png';

import vector from '../../api/icons/Vector.png';

import productsData from '../../data/products.json';
import { ProductCard } from '../../components/ProduuctCard/ProductCard';

export const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);

  const sortBy = searchParams.get('sort') || 'newest';

  const perPage = searchParams.get('perPage') || 'all';

  const displayTitle =
    category === 'phones'
      ? 'Mobile phones'
      : category
        ? category.charAt(0).toUpperCase() + category.slice(1)
        : '';

  useEffect(() => {
    const filtered = (productsData as Product[]).filter(
      p => p.category === category,
    );

    setProducts(filtered);
  }, [category]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'alphabetically') {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === 'cheapest') {
      return a.price - b.price;
    }

    return b.year - a.year;
  });

  const itemsToShow =
    perPage === 'all' ? sortedProducts.length : Number(perPage);

  const visibleProducts = sortedProducts.slice(0, itemsToShow);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ sort: e.target.value, perPage });
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ sort: sortBy, perPage: e.target.value });
  };

  return (
    <main className={styles.catalogPage}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs}>
          <Link to="/" className={styles.crumbLink}>
            <img src={home} alt="home" />
          </Link>
          <div className={styles.arrowIcon}>
            <img src={vector} alt="arrow" />
          </div>
          <span className={styles.currentCrumb}>
            {category === 'phones' ? 'Phones' : category}
          </span>
        </nav>

        <h1 className={styles.title}>{displayTitle}</h1>

        <p className={styles.count}>{products.length} models</p>

        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Sort by</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className={styles.select}
            >
              <option value="newest">Newest</option>
              <option value="alphabetically">Alphabetically</option>
              <option value="cheapest">Cheapest</option>
            </select>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.label}>Items per page</label>
            <select
              value={perPage}
              onChange={handlePerPageChange}
              className={styles.select}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>

        <div className={styles.grid}>
          {visibleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};
