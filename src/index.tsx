import './styles/styles.scss';
import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { ProductProvider } from './store/ProductContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ProductProvider>
    <Root />
  </ProductProvider>,
);
