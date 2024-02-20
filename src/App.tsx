import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import { Loader } from './components/Loader/Loader';
import {
  AccessoriesPage,
  loader as accessoriesLoader,
} from './pages/AccessoriesPage/AccessoriesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { HomePage, loader as productsLoader } from './pages/HomePage/Homepage';
import {
  PhonesPage,
  loader as phonesLoader,
} from './pages/PhonesPage/PhonesPage';
import {
  ProductDetailsPage,
  loader as productDetailsLoader,
} from './pages/ProductDetailsPage/ProductDetailsPage';
import { RootLayout } from './pages/Root/RootLayout';
import {
  TabletsPage,
  loader as tabletsLoader,
} from './pages/TabletsPage/TabletsPage';
import { AppContextProvider } from './store/AppContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: productsLoader,
      },
      {
        path: '/phones',
        element: <PhonesPage />,
        loader: phonesLoader,
      },
      {
        path: '/phones/:productId',
        element: <ProductDetailsPage />,
        loader: ({ params }) => {
          return productDetailsLoader(params.productId as string);
        },
      },
      {
        path: '/tablets',
        element: <TabletsPage />,
        loader: tabletsLoader,
      },
      {
        path: '/accessories',
        element: <AccessoriesPage />,
        loader: accessoriesLoader,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/favourites',
        element: <FavouritesPage />,
      },
    ],
  },

]);

const App = () => {
  return (
    <AppContextProvider>
      <div className="page">
        <RouterProvider
          router={router}
          fallbackElement={<Loader />}
        />
      </div>
    </AppContextProvider>
  );
};

export default App;
