import { memo, Suspense, useCallback } from 'react';
import { Route, RouteProps, Routes } from 'react-router-dom';
import { routeConfig } from '../../../../shared/config/routeConfig';
import { Loader } from '../../../../shared/ui/Loader';

const AppRouter = () => {
  const routeElement = useCallback((route: RouteProps) => {
    const element = <Suspense fallback={<Loader />}>{route.element}</Suspense>;

    return <Route key={route.path} path={route.path} element={element} />;
  }, []);

  return <Routes>{Object.values(routeConfig).map(routeElement)}</Routes>;
};

export default memo(AppRouter);
