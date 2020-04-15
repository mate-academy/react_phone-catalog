import React from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { HomePageMain } from '../../components/HomePageMain';

export const HomePage = () => (
  <>
    <Header />
    <main className="main">
      <HomePageMain />
    </main>
    <Footer />
  </>
);
