import { HashRouter, Routes, Route } from 'react-router-dom';
import { App } from './app/App';
import { HomePage } from './pages/homePage/HomePage';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  </HashRouter>
);
