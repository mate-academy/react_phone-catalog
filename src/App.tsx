import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { PageNotFound } from './Components/PageNotFound';
import { ProductCard } from './Components/ProductCard';

const product = {
  id: 175,
  category: 'tablets',
  itemId: 'apple-ipad-mini-6th-gen-256gb-starlight',
  name: 'Apple iPad Mini (6th Gen) 256GB Starlight',
  capacity: '256GB',
  fullPrice: 649,
  price: 599,
  color: 'starlight',
  image: 'img/tablets/apple-ipad-mini-6th-gen/starlight/00.webp',
  screen: "8.3' Liquid Retina",
  ram: '4GB',
  year: 2021,
};

export const App = () => {
  return (
    <main>
      <Header />
      <ProductCard product={product} />

      <Routes>
        <Route path="/" element={<div>Home page</div>} />
        <Route path="/phones" element={<div>Phones page</div>} />
        <Route path="/tablets" element={<div>Tablets page</div>} />
        <Route path="/accessories" element={<div>Accessories page</div>} />
        <Route path="/cart" element={<div>Cart page</div>} />
        <Route path="/favorites" element={<div>Favorites page</div>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </main>
  );
};
