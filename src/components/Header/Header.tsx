import React from 'react';
import { CartSection } from '../CartSection/CartSection';
import { Search } from '../Search/Search';
import { Nav } from '../Nav/Nav';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header_container">
        <div className="header_nav-wrapper">
          <Nav />
          <div className="header_customer-section customer-section">
            <Search />
            <CartSection />
          </div>
        </div>
      </div>
    </header>
  );
}
