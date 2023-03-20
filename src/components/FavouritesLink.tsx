import React from 'react';
import { HeaderLink } from './HeaderLink';

const path = process.env.PUBLIC_URL;
const image = '_new/img/icons/Stroke.svg';

export const FavouritesLink: React.FC = () => (
  <HeaderLink to="/Favourites" className="header__item">
    <img src={path + image} alt="favourites" />
  </HeaderLink>
);
