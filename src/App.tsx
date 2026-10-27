import { GlobalProvider } from './context/GlobalContext';
import { AppRoutes } from './routes';

export const App = () => {
  return (
    <>
      <GlobalProvider>
        <h1 className="visually-hidden">Product Catalog</h1>
        <AppRoutes />
      </GlobalProvider>
    </>
  );
};
