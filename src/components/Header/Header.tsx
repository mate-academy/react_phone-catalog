import { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';

// Styles
import './Header.scss';

// Components
import { Logo } from '../Logo';
import { Nav } from '../Nav';
import { Search } from '../Search';
import { HeaderLink } from '../HeaderLink';

export const Header: FunctionComponent = () => (
  <header className="Header">
    <div className="Header__side">
      <Logo />

      <Nav />
    </div>

    <div className="Header__side">

      <Routes>
        <Route path="phones" element={<Search />} />
        <Route path="tablets" element={<Search />} />
        <Route path="accessories" element={<Search />} />
        <Route path="favourites" element={<Search />} />
        <Route path="*" element={null} />
      </Routes>

      <HeaderLink item="Favourites" />
      <HeaderLink item="Cart" />
    </div>
  </header>
);
