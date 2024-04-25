import React from 'react';
import { createRoot } from 'react-dom/client';
import { CatalogProvider } from './pages/CatalogContext';
import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLElement).render(
  <CatalogProvider>
    <Root />
  </CatalogProvider>,
);
