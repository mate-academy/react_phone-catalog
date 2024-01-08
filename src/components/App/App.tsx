/* eslint-disable max-len */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { ScrollUp } from '../ScrollUp';
import { Footer } from '../Footer';
import { storeGadgets } from '../../store/store';
import { getProducts } from '../../support/api';
import { Modal } from '../Modal';

export const App = () => {
  const { setList } = storeGadgets();
  const [loading, setLoding] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => setList(data))
      .then(() => setLoding(false));
  }, []);

  return (
    <section className="min-h-[100vh] relative pb-[180px]">
      {loading ? <p>Loading...</p> : (
        <>
          <Header />
          <Outlet />
          <ScrollUp />
          <Footer />
          <Modal />
        </>
      )}
    </section>
  );
};

// <section className="min-h-[100vh] relative pb-[180px]">
