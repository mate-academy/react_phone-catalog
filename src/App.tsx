import { AppRoutes } from './routes';
import { GlobalProvider } from './context/GlobalContext';

export const App = () => {
  return (
    <GlobalProvider>
      <h1 className="visually-hidden">Product Catalog</h1>

      <AppRoutes />
    </GlobalProvider>
  );
};
