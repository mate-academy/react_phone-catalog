import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppRoutes } from './AppRoutes';

createRoot(document.getElementById('root') as HTMLElement).render(
  <AppRoutes />,
);
