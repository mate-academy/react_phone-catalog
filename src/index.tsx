import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ProductsProvider } from './shared/utils/ProductsContext';
import { SearchProvider } from './shared/utils/SearchContext';
import { App } from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <ProductsProvider>
      <SearchProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </SearchProvider>
    </ProductsProvider>,
  );
}
