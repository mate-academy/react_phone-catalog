import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PhonesPage.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import iconRight from '../../../public/icons/Chevron (Arrow Right).svg';
import iconHome from '../../../public/icons/Home.svg';

import phones from '../../../public/api/phones.json';

export function PhonesPage() {
  return (
    <div className={styles.PhonesPage}>
      <div className={styles.container}>
        <Link to="/">
          <img src={iconHome} alt="home" className={styles.icon__home} />
        </Link>
        <img src={iconRight} alt="icon-right" className={styles.icon__right} />
        <div className={styles.text}>Phones</div>
      </div>
      <h1 className={styles.h1}>Mobile phones</h1>
      <div className={styles.productsGrid}>
        {phones.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
