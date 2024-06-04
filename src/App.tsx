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
  RootOutlet,
  PhonesPage,
  FavouritesPage,
  Tablets,
  CartPage,
} from './Page';
import { TabletDetailPage } from './Page/TabletsDetailPage';
import { AccessoriesDetailPage } from './Page/AccessoriesDetailPage';

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
        element: <RootOutlet />,
        children: [
          {
            index: true,
            element: <PhonesPage />,
          },
          {
            path: ':itemId',
            element: <PhoneDetailPage />,
          },
        ],
      },
      {
        path: 'tablets',
        element: <RootOutlet />,
        children: [
          {
            index: true,
            element: <Tablets />,
          },
          {
            path: ':itemId',
            element: <TabletDetailPage />,
          },
        ],
      },
      {
        path: 'accessories',
        element: <RootOutlet />,
        children: [
          {
            index: true,
            element: <Accessories />,
          },
          {
            path: ':itemId',
            element: <AccessoriesDetailPage />,
          },
        ],
      },
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
