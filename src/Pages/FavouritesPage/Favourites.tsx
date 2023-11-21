import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader, ProductCard } from '../../Components';
import { Navigation } from '../../Components/Navigation/Navigation';

import './favourites.scss';
import { useAppSelector } from '../../app/hooks';

type Props = {
  isLoading: boolean;
};

export const FavouritesPage: React.FC<Props> = ({
  isLoading,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const favourites = useAppSelector(state => state.favourites);

  const searchInPhones = favourites
    .filter((product) => product.name
      .toLowerCase()
      .includes(searchQuery.trim()
        .toLowerCase()));

  return (
    <>
      <Navigation
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {isLoading && <Loader />}

      {!isLoading && (
        <main>
          <section className="favourites">
            <div className="breadcrumbs">
              <Link
                to="/"
                className="breadcrumbs__button breadcrumbs__icon"
              />
              <div className="breadcrumbs__arrow breadcrumbs__icon" />
              <p>
                Favourites
              </p>
            </div>
            <div className="title">
              <h1>Favourites</h1>

              <p className="title__p">{`${searchInPhones.length} models`}</p>
            </div>

            <div className="favourites__list">
              {searchInPhones.map(phone => (
                <ProductCard phone={phone} key={phone.id} />
              ))}
            </div>
          </section>
        </main>
      )}
    </>
  );
};
