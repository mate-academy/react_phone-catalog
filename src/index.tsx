import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <CartProvider>
      <App />
    </CartProvider>
  </Provider>,
);
