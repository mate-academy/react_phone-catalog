import React from 'react';
import { CatalogPhonesApp } from './components/CatalogPhonesApp';
import { CatalogProvider } from './context/CatalogContext';

export const App: React.FC = () => (
  <CatalogProvider>
    <CatalogPhonesApp />
  </CatalogProvider>
);
