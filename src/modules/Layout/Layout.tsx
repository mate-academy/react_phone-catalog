import React, { FC } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FOOTER_MENU_ITEMS, HEADER_MENU_ITEMS } from './variables';
import classes from './layout.module.scss';

type Props = {};

export const Layout: FC<Props> = () => {
  return (
    <div className={classes.layout}>
      <Header links={HEADER_MENU_ITEMS} />
      <main className={classes.layout__inner}>
        <Outlet />
      </main>
      <Footer links={FOOTER_MENU_ITEMS} />
      <ScrollRestoration />
    </div>
  );
};
