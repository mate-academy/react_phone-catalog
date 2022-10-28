import { Navigate, Route, Routes } from 'react-router-dom';
import { MainNav } from './components/MainNav';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { HomePage } from './Pages/HomePage';
import { PageNotFound } from './Pages/PageNotFound';
import { ProductsProvider } from './ProductsContext';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <ProductsProvider>
      <div className="App">
        <MainNav />
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </ProductsProvider>
  );
};
