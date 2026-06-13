import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Root } from './root';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/react_phone_catalog">
    <Root />
  </BrowserRouter>,
);
