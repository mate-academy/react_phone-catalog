import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import './styles/reset.scss';
import './styles/fonts.scss';
import './styles/utilities.scss';
import { FavouritesProvider } from './components/context/FavouritesContext';
import { CartProvider } from './components/context/CartContext';
import { ThemeProvider } from './components/context/ThemeContext';
import { LanguageProvider } from './components/context/LanguageContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider>
    <LanguageProvider>
      <FavouritesProvider>
        <CartProvider>
          <Root />
        </CartProvider>
      </FavouritesProvider>
    </LanguageProvider>
  </ThemeProvider>,
);
