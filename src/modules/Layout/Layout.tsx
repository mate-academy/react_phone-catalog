import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './Header';
import { Footer } from './Footer';
import classes from './layout.module.scss';

type Props = {};

export const Layout: FC<Props> = () => {
  return (
    <div className={classes.layout}>
      <Header />
      <main className={classes.layout__inner}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
