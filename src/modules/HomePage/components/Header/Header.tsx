import React from 'react';
import headerClass from './header.module.scss';
import { Carousel } from '../Carousel';
// import cn from 'classnames';

export const Header: React.FC = () => {
  return (
    <header className={headerClass.header}>
      <h1 className={`${headerClass.header__title} container`}>
        Welcome to Nice Gadgets store!
      </h1>
      <div className={headerClass.header__content}>
        <Carousel />
      </div>
    </header>
  );
};
