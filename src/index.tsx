import { createRoot } from 'react-dom/client';
import { MainRoutes } from './MainRoutes';

createRoot(document.getElementById('root') as HTMLElement).render(
  <MainRoutes />,
);
