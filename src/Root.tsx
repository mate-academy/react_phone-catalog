import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { Menu } from './components/Menu';
import { HomePage } from './components/modules/HomePage';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to={'/'} />} />
          <Route path=":category">
            <Route index element={<Category />} />
          </Route>
          <Route />
          <Route />

          <Route path="menu" element={<Menu />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
