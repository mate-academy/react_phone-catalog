import React from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { TabletsMain } from '../../components/TabletsMain';

export const TabletsPage = () => (
  <>
    <Header />
    <main className="main">
      <TabletsMain />
    </main>
    <Footer />
  </>
);
