import {
  RouterProvider,
  createHashRouter,
} from 'react-router-dom';
import './App.scss';
import {
  Root,
  Error,
  Home,
  Accessories,
  PhoneDetailPage,
  PhoneRoot,
  PhonesListPage,
  FavouritesPage,
  Tablets,
  CartPage,
} from './Page';

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '*',
        element: <Error />,
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'phones',
        element: <PhoneRoot />,
        children: [
          {
            index: true,
            element: <PhonesListPage />,
          },
          {
            path: ':phoneId',
            element: <PhoneDetailPage />,
          },
        ],
      },
      { path: 'tablets', element: <Tablets /> },
      { path: 'accesories', element: <Accessories /> },
      { path: 'favourites', element: <FavouritesPage /> },
      { path: 'cart', element: <CartPage /> },
    ],
  },
]);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
