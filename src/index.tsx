import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { CartProvider } from './context/CartContext';
import { ErrorHandlingProvider } from './hooks/errorHandling';
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <CartProvider>
      <ErrorHandlingProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorHandlingProvider>
    </CartProvider>
  </Provider>,
);
