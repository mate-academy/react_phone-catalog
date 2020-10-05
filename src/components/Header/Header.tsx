import React, { useState } from 'react';
import { CartSection } from '../CartSection/CartSection';
import { Search } from '../Search/Search';
import { Nav } from '../Nav/Nav';
import { SideMenu } from '../BurgerMenu/SideMenu';
import { BurgerToggleButton }  from '../BurgerMenu/BurgerToggleButton';
import { Backdrop } from '../BurgerMenu/BackDrop';

export const Header: React.FC = () => {

  const [sideMenuState, setSideMenuState] = useState<boolean>(false);

  const toggleClickHandler = () => {
    setSideMenuState(!sideMenuState);
  }

  const backdropClickHandler = () => {
      setSideMenuState(false);
  }

  return (
    <header className="header">
      <div className="header_container">
        <div className="header_nav-wrapper">
          <Nav />
          {sideMenuState
            ? <Backdrop backdropClickHandler={backdropClickHandler}/>
            : <BurgerToggleButton toggleClickHandler={toggleClickHandler}/>
          }
          <div className="spacer"></div>
          <Search />
          <div className="header_customer-section customer-section">
            <CartSection />
          </div>
        </div>
      </div>
      <SideMenu show={sideMenuState} />
    </header>
  );
}
