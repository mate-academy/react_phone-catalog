import './App.scss';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { NewProductsSlider } from './components/NewProductsSlider';
import { Categories } from './components/Categories';
import { HotPricesSlider } from './components/HotPricesSlider';
import { Footer } from './components/Footer';

export const App = () => (
  <div className="App">
    <Header />
    <main className="section">
      <div className="container">
        <HeroSlider />
        <NewProductsSlider />
        <Categories />
        <HotPricesSlider />
      </div>
    </main>
    <Footer />
  </div>
);
