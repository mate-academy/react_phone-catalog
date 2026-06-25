import { AppRoutes } from './router';
import ReactDOM from 'react-dom/client';
import React from 'react';
import './modules/shared/components/i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
);
