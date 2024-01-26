import { createRoot } from 'react-dom/client';

import './assets/css/style.scss';

import { Root } from './pages/Root';

const rootElement = document.getElementById('root') as HTMLDivElement;

createRoot(rootElement)
  .render(
    <Root />,
  );
