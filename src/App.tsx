import {
  RouterProvider,
  createHashRouter,
} from 'react-router-dom';
import './App.scss';
import { Root } from './Page/Root';
import { Error } from './Page/Error';
import { Home } from './Page/Home';
import { PhonesListPage } from './Page/PhonesListPage';
import { Tablet } from './Page/Tablets';
import { Accessories } from './Page/Accessories';
import { FavouritesPage } from './Page/FavoritesPage';
import { CartPage } from './Page/CartPage';
import { PhoneDetailPage } from './Page/PhoneDetailPage';
import { PhoneRoot } from './Page/PhoneRoot';

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
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
      { path: 'tablets', element: <Tablet /> },
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
