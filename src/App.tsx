// import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import classes from './App.module.scss';
import { Root } from './Page/Root';
import { Error } from './Page/Error';
import { Home } from './Page/Home';
import { Phone } from './Page/Phones';
import { Tablet } from './Page/Tablets';
import { Accessories } from './Page/Accessories';
import { Favorites } from './Page/Favorites';
import { Cart } from './Page/Cart';
import { DetailPhonePage } from './Page/DetailPhone';
// import { loaderPhoneDetail } from './features/phonesApi/apiFetch';
// import { PhoneDetail } from './components/Phones/PhoneDetail';

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
        element: <Phone />,
        children: [
          {
            path: 'phones/:phoneId',
            element: <DetailPhonePage />,
            // loader: loaderPhoneDetail,
          },
        ],
      },
      { path: 'tablets', element: <Tablet /> },
      { path: 'accesories', element: <Accessories /> },
      { path: 'favorites', element: <Favorites /> },
      { path: 'cart', element: <Cart /> },
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
