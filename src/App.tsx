import React from 'react';
import { CatalogApp } from './components/CatalogApp';
import { CatalogProvider } from './context/CatalogContext';

export const App: React.FC = () => {
  return (
    <CatalogProvider>
      <CatalogApp />
    </CatalogProvider>
  );
};
