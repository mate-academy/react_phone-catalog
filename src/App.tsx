import {
  Link,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { useEffect } from 'react';
import './App.scss';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Accessories } from './pages/Accessories';
import { Tablets } from './pages/Tablets';
import { Constacts } from './pages/Constacts';
import { Rights } from './pages/Rights';
import { Phones } from './pages/Phones';
import { ProductDetails } from './pages/ProductDetails';
import { Favorites } from './pages/Favorites';
import { Cart } from './pages/Cart';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { useAppDispatch } from './store/hooks';
import { fetchAllPhones } from './store/features/phones';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllPhones());
  }, []);

  return (
    <div className="page">
      <header className="header">
        <div className="page__logo--header">
          <Link to="/" className="page__logo--icon" />
        </div>
        <Navbar />
      </header>
      <main className="main">
        <div className="main__container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/phones">
              <Route index element={<Phones />} />
              <Route path=":id" element={<ProductDetails />} />
            </Route>
            <Route path="/tablets" element={<Tablets />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/contacts" element={<Constacts />} />
            <Route path="/rights" element={<Rights />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFoundPage title="Page not found" />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
