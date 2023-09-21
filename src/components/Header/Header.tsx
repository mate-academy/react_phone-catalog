import { useCart, useProducts } from 'context';
import { Navigation } from 'components/Navigation';
import { Search } from 'components/Search';
import { NavIcon } from 'components/NavIcon';
import './Header.scss';
import { BurgerMenu } from 'components/BurgerMenu';

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
        <BurgerMenu />
      </div>
    </header>
  );
};
