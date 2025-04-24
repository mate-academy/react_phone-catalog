import { AppRoutes } from './routes';
import { GlobalProvider } from './context/GlobalContext';

export const App = () => {
  return (
    <>
      <h1 className="visually-hidden">Product Catalog</h1>
      <GlobalProvider>
        <AppRoutes />
      </GlobalProvider>
    </>
  );
};
