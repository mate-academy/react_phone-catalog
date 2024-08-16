import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import React from 'react';
import { AppProvider } from './context/AppContext'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <Root />
    </AppProvider>
  </React.StrictMode>

);
<React.Fragment />;
