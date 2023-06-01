import { NavButtons } from '../NavButtons/NavButtons';
import { Navbar } from '../Navbar/Navbar';
import { Search } from '../Search/Search';
import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <img
        className="header__logo"
        src="/img/Logo.png"
        alt="header logo"
      />

      <Navbar />
      <Search />
      <NavButtons />
    </header>
  );
};
