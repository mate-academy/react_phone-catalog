import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { AppRoutes } from 'config';
import {
  AccessoriesPage,
  HomePage,
  NotFound,
  PhonesPage,
  ProductDetailsPage,
  TabletsPage,
  Cart,
  Favourites,
} from 'pages';
import App from 'App';

type RootT = {
  element: JSX.Element,
  index?: boolean,
  childRoute?: JSX.Element,
};

type RootsT = Partial<Record<AppRoutes, RootT>>;

export const pages = {
  home: <HomePage />,
  phones: <PhonesPage />,
  tablets: <TabletsPage />,
  accessories: <AccessoriesPage />,
  cart: <Cart />,
  favourites: <Favourites />,
  '*': <NotFound />,
};

export const routes: RootsT = {
  [AppRoutes.Root]: {
    element: <HomePage />,
  },
  [AppRoutes.HomePage]: {
    element: <HomePage />,
    index: true,
  },
  [AppRoutes.Phones]: {
    index: true,
    element: <PhonesPage />,
    childRoute: (
      <>
        <Route index element={<PhonesPage />} />
        <Route path={AppRoutes.ProductId} element={<ProductDetailsPage />} />
      </>),
  },
  [AppRoutes.Tablets]: {
    element: <TabletsPage />,
  },
  [AppRoutes.Accessories]: {
    element: <AccessoriesPage />,
  },
  [AppRoutes.Cart]: {
    element: <Cart />,
  },
  [AppRoutes.Favourites]: {
    element: <Favourites />,
  },
  [AppRoutes.NotFound]: {
    element: <NotFound />,
  },
};

const configuredRoutes = Object
  .entries(routes)
  .map(([path, route]) => {
    if (Object.hasOwn(route, 'childRoute')) {
      return (
        <Route key={path} path={path}>
          {route.childRoute}
        </Route>
      );
    }

    return (
      <Route
        key={path}
        path={path}
        element={route.element}
        index={route.index}
      />
    );
  });

export const Root = () => (
  <Router>
    <Routes>
      <Route path={AppRoutes.Root} element={<App />}>
        {configuredRoutes}
      </Route>
    </Routes>
  </Router>
);
