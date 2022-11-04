import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { PageNotFound } from './Pages/PageNotFound';
import { ProductsProvider } from './ProductsContext';
import { Footer } from './components/Footer';
import { PhonePage } from './Pages/PhonePage';
import { MainNav } from './components/MainNav';
import { ProductDetails } from './components/ProductDetails';

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
            <Route index element={<PhonePage />} />
            <Route path=":phoneId" element={<ProductDetails />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </ProductsProvider>
  );
};
