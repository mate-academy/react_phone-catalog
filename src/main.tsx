import { Buffer } from 'buffer';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartFavoritesProvider } from '@/context/CartFavoritesContext';
import { AuthProvider } from './context/AuthContext.tsx';
import { BooksProvider } from './context/BooksContext';
import App from './App.tsx';
import './i18n.ts';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CurrencyProvider } from './context/CurrencyContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';

declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

window.Buffer = Buffer;

const params = new URLSearchParams(window.location.search);
const redirectPath = params.get('p');
if (redirectPath) {
  window.history.replaceState(
    null,
    '',
    '/BookFlow' + redirectPath,
  );
}

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename="/BookFlow/">
      <AuthProvider>
        <CartFavoritesProvider>
          <BooksProvider>
            <CurrencyProvider>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </CurrencyProvider>
          </BooksProvider>
        </CartFavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>,
);
