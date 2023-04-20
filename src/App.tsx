import './styles/main.scss';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { Footer } from './components/Footer';
import { PhonesPage } from './pages/PhonesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { ProductProvider } from './context/ProductsContext';
import { FavouritesPage } from './pages/FavouritesPage';
import { NonePage } from './pages/ComingSoonPage';

const App = () => {
  return (
    <ProductProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Phones" element={<PhonesPage />} />
        <Route path="/Phones/:productId" element={<ProductDetailsPage />} />
        <Route path="/Cart" element={<CartPage />} />
        <Route path="/Favourites" element={<FavouritesPage />} />
        {['/Tabletes', '/Accessories', '/Contacts', '/Rights'].map(path => (
          <Route
            key={path}
            path={path}
            element={<NonePage text="Our product launch is coming soon..." />}
          />
        ))}
        <Route
          path="*"
          element={<NonePage text="Page not found" />}
        />
      </Routes>
      <Footer />
    </ProductProvider>
  );
};

export default App;
