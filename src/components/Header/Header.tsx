import React from 'react';
import './Header.scss';
import {LinkType} from '../../interfaces';
import { Logo } from '../Logo/Logo';
import { Nav } from '../Nav/Nav';
import { FavoritesIcon } from '../FavoritesIcon/FavoritesIcon';
import { CartIcon } from '../CartIcon/CartIcon';
import { SearchField } from '../SeachField/SearchField'


export const Header = () => {

  let headerLinks: LinkType[] = [
    { title: 'HOME', address: '/#', isOuter: false },
    { title: 'PHONES', address: '/phones', isOuter: false },
    { title: 'TABLETS', address: '/tablets', isOuter: false },
    { title: 'ACCESSORIES', address: '/accessories', isOuter: false },
  ]

  return(
    <header className="Header">
    <div className="Header-wrapper">
      <div className="Header-left-wrapper">
      <Logo />
      <Nav
      links={headerLinks}
      addresses={['/cart']} />
      </div>

      <div className="Header-right-wrapper">
      <SearchField />


        <FavoritesIcon />
        <CartIcon />
      </div>
    </div>

  </header>
  )
}

