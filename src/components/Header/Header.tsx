import './Header.scss';

import { CartButton } from '../CartButton';
import { FavouritesButton } from '../FavouritesButton';
import { Logo } from '../Logo';
import { Navbar } from '../Navbar';
// import { Search } from '../Search';

export const Header: React.FC = () => {
  return (
    <header className="page__header header">
      <div className="header__left">
        <Logo />

        <Navbar />
      </div>

      <div className="header__right">
        {/* <Search /> */}

        <FavouritesButton />

        <CartButton />
      </div>
    </header>
  );
};
