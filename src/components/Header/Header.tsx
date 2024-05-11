import { Logo } from '../Logo';
import { Navigation } from '../Navigation/Navigation';
import { NavSearch } from '../NavSearch/NavSearch';
import { NavButtons } from '../NavButtons/NavButtons';
import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <Logo className="header__logo" />
      <Navigation />
      <NavSearch />
      <NavButtons />
    </header>
  );
};
