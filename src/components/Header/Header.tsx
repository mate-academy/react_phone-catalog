import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { Search } from './Search/Search';

import './Header.scss';
import { HeaderActions } from './HeaderActions';
import { Menu } from './Menu';

export const Header = () => (
  <header className="Header">
    <div className="Header__navigation">
      <Logo />
      <Navigation />
    </div>

    <Search />

    <HeaderActions />

    <Menu />
  </header>
);
