import { createHashRouter } from 'react-router-dom';
import { App } from './App';
import { Home } from './modules/HomePage/Home';
import { Phones } from './modules/PhonesPage/Phones';
import { Error } from './modules/ErrorPage/Error';
import { Tablets } from './modules/TabletsPage/Tablets';

export const root = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'phones',
        element: <Phones />,
      },
      {
        path: 'tablets',
        element: <Tablets />,
      },
    ],
  },
]);
