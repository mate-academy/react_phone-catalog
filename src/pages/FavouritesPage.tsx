import React from 'react';
import { useSelector } from 'react-redux';
import { getFavourites } from '../store/index';
import PhoneCard from '../components/PhoneCard/PhoneCard';
import './Favourites.scss';

export const FavoritesPage = () => {
  const favourites = useSelector(getFavourites);

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="PhonesPage__head">
            Favourites
          </h1>
          <p className="PhonesPage__length">
            {favourites.length}
            {' '}
            models
          </p>
          {favourites.length === 0 ? <h1 className="Favourites__noproducts">No favorites products yet</h1> : (
            <div className="Favourites__container">
              {favourites.map((favourite: Products) => (
                <PhoneCard phone={favourite} />
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
};
