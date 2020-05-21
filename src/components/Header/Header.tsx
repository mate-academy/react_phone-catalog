import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';
import { Nav } from '../Nav';
import { Search } from '../Search';

export const Header = () => (
  <header className="Header">
    <Link to="/" className="Header__Logo">
<<<<<<< HEAD
      <img src="./img/logo.svg" alt="Logo" />
=======
      <img src="./images/logo.svg" alt="Logo" />
>>>>>>> 0f85870208bc0b539be1c7f7541a15daf9083a8f
    </Link>
    <Nav />
    <Search />
    <Link to="/favorites" className="Header__Button">
      <div className="Icon__image Icon__image--favorites" />
    </Link>
    <Link to="/cart" className="Header__Button">
      <div className="Icon__image Icon__image--shopping-bag" />
    </Link>
  </header>
);
