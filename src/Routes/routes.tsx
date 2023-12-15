import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../Layouts/MainLayout';
import Home from '../Pages/Home';
import ProductDetailsPage from '../Components/details/details';
import Phones from '../Components/Phones/phones';
import Tablets from '../Components/Tablets/tablets';
import Favorites from '../Components/Favorites/favorites';
import Cart from '../Components/Cart/cart';

export const Router = createBrowserRouter([
  {
    path: '/react_phone-catalog',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/:productId',
        element: <ProductDetailsPage />,
      },
      {
        path: '/phones',
        element: <Phones />,
      },
      {
        path: '/tablets',
        element: <Tablets />,
      },
      {
        path: '/favourites',
        element: <Favorites />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },
]);
