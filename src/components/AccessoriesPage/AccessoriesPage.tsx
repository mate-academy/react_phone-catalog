import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './AccessoriesPage.module.scss';
import iconRight from '../../../public/icons/Chevron (Arrow Right).svg';
import iconHome from '../../../public/icons/Home.svg';

import accessories from '../../../public/api/accessories.json';

export function AccessoriesPage() {
  return (
    <div className={styles.AccessoriesPage}>
      <div className={styles.container}>
        <Link to="/">
          <img src={iconHome} alt="home" className={styles.icon__home} />
        </Link>
        <img src={iconRight} alt="icon-right" className={styles.icon__right} />
        <div className={styles.text}>Accessories</div>
      </div>
      <h1>Accessories</h1>
      <div className={styles.productsGrid}>
        {accessories.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
