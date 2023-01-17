import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { PageNotFound } from './Pages/PageNotFound';
import { ProductsProvider } from './ProductsContext';
import { Footer } from './components/Footer';
import { ProductPage } from './Pages/ProductPage';
import { MainNav } from './components/MainNav';
import { ProductDetails } from './components/ProductDetails';
import { CardPage } from './Pages/CardPage';
import { Favourites } from './Pages/Favourites';

export const App = () => {
  return (
    <ProductsProvider>
      <div className="App">
        <MainNav />
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<HomePage />} />
          <Route path="phones">
            <Route index element={<ProductPage category="phone" />} />
            <Route path=":productId" element={<ProductDetails />} />
          </Route>
          <Route path="tablets">
            <Route index element={<ProductPage category="tablet" />} />
            <Route path=":productId" element={<ProductDetails />} />
          </Route>
          <Route path="accessories">
            <Route index element={<ProductPage category="accessories" />} />
            <Route path=":productId" element={<ProductDetails />} />
          </Route>
          <Route path="favourites" element={<Favourites />} />
          <Route path="cart" element={<CardPage />} />
        </Routes>
        <Footer />
      </div>
    </ProductsProvider>
  );
};
