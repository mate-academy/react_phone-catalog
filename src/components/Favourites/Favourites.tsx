import './Favourites.scss';
import arrow from '../../../image/arrow.svg';
import home from '../../../image/home.svg';
import { useFavourites } from './FacouritesContext';
import { ProductItem } from '../ProductItem/ProductItem';

export const FavouritesPage = () => {
  const { favorites } = useFavourites();

  return (
    <main className="favourites">
      <div className="mobilelink">
        <img src={home} alt="mobilelink__home" />
        <span>
          <img src={arrow} alt="mobilelink__arrow" />
        </span>
        <p className="mobilelink__title">Favourites</p>
      </div>
      <h1 className="page__title">Favourites</h1>

      {favorites.length === 0 ? (
        <div className="nothing">
          <img
            className="product_yet"
            src="assets\page-not-found.png"
            alt="No_favorite_product_yet"
          />
        </div>
      ) : (
        <div className="favourites__card">
          {favorites.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};
