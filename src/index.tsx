import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { ProductsProvider } from './store/ProductsProvider';
import { ThemeProvider } from './store/ThemeProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider>
    <ProductsProvider>
      <Root />
    </ProductsProvider>
  </ThemeProvider>,
);
