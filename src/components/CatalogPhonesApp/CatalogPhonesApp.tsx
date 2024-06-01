import React, { useContext, useEffect } from 'react';
import './CatalogPhonesApp.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { CatalogContext } from '../../context/CatalogContext';
import * as Service from '../../utils/service';

export const CatalogPhonesApp = () => {
  const { menuIsActive } = useContext(CatalogContext);

  useEffect(() => Service.disableScroll(menuIsActive), [menuIsActive]);

  return (
    <main>
      <Navbar />

      <section className="app__body">
        <Outlet />
      </section>

      <Footer />
    </main>
  );
};
