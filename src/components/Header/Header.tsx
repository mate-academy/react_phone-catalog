import { Nav } from '../Nav';
import { Logo } from '../Logo';
import { SavedItemsButton } from '../SavedItemsButton';

import './Header.scss';

export const Header = () => {
  return (
    <header className="Header">
      <div className="Header__content">
        <div className="Header__left-side">
          <div className="Header__logo-container">
            <Logo />
          </div>

          <Nav />
        </div>

        <div className="Header__right-side">
          <SavedItemsButton type="favs" />
          <SavedItemsButton type="cart" />
        </div>
      </div>
    </header>
  );
};
