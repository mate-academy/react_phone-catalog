import { ProductContextProvider } from './context/ProductsContext';
import { Page } from './ui/components';
import './App.scss';

export const App = () => (
  <ProductContextProvider>
    <div className="App">
      <Page />
    </div>
  </ProductContextProvider>
);
