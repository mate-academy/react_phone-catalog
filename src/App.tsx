import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Home, Header, NotFoundPage } from './components';

export const App = () => (
  <Routes>
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
