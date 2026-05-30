import { ProductDetailsProvider } from 'store/ProductDetailsContext';
import './App.scss';
import { Layout } from './layout';
import { ProductsProvider } from 'store/ProductsContext';

export const App = () => (
  <div className="App">
    <ProductsProvider>
      <ProductDetailsProvider>
        <Layout />
      </ProductDetailsProvider>
    </ProductsProvider>
  </div>
);
