import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import classes from './App.module.scss';
import { Root } from './Page/Root';
import { Error } from './Page/Error';
import { Home } from './Page/Home';
import { Phone } from './Page/Phones';
import { Tablet } from './Page/Tablets';
import { Accessories } from './Page/Accessories';
import { FavouritesPage } from './Page/Favorites';
import { CartPage } from './Page/CartPage';
import { DetailPhonePage } from './Page/DetailPhone';
import { PhoneRoot } from './Page/PhoneRoot';

// 'https://mate-academy.github.io/react_phone-catalog/_new/products' - просто урл до теелфонів в масиві
// 'https://mate-academy.github.io/react_phone-catalog/_new/products/myid.json' - просто урл до окремих телефонів
// const BASE_API_URL =
//   'https://mate-academy.github.io/react_phone-catalog/_new/products';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'phones',
        element: <PhoneRoot />,
        children: [
          {
            index: true,
            element: <Phone />,
          },
          {
            path: ':phoneId',
            element: <DetailPhonePage />,
          },
        ],
      },
      { path: 'tablets', element: <Tablet /> },
      { path: 'accesories', element: <Accessories /> },
      { path: 'favorites', element: <FavouritesPage /> },
      { path: 'cart', element: <CartPage /> },
    ],
  },
]);

const App = () => {
  return (
    <div className={classes.item}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
