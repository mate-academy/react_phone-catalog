import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';

export const App = () => {
  return (
    <main>
      <Header />

      <Routes>
        <Route path="/" element={<div>Home page</div>} />
        <Route path="/phones" element={<div>Phones page</div>} />
        <Route path="/tablets" element={<div>Tablets page</div>} />
        <Route path="/accessories" element={<div>Accessories page</div>} />
        <Route path="/cart" element={<div>Phones page</div>} />
        <Route path="/favorites" element={<div>Phones page</div>} />
        <Route path="*" element={<div>Phones page</div>} />
      </Routes>

      <Footer />
    </main>
  );
};
