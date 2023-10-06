import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Layout from './components/Layout/Layout';
import Loader from './components/Loader/Loader';
import CardDetails from './pages/CardDetails/CardDetails';
import { Categories } from './types/Categories';
import EmptyModal from './components/EmptyModal/EmptyModal';

const Home = lazy(() => import('./pages/Home/Home'));
const Phones = lazy(() => import('./pages/Phones/Phones'));
const Tablets = lazy(() => import('./pages/Tablets/Tablets'));
const Accessories = lazy(() => import('./pages/Accessories/Accessories'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Favorites = lazy(() => import('./pages/Favorites/Favorites'));

const App = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/phones">
          <Route index element={<Phones />} />
          <Route
            path=":id"
            element={<CardDetails category={Categories.PHONES} />}
          />
        </Route>
        <Route path="/tablets">
          <Route index element={<Tablets />} />
          <Route
            path=":id"
            element={<CardDetails category={Categories.TABLETS} />}
          />
        </Route>
        <Route path="/accessories">
          <Route index element={<Accessories />} />
          <Route
            path=":id"
            element={<CardDetails category={Categories.ACCESSORIES} />}
          />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<EmptyModal />} />
      </Route>
    </Routes>
  </Suspense>
);

export default App;
