import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ProductsPage } from './components/ProductsPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';

const App = () => (
  <div className="wrapper App">
    <Header />
    <main className="main App__main">
      <div className="main__content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/phones"
            element={<ProductsPage type="Phones" title="Mobile phones" />}
          />
          <Route path="/phones/:productId" element={<ProductDetailsPage />} />
          <Route
            path="/tablets"
            element={<ProductsPage type="Tablets" title="Tablets" />}
          />
          <Route
            path="/tablets/:productId"
            element={<ProductDetailsPage />}
          />
          <Route
            path="/accessories"
            element={<ProductsPage type="Accessories" title="Accessories" />}
          />
          <Route
            path="/accessories/:productId"
            element={<ProductDetailsPage />}
          />
        </Routes>
      </div>
    </main>
    <Footer />
  </div>
);

export default App;
