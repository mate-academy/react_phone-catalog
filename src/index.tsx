import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import './index.scss';
import React from 'react';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
