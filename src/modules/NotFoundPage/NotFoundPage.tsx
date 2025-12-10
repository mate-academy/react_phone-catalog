import React from 'react';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';
import { SliderComponent } from '../HomePage/components/SliderComponent';
import { recentlyViewedService } from '../shared/components/utils/RecentlyViewed/RecentlyViewed';
import { Product } from '@/types';

const NotFoundPage: React.FC = () => {
  const recentlyViewedItems = recentlyViewedService.get();
  const normilizedItems: Product[] = recentlyViewedItems.filter(
    (item): item is Product => item !== null,
  );
  console.log(normilizedItems);

  return (
    <section className={styles.notFoundPage}>
      <div className={styles.notFoundPage__content}>
        <h1 className={styles.notFoundPage__title}>Помилка 404</h1>
        <p className={styles.notFoundPage__message}>Сторінку не знайдено</p>
        <p className={styles.notFoundPage__suggestion}>
          Спробуйте перевірити URL або повернутися на головну сторінку.
        </p>
        <Link to="/" className={styles.notFoundPage__homeLink}>
          <button>На головну</button>
        </Link>
        <SliderComponent
          products={normilizedItems}
          title="Нещодавно переглянуті"
        />
      </div>
    </section>
  );
};

export default NotFoundPage;
