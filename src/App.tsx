import './App.scss';
import { ShopContextProvider } from './cart-context';
import { Layout } from './components/Layout.tsx/Layout';

export const App = () => {
  return (
    <ShopContextProvider>
      <div className="page">
        <Layout />
      </div>
    </ShopContextProvider>
  );
};
