import { GlobalProvider } from './context/GlobalContext';
import { AllRoutes } from './routes';

export const App = () => (
  <GlobalProvider>
    <AllRoutes />
  </GlobalProvider>
);
