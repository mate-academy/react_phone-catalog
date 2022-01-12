import React from 'react';
import { Footer } from '../../Components/Footer/Footer';
import { Header } from '../../Components/Header/Header';

export const PageNotFound:React.FC = () => {
  return (
    <>
      <Header />
      <main>
        Page not found
      </main>
      <Footer />
    </>
  );
};
