import { createRoot } from 'react-dom/client';
import { App } from './App';
import './i18n';
import { LanguageProvider } from './store/LanguageProvider';
import { ThemeProvider } from './store/ThemeProvider';
import './styles/main.scss';
import { BreakPointsProvider } from './store/BreakPointsProvider';
import { StateProvider } from './store/StateProvider';
import { ProductsProvider } from './store/ProductsProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ProductsProvider>
    <StateProvider>
      <BreakPointsProvider>
        <ThemeProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </ThemeProvider>
      </BreakPointsProvider>
    </StateProvider>
  </ProductsProvider>,
);
