import React, { FC } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import { Nav } from '../Nav/Nav';
import { HomePage } from '../HomePage/HomePage';
import { PhonesPage } from '../PhonesPage/PhonesPage';
import { Tablets } from '../Tablets/Tablets';
import { Accessories } from '../Accessories/Accessories';

import '../Css/Header.css';

export const Header: FC = () => (
  <>
    <header className="header">
      <a href="/" className="logo">
        <img src="./img/logo/logo.svg" alt="logo" />
      </a>
      <Nav />
      <div className="header__services">
        <div className="search-box">
          <input type="text" className="header__search" />
        </div>

        <a href="/" className="btn header__btn">
          <img src="./img/svg/like.svg" alt="icon" />
        </a>
        <a href="/" className="btn header__btn">
          <img src="./img/svg/cart.svg" alt="icon" />
        </a>
      </div>
    </header>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/phones" component={PhonesPage} />
      <Route path="/tablets" component={Tablets} />
      <Route path="/accessories" component={Accessories} />
    </Switch>
  </>
);
