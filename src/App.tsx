import { Route, Routes } from 'react-router-dom';
import { ProductCard } from './modules/shared/components/ProductCard';
import './App.modules.scss';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';

export const App = () => {
  return (
    <>
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<ProductCard />} />
          <Route path="phones" />
          <Route path="tablets" />
          <Route path="accesories" />
        </Routes>
      </div>
      <Footer />
    </>
  );
};
