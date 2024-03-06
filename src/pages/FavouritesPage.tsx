import { NavLink } from 'react-router-dom';
import { Product } from '../types/Product';
import { CartItem } from '../types/CartItem';
import { ProductCart } from '../components/ProductCard';

type Props = {
  setCartItems: (item: CartItem[]) => void;
  cartItems: CartItem[];
  favourites: Product[];
  setFavourites: (products: Product[]) => void;
};

export const FavouritesPage: React.FC<Props> = ({
  setCartItems,
  cartItems,
  favourites,
  setFavourites,
}) => {
  return (
    <div className="favorites">
      <div className="page-path-icons phone-page__path">
        <NavLink to="/" className="icon icon--home" />
        <p className="icon icon--slider" />
        <p className="page-path-icons__location">Favorites</p>
      </div>

      <div className="page-title">
        <h1 className="page-title__title">Favorites</h1>
        <p className="page-title__items-count">{`${favourites.length} items`}</p>
      </div>

      <div className="favourites__list">
        {favourites.map((favourite) => (
          <ProductCart
            product={favourite}
            cartItems={cartItems}
            setCartItems={setCartItems}
            favourites={favourites}
            setFavourites={setFavourites}
          />
        ))}
      </div>
    </div>
  );
};
