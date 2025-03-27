import './Favourites.scss';
// import { useNavigate } from 'react-router-dom';
import arrow from '../../../image/arrow.svg';
// import back from '../../../image/back.svg';
import home from '../../../image/home.svg';
import { useFavourites } from './FacouritesContext';
import { ProductItem } from '../ProductItem/ProductItem';
// import { useInfoHook } from '../ProductInformation/InfoHook';

export const FavouritesPage = () => {
  // const navigate = useNavigate();
  const { favorites } = useFavourites();
  // const { products } = useInfoHook();

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
