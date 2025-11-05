import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './components/pages/HomePage/HomePage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="phones" element={<p>Phones</p>} />
        <Route path="favorites" element={<p>Favorites</p>} />
        <Route path="cart" element={<p>Shoping Bag</p>} />
      </Route>
    </Routes>
  );
};
