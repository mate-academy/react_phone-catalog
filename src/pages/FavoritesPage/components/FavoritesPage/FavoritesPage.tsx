import { useContext } from 'react';
import { ProductsList } from '../../../ProductPage/ProductsList';
import { FavoritesContext } from '../../../../context/FavoritesContext';
import './FavoritesPage.scss';

export const FavoritesPage: React.FC = () => {
  const { favoriteProducts } = useContext(FavoritesContext);

  return (
    <main className="product-page">
      <section className="product-page__top">
        <nav className="product-page-nav">
          <img
            className="product-page-nav__home"
            src="./icons/home.svg"
            alt="home icon"
          />
          <img
            className="product-page-nav__next"
            src="./icons/arrow-right-disabled.svg"
            alt="right arrow image"
          />
          <p className="product-page-nav__category">favorites</p>
        </nav>
        <div className="product-page__main-info">
          <h1 className="product-page__title">Favorites</h1>
          <p className="product-page__models-count">95 items TODO</p>
        </div>
      </section>

      <section className="favorites__products-wrapper">
        <ProductsList products={favoriteProducts} />
      </section>
    </main>
  );
};
