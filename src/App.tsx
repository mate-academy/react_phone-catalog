import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { routesConfig } from './router/routesConfig';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routesConfig.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </div>
  );
};
