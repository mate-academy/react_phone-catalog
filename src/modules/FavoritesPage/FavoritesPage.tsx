import { useEffect, useState } from 'react';

import Heading from '../../UI/Heading/Heading';
import { useFavoritesStore } from '../../store/favoritesStore';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import ProductsList from '../shared/ProductsList/ProductsList';
import styles from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const [isChangingPage, setIsChangingPage] = useState(false);

  const favorites = useFavoritesStore(state => state.favorites);

  const handleLoadCard = () => {
    setIsChangingPage(true);
    setTimeout(() => {
      setIsChangingPage(false);
    }, 800);
  };

  useEffect(() => {
    handleLoadCard();
  }, []);

  return (
    <div className={styles.content}>
      <div className="container">
        <Breadcrumbs />
        <Heading as="h1" className={styles.title}>
          Favorites
        </Heading>

        {favorites.length === 0 && (
          <Heading as="h3">Your favorites list is empty. 🥲</Heading>
        )}

        {favorites.length !== 0 && (
          <>
            <p className={styles.quantity}>
              {favorites.length} {favorites.length === 1 ? 'item' : 'items'}
            </p>
            <ProductsList
              products={favorites}
              isChangingPage={isChangingPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
