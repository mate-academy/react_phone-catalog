import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import {
  CartProvider,
  FavouritesProvider,
  LanguageProvider,
  ThemeProvider,
} from './modules/shared/context';
import { Root } from './modules/shared/components/Root';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ThemeProvider>
      <LanguageProvider>
        <FavouritesProvider>
          <CartProvider>
            <Root />
          </CartProvider>
        </FavouritesProvider>
      </LanguageProvider>
    </ThemeProvider>
  </Router>,
);
