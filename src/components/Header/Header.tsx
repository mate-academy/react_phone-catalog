import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { Search } from './Search/Search';

import './Header.scss';
import { Menu } from './Menu';
import { HeaderActions } from './HeaderActions';

export const Header = () => (
  <header className="header">
    <div className="header__navigation">
      <Logo />
      <Navigation />
    </div>

    <Search />

    <HeaderActions />

    <Menu />
  </header>
);
