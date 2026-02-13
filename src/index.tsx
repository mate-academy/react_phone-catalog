import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { ProductsProvider } from './context/ProductsContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ProductsProvider>
    <Root />
  </ProductsProvider>,
);
