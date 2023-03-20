import React from 'react';
import { HeaderLink } from './HeaderLink';

const path = process.env.PUBLIC_URL;
const image = '_new/img/icons/Cart.svg';

export const CartLink: React.FC = () => (
  <HeaderLink to="/Cart" className="header__item">
    <img src={path + image} alt="Cart" />
  </HeaderLink>
);
