import './App.scss';
import { Cart } from './components/Cart';
import { Favourites } from './components/Favourites';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ProductPage } from './components/ProductPage';

export const App = () => (
  <div className="App">
    {/* <h1>Product Catalog</h1> */}
    <Header />
    <HomePage />
    <ProductPage />
    <Favourites />
    <Cart />
    <Footer />
  </div>
);
