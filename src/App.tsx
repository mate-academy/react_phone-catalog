import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage';
import { Navbar } from './components/Navbar';
import { Phones } from './components/Pages/Phones';
import { Footer } from './components/Footer';
import { Tablets } from './components/Pages/Tablets';
import { Accessories } from './components/Pages/Accessories';
import { ProductCard } from './components/Pages/ProductCard';
import { AddCart } from './components/Pages/AddCart';
import { LikedCart } from './components/Pages/LikedCart';
import { NotFoundPage } from './components/Pages/NotFoundPage';

export const App = () => (
  <>
    <body>
      <header className="header">
        <Navbar />
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/tablets" element={<Tablets />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/cart" element={<AddCart />} />
        <Route path="/favourites" element={<LikedCart />} />
        <Route path="/product/:productId" element={<ProductCard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </body>
  </>
);
