import { useEffect, useState } from 'react';

import { Breadcrumbs } from '../shared/Breadcrumbs';
import Heading from '../../UI/Heading/Heading';
import ProductsList from '../shared/ProductsList/ProductsList';
import s from './FavoritesPage.module.css';
import { useFavoritesStore } from '../../store/favoritesStore';

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
    <div className={s.content}>
      <div className="container">
        <Breadcrumbs />
        <Heading as="h1" className={s.title}>
          Favorites
        </Heading>

        {favorites.length === 0 && <p>Your favorites list is empty.</p>}

        {favorites.length !== 0 && (
          <>
            <p className={s.quantity}>{`${favorites.length} models`}</p>
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
