/* eslint-disable react/react-in-jsx-scope */
import { createRoot } from 'react-dom/client';
import './index.scss';
import { Root } from './Root';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContextType';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

createRoot(document.getElementById('root') as HTMLElement).render(
  <FavoritesProvider>
    <CartProvider>
      <I18nextProvider i18n={i18n}>
        <Root />
      </I18nextProvider>
    </CartProvider>
  </FavoritesProvider>,
);
