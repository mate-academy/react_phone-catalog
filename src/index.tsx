import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ProductsProvider } from './shared/utils/ProductsContext';
import { SearchProvider } from './shared/utils/SearchContext';
import { App } from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <ProductsProvider>
      <SearchProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SearchProvider>
    </ProductsProvider>,
  );
}
