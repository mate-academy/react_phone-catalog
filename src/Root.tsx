import { FC, Suspense } from 'react';
import {
  Await,
  useLoaderData,
} from 'react-router-dom';
import { App } from './App';
import { Loader } from './components/Loader';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root: FC = () => {
  const { IDs } = useLoaderData() as { IDs: string[]; };

  return (
    <Suspense fallback={<Loader />}>
      <Await
        resolve={IDs}
        errorElement={<NotFoundPage />}
      >
        <CartProvider>
          <FavoritesProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </FavoritesProvider>
        </CartProvider>
      </Await>
    </Suspense>
  );
};
