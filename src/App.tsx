import { Route, Routes } from 'react-router-dom';
import s from './App.module.scss';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { Catalogue } from './pages/Catalogue/Catalogue';
import { NotFound } from './pages/NotFound/NotFound';
import { Footer } from './components/Footer';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { Cart } from './pages/Cart/Cart';
import { Favourite } from './pages/Favourite';
import { ScrollToTop } from './components/ScrollTop/ScrollTop';

export const App = () => {
  return (
    <div className={s.app}>
      <ScrollToTop />
      <Header />

      <div className={s.app__main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/phones"
            element={<Catalogue title={'Mobile phones'} type={'phones'} />}
          />
          <Route
            path="/tablets"
            element={<Catalogue title={'Tablets'} type={'tablets'} />}
          />
          <Route
            path="/accessories"
            element={<Catalogue title={'Accessories'} type={'accessories'} />}
          />
          <Route
            path="/:category/:productId"
            element={<ProductDetailsPage />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

//
