import React from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { AccessoriesMain } from '../../components/AccessoriesMain';

export const AccessoriesPage = () => (
  <>
    <Header />
    <main className="main">
      <AccessoriesMain />
    </main>
    <Footer />
  </>
);
