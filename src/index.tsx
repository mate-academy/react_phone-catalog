import { createRoot } from 'react-dom/client';
import { AppRouter } from './AppRouter';
import './i18n';
import './shared/styles/index.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <AppRouter />,
);
