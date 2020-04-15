import React from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { NoMatchMain } from '../../components/NoMatchMain';

export const NoMatchPage = () => (
  <>
    <Header />
    <main className="main">
      <NoMatchMain />
    </main>
    <Footer />
  </>
);
