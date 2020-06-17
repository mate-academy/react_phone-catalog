import React from 'react';
import { useSelector } from 'react-redux';
import { getFavourites } from '../store/index';
import PhoneCard from '../components/PhoneCard/PhoneCard';
import './Favourites.scss';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { GoBackButton } from '../components/Buttons/GoBack';

export const FavoritesPage = () => {
  const favourites = useSelector(getFavourites);

  return (
    <>
      <section className="section">
        <div className="container">
          <section className="wrap__container">
            <Breadcrumbs />
          </section>
          {favourites.length === 0
            ? (
              <div className="wrapper">
                <GoBackButton />
                <h1>No favourites products yet</h1>
              </div>
            ) : (
              <>
                <h1 className="PhonesPage__head">
                  Favourites
                </h1>
                <p className="PhonesPage__length">
                  {favourites.length}
                  {' '}
                  models
                </p>
                <div className="Favourites__container">
                  {favourites.map((favourite: Products) => (
                    <PhoneCard phone={favourite} key={favourite.id} />
                  ))}
                </div>
              </>
            )}

        </div>
      </section>
    </>
  );
};
