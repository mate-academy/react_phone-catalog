import './Header.scss';

import { CartItem } from '../../types/CartItem';
import { CartButton } from '../CartButton';
import { FavouritesButton } from '../FavouritesButton';
import { Logo } from '../Logo';
import { Navbar } from '../Navbar';
// import { Search } from '../Search';

type Props = {
  cartItems: CartItem[];
};

export const Header: React.FC<Props> = ({
  cartItems,
}) => {
  return (
    <header className="page__header header">
      <div className="header__left">
        <Logo />

        <Navbar />
      </div>

      <div className="header__right">
        {/* <Search /> */}

        <FavouritesButton />

        <CartButton cartItems={cartItems} />
      </div>
    </header>
  );
};
