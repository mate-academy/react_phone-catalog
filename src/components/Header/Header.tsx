import { Nav } from '../Nav';
import { Favourites } from '../Favourites';
import { Logo } from '../Logo/Logo';
import { Cart } from '../Cart';

export const Header = () => (
  <header className="header">
    <div className="header__nav-container">
      <Logo />

      <Nav />
    </div>

    <div className="header__button-container">
      <Favourites />

      <Cart />
    </div>
  </header>
);
