import { useProducts } from '../../context';
import { useCart } from '../../context/cartContext';
import { NavIcon } from '../NavIcon';
import { Navigation } from '../Navigation';
import { Search } from '../Search';
import './Header.scss';

export const Header = () => {
  const { favourites } = useProducts();
  const { totalQuantity } = useCart();

  const favCount = favourites.length;

  return (
    <header className="header">
      <Navigation />

      <div className="header__search-container">
        <Search />

        <div className="header__rightside">
          <NavIcon
            path="favourites"
            alt="like-icon"
            src="img/icons/like.svg"
            count={favCount}
          />

          <NavIcon
            path="cart"
            alt="cart-icon"
            src="img/icons/cart.svg"
            count={totalQuantity}
          />
        </div>
      </div>

    </header>
  );
};
