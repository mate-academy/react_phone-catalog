import ReactDOM from 'react-dom';
import App from './App';
import { ProductsProvider } from './utils/ProductsContext';

ReactDOM.render(
  <ProductsProvider>
    <App />
  </ProductsProvider>,
  document.getElementById('root'),
);
