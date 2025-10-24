import { HashRouter } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import { routes } from './app/Routes';

const AppRoutes = () => useRoutes(routes);

export const Root = () => (
  <HashRouter>
    <AppRoutes />
  </HashRouter>
);
