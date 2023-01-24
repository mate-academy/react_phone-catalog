import ReactDOM from 'react-dom';

import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';

import { routes } from './routes';

const Router = createHashRouter(routes);

ReactDOM.render(
  <RouterProvider router={Router} />,
  document.getElementById('root'),
);
