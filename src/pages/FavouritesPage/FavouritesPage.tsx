import React from 'react';
import NavMain from '../../components/NavMain/NavMain';

const FavouritesPage: React.FC = () => {
  return (
    <div className="container favourites__container">
      <div className="favourites">
        <NavMain />

        <h1 className="favourites__title">Favourites</h1>

        <span className="favourites__item">5 items</span>

        <div className="favourites__block">
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;
