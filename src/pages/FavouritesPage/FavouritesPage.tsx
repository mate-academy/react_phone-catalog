import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { BackButton } from '../../components/BackButton';
import { PhoneCard } from '../../components/PhoneCard';
import { NoSearchResults } from '../../components/NoSearchResults';

import {
  FavouritesStorageContext,
} from '../../contexts/FavouritesStorageContext';
import {
  HandleFavouritesStorageContext,
} from '../../contexts/HandleFavouritesStorageContext';
import {
  HandleCartStorageContext,
} from '../../contexts/HandleCartStorageContext';

import { Phone } from '../../types/Phone';

const title = 'Favourites';

export const FavouritesPage = () => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [
    visibleFavourites,
    setVisibleFavourites,
  ] = useState<Phone[] | null>(null);

  const favouritesStorage = useContext(FavouritesStorageContext);
  const setFavouritesStorage = useContext(HandleFavouritesStorageContext);
  const setCartStorage = useContext(HandleCartStorageContext);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.split('+').join(' ') || '';

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

  useEffect(() => {
    const filteredProducts = favouritesStorage?.filter(product => (
      product.name.trim().toLowerCase().includes(query.toLowerCase())
    ));

    setVisibleFavourites(filteredProducts || []);
  }, [query, favouritesStorage]);

  return (
    <div className="favourites page__cart">
      <BackButton />

      <h1 className="favourites__title">
        {title}
      </h1>

      <p className="favourites__count">
        {`${visibleFavourites?.length} item${visibleFavourites?.length === 1 ? '' : 's'}`}
      </p>

      {(favouritesStorage.length !== visibleFavourites?.length) ? (
        <NoSearchResults title={title} />
      ) : (
        <div className="favourites__container">
          {!totalQuantity ? (
            <div className="no-results">
              Favourites not found
            </div>
          ) : (
            <div className="favourites__products">
              {visibleFavourites?.map(product => (
                <PhoneCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
