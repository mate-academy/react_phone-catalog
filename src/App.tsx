// import './App.scss';
import { AppRoutes } from './routes';
import { GlobalProvider } from './context/GlobalContext';

/*export const App = () => (
  <div className="App">
    <h1>Product Catalog</h1>
  </div>
);*/
export const App = () => {
  return (
    <GlobalProvider>
      <AppRoutes />
    </GlobalProvider>
  );
};
