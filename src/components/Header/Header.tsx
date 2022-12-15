import { NavLink } from 'react-router-dom';
import { Nav } from './Nav/Nav';
import './Header.scss';
import { Logo } from '../UI/Logo/Logo';

export const Header = () => {
  const pages = [
    { title: 'Home', link: '/' },
    { title: 'Phones', link: '/phones' },
    { title: 'Tablets', link: '/tablets' },
    { title: 'Accessories', link: '/accessories' },
  ];

  return (
    <header className="header">
      <div className="header__nav">
        <Logo />
        <Nav pages={pages} />
      </div>
      <div className="header__icons">
        <NavLink to="/favorites" className="header__favorites" />
        <NavLink to="/cart" className="header__cart" />
      </div>
    </header>
  );
};
