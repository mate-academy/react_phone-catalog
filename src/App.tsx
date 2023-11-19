import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { Shopping } from './components/shopping/Shopping';
import { Favorit } from './pages/favorite/Favorite';
import { Home } from './pages/home/Home';
import { ProductCatalog } from './pages/productCatalog/ProductCatalog';
import { ProductDetails } from './pages/productDetails/ProductDetails';

const App = () => (
  <div className="App">
    <Header />
    <main className="main">
      <Routes>
        <Route path="*" element={<h1>Page not found</h1>} />
        <Route path="/" element={<Home />} />
        <Route path="/" element={<ProductCatalog />}>
          <Route path="phones" element={<ProductCatalog />} />
          <Route path="tablets" element={<ProductCatalog />} />
          <Route path="accessories" element={<ProductCatalog />} />
        </Route>
        <Route path="phones" element={<ProductDetails />}>
          <Route path=":id" element={<ProductDetails />} />
        </Route>
        <Route path="tablets" element={<ProductDetails />}>
          <Route path=":id" element={<ProductDetails />} />
        </Route>
        <Route path="/favorites" element={<Favorit />} />
        <Route path="/shopping" element={<Shopping />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

export default App;
