import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
// import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

import { Root } from './Root';
import { ProductsProvider } from './components/ProductsContext/ProductsContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ProductsProvider>
    <Router>
      <Root />
    </Router>
  </ProductsProvider>,
);
