import React from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { PhonesMain } from '../../components/PhonesMain';

export const PhonesPage = () => (
  <>
    <Header />
    <main className="main">
      <PhonesMain />
    </main>
    <Footer />
  </>
);
