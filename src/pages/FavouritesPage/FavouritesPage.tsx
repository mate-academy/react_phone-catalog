import { useContext, useEffect, useState } from 'react';

import { BackButton } from '../../components/BackButton';

import {
  FavouritesStorageContext,
} from '../../contexts/FavouritesStorageContext';
import {
  HandleFavouritesStorageContext,
} from '../../contexts/HandleFavouritesStorageContext';
import {
  HandleCartStorageContext,
} from '../../contexts/HandleCartStorageContext';
import { PhoneCard } from '../../components/PhoneCard';

export const FavouritesPage = () => {
  const [totalQuantity, setTotalQuantity] = useState(0);

  const favouritesStorage = useContext(FavouritesStorageContext);
  const setFavouritesStorage = useContext(HandleFavouritesStorageContext);
  const setCartStorage = useContext(HandleCartStorageContext);

  useEffect(() => {
    setFavouritesStorage(JSON.parse(
      localStorage.getItem('favourites') || '[]',
    ));
    setCartStorage(JSON.parse(
      localStorage.getItem('cart') || '[]',
    ));
  }, []);

  useEffect(() => {
    setTotalQuantity(favouritesStorage.length);
  }, [favouritesStorage]);

  return (
    <div className="favourites page__cart">
      <BackButton />

      <h1 className="favourites__title">
        Favourites
      </h1>

      <p className="favourites__count">
        {`${favouritesStorage.length} item${favouritesStorage.length === 1 ? '' : 's'}`}
      </p>

      <div className="favourites__container">
        {!totalQuantity ? (
          <div className="no-results">
            Favourites not found
          </div>
        ) : (
          <div className="favourites__products">
            {favouritesStorage.map(product => (
              <PhoneCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
