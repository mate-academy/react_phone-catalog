import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { Search } from './Search/Search';

export const Header = () => (
  <header className="Header">
    <div className="Header__navigation">
      <Logo />
      <Navigation />
    </div>

    <Search />
  </header>
);
