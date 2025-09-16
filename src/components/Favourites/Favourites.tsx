import { NavLink } from 'react-router-dom';
import { useFavourites } from './FavouritesContext';
import home from '../../assets/icons/home.svg';
import goto from '../../assets/icons/arrowRight.svg';
import { ProductItem } from '../ProductItem/ProductItem';

export const FavouritesPage = () => {
  const { favourites } = useFavourites();

  return (
    <main className="favourites">
      <div className="productLink">
        <NavLink to="/">
          <img src={home} alt="home" />
        </NavLink>
        <span>
          <img src={goto} alt="goto" />
        </span>
        <p className="productLink__title">Favourites</p>
      </div>
      <h1 className="page__title">Favourites</h1>
      {favourites.length === 0 ? (
        <div className="none">
          <img
            src="img/page-not-found.png"
            alt="Favourites have not been chosen"
            className="product__empty"
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
