import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
// import { ProductsProvider } from './context/ProductsContext';

ReactDOM.render(
  // <ProductsProvider>
  <Router>
    <App />
  </Router>,
  // </ProductsProvider>,
  document.getElementById('root'),
);
