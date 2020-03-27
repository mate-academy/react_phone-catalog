import React, { FC } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import { Nav } from '../Nav/Nav';
import { HomePage } from '../HomePage/HomePage';
import { Phonescatalog } from '../Phonescatalog/Phonescatalog';
import { Tablets } from '../Tablets/Tablets';
import { Accessories } from '../Accessories/Accessories';

import '../Style/header.scss';

export const Header: FC = () => (
  <>
    <header className="header">
      <div className="header__nav">
        <a href="/" className="logo">
          <img src="./img/logo/logo.svg" alt="logo" />
        </a>
        <Nav />
      </div>
      <div className="header__services">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            className="header__search"
          />
        </div>

        <a href="/" className="btn header__btn">
          <img src="./img/svg/like.svg" className="icon-btn" alt="icon" />
        </a>
        <a href="/" className="btn header__btn">
          <img src="./img/svg/cart.svg" className="icon-btn" alt="icon" />
        </a>
      </div>
    </header>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/phones" component={Phonescatalog} />
      <Route path="/tablets" component={Tablets} />
      <Route path="/accessories" component={Accessories} />
    </Switch>
  </>
);
