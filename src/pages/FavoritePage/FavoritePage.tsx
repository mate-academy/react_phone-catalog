import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './FavoritePage.scss';
import { ProductList } from '../../components/ProductsList/ProductsList';
import { Error } from '../../components/Error/Error';
import { Context } from '../../helpers/ContextProvider';

export const FavoritePage: React.FC = () => {
  const { favorite } = useContext(Context);

  return (
    <div className="container favorite-page">
      <div className="breadcrumps">
        <Link to="/" className="breadcrumps__item">
          <img src="./assets/home.svg" alt="home-icon" />
        </Link>
        <img
          src="./assets/arrow-next-grey.svg"
          className="breadcrumps__divider"
          alt="arrow-next"
        />
        <p className="text__small text__small--secondary breadcrumps__item">
          Favourites
        </p>
      </div>
      <h1 className="title__h1 title__h1-primary favorite-page__title">
        Favourites
      </h1>
      <section className="favorite-page__content">
        {favorite ? (
          <ProductList products={favorite} />
        ) : (
          <Error text="Currently there are no favorite products" />
        )}
      </section>
    </div>
  );
};
