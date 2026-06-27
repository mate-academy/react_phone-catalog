import styles from './FavoritesPage.module.scss';
import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { FavoriteContent } from './FavoriteContent';
import { Loader } from '../shared/components/UI/Loader';

export const FavoritesPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <FavoriteContent />
    </div>
  );
};
