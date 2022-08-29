// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { BasicLayout } from './pages/BasicLayout/BasicLayout';
import { Home } from './pages/Home/Home';
import { Phones } from './pages/Phones/Phones';
import { Tablets } from './pages/Tablets/Tablets';
import { Accessories } from './pages/Accessories/Accessories';
import { Details } from './pages/Details/Details';
import { Favourites } from './pages/Favourites/Favourires';
import { Cart } from './pages/Cart/Cart';

const App = () => (
  <Routes>
    <Route path="/" element={<BasicLayout />}>
      <Route index element={<Home />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/phones">
        <Route index element={<Phones />} />
        <Route
          path="/phones:id"
          element={<Details productCategory="phones" />}
        />
      </Route>
      <Route path="/tablets">
        <Route index element={<Tablets />} />
        <Route
          path="/tablets:id"
          element={<Details productCategory="tablets" />}
        />
      </Route>
      <Route path="/accessories" element={<Accessories />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/cart" element={<Cart />} />
    </Route>
  </Routes>
);

export default App;
