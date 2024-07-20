import { createRoot } from 'react-dom/client';
import './styles/main.scss';
import './i18n';
import { LanguageProvider } from './store/LanguageProvider';
import { ThemeProvider } from './store/ThemeProvider';
import { BreakPointsProvider } from './store/BreakPointsProvider';
import { StateProvider } from './store/StateProvider';
import { ProductsProvider } from './store/ProductsProvider';
import { HashRouter as Router } from 'react-router-dom';
import { Root } from './Root';
import { ShoppingCartProvider } from './store/ShoppingCartProvider';
import ScrollToTop from './utils/ScrollToTop';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ScrollToTop />
    <ShoppingCartProvider>
      <ProductsProvider>
        <StateProvider>
          <BreakPointsProvider>
            <ThemeProvider>
              <LanguageProvider>
                <Root />
              </LanguageProvider>
            </ThemeProvider>
          </BreakPointsProvider>
        </StateProvider>
      </ProductsProvider>
    </ShoppingCartProvider>
  </Router>,
);
