import { Header } from '../../components/Header';
import './HomePage.module.scss';
import { Footer } from '../../components/Footer/Footer';
import { Brandmodels } from '../../components/Brandmodels';
import { HotPrices } from '../../components/HotPrices';
import { Categories } from '../../components/Categories';
import { Slider } from '../../components/Slider';

export const HomePage = () => {
  return (
    <div className="homepage">
      <Header />

      <div className="container" id="home">
        <h1 hidden>Product Catalog</h1>
        <h1 className="homepage_title title">Welcome to Nice Gadgets store!</h1>

        <Slider />

        <Brandmodels />

        <Categories />

        <HotPrices />
      </div>

      <Footer />
    </div>
  );
};
