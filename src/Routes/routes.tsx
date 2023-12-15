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
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/react_phone-catalog',
        element: <Home />,
      },
      {
        path: '/react_phone-catalog/:productId',
        element: <ProductDetailsPage />,
      },
      {
        path: '/react_phone-catalog/phones',
        element: <Phones />,
      },
      {
        path: '/react_phone-catalog/tablets',
        element: <Tablets />,
      },
      {
        path: '/react_phone-catalog/favourites',
        element: <Favorites />,
      },
      {
        path: '/react_phone-catalog/cart',
        element: <Cart />,
      },
    ],
  },
]);
