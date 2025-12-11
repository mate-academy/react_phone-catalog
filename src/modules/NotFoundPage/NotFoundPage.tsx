import React from 'react';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';
import { SliderComponent } from '../HomePage/components/SliderComponent';
import { recentlyViewedService } from '../shared/components/utils/RecentlyViewed/RecentlyViewed';

const NotFoundPage: React.FC = () => {
  const recentlyViewedItems = recentlyViewedService.get();



  return (
    <section className={styles.notFoundPage}>
      <div className={styles.notFoundPage__content}>
        <h1 className={styles.notFoundPage__title}>Error 404</h1>
        <p className={styles.notFoundPage__message}>Page not found</p>
        <p className={styles.notFoundPage__suggestion}>
          Please check the URL or return to the homepage.
        </p>
        <Link to="/" className={styles.notFoundPage__homeLink}>
          <button>To Home</button>
        </Link>
        <SliderComponent
          products={recentlyViewedItems}
          title="Recently Viewed"
        />
      </div>
    </section>
  );
};

export default NotFoundPage;
