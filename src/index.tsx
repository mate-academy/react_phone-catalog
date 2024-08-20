import React from 'react';
import { HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { DeviceProvider } from './components/DeviceContext/DeviceContext';
import { MenuProvider } from './components/MenuContext';
import { ThemeProvider } from './ThemeContext/ThemeContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <ThemeProvider>
      <MenuProvider>
        <DeviceProvider>
          <App />
        </DeviceProvider>
      </MenuProvider>
    </ThemeProvider>
  </HashRouter>,
);
