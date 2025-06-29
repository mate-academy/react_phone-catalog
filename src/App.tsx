import { AppRoutes } from './routes';
import { GlobalProvider } from './context/GlobalContext';

export const App = () => {
  return (
    <GlobalProvider>
      <AppRoutes />
    </GlobalProvider>
  );
};
