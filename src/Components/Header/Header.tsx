import { useContext } from 'react';
import { CartContext } from '../Context/CartContextProvider';
import { FavContext } from '../Context/FavContextProvider';
import { Search } from '../Search';
import { Nav } from '../Nav';
import { Logo } from '../Logo';
import { HeaderButton } from '../HeaderButton';
import './Header.scss';

export const Header = () => {
  const { cart } = useContext(CartContext);
  const { fav } = useContext(FavContext);

  return (
    <header className="Header">
      <div className="Header__content">
        <div className="Header__left">
          <Logo />
          <Nav />
        </div>

        <div className="Header__right">
          <Search />
          <HeaderButton link="/favourites" name="fav" totalQty={fav} />
          <HeaderButton link="/cart" name="cart" totalQty={cart} />
        </div>
      </div>
    </header>
  );
};
