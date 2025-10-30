import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './TabletsPage.module.scss';
import iconRight from '../../../public/icons/Chevron (Arrow Right).svg';
import iconHome from '../../../public/icons/Home.svg';

import tablets from '../../../public/api/tablets.json';

export function TabletsPage() {
  return (
    <div className={styles.TabletsPage}>
      <div className={styles.container}>
        <Link to="/">
          <img src={iconHome} alt="home" className={styles.icon__home} />
        </Link>
        <img src={iconRight} alt="icon-right" className={styles.icon__right} />
        <div className={styles.text}>Tablets</div>
      </div>
      <h1>Tablets</h1>
      <div className={styles.productsGrid}>
        {tablets.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
