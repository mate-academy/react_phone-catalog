import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import './i18n/i18n';
import './bones/registry';
import { Routers } from './app/Routers';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routers></Routers>
  </StrictMode>,
);
