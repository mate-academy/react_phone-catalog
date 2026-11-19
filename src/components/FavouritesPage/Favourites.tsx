/* eslint-disable max-len */

import { Link } from 'react-router-dom';
import productsFromServer from '../../../public/api/products.json';
import { useFavourites } from '../../context/FavouritesContext';
import { ProductList } from '../Product/ProductList/ProductList';
import './Favourites.scss';

export const Favourites = () => {
  const { favourites } = useFavourites();

  const favouriteProducts = productsFromServer.filter(product =>
    favourites.includes(product.itemId),
  );

  return (
    <main className="favourites-main">
      <div className="favourites-location">
        <div className="favourites-location__path">
          <Link to={'/'}>
            <img
              className="favourites-location__icon"
              src="icons/Home.png"
              alt=""
            />
          </Link>
          <svg
            className="button__next-img"
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
          >
            <path
              d="M0.195262 0.195262C0.455612 -0.0650874 0.877722 -0.0650874 1.13807 0.195262L5.13807 4.19526C5.39842 4.45561 5.39842 4.87772 5.13807 5.13807L1.13807 9.13807C0.877722 9.39842 0.455612 9.39842 0.195262 9.13807C-0.0650874 8.87772 -0.0650874 8.45561 0.195262 8.19526L3.72386 4.66667L0.195262 1.13807C-0.0650874 0.877722 -0.0650874 0.455612 0.195262 0.195262Z"
              fillRule="evenodd"
              clipRule="evenodd"
              fill={'#4A4D58'}
            />
          </svg>
          <p className="favourites-location__text">Favourites</p>
        </div>
      </div>
      <h1 className="favourites-main__title">
        Favourites
        <p className="favourites-models__count">{`${favouriteProducts.length} items`}</p>
      </h1>
      {favourites.length === 0 ? (
        <p className="favourites-main__empty">
          You have not added anything to favourites yet.
        </p>
      ) : (
        <section className="favourites-products">
          <ProductList
            products={
              favouriteProducts as Parameters<typeof ProductList>[0]['products']
            }
            column={true}
          />
        </section>
      )}
    </main>
  );
};
