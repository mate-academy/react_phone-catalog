import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { store } from './store';

import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';
import { Cart } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';

import { ItemCard } from './components/ItemCard';
import { ProductPageWrapper } from './components/ProductPageWraper/ProductPageWrapper';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'catalog',
        children: [
          {
            path: ':category',
            element: <ProductPageWrapper />,
          },
          {
            path: ':category/:itemPage',
            element: <ItemCard />,
          },
        ],
      },
      {
        path: 'user',
        children: [
          {
            path: 'favourites',
            element: <FavouritesPage />,
          },
          {
            path: 'cart',
            element: <Cart />,
          },
        ],
      },
      {
        path: 'not-implemented',
        element: <PageNotFound notImplemented />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]);

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable refetching on window focus
      retry: 1, // Limit retry attempts
      staleTime: 0, // Consider data stale immediately
      gcTime: 0, // Clear cache immediately
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
