import './Favourites.scss';
import goto from '../../img/arrowRight.svg';
import home from '../../img/home.svg';
import er404 from '../../../public/img/page-not-found.png';
import { useFavourites } from './FavouritesContext';
import { ProductItem } from '../ProductItem/ProductItem';
import { NavLink } from 'react-router-dom';

export const FavPage = () => {
  const { favourites } = useFavourites();

  return (
    <main className="favourites">
      <div className="mobilelink">
        <NavLink to="/">
          <img src={home} alt="home" />
        </NavLink>

        <span>
          <img src={goto} alt="goto" />
        </span>
        <p className="mobilelink__title">Favourites</p>
      </div>
      <h1 className="page__title">Favourites</h1>

      {favourites.length === 0 ? (
        <div className="none">
          <img
            className="product__empty"
            src={er404}
            alt="Favourites have not been chosen"
          />
        </div>
      ) : (
        <div className="favourites__card">
          {favourites.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};
