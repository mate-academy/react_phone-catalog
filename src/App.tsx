import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Home, Root, NotFoundPage } from './components';

export const App = () => (
  <Routes>
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
