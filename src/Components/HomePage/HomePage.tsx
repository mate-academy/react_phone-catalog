import { Categories } from '../Categories/Categories';
import { MainSlider } from '../MainSlider/MainSlider';
import { Navigation } from '../Navigation/Navigation';
import { CartPage } from '../CartPage/CartPage';
import './HomePage.scss';
import { Discounts } from '../OldProductPage/OldProductPage';
import { Footer } from '../Footer/Footer';

export const HomePage = () => {
  return (
    <>
      <Navigation />
      <div className="home">
        <h1 className="home__title">Welcome to Nice Gadgets store!</h1>
        <MainSlider />
        <CartPage />
        <Categories />
        <Discounts />
      </div>
      <Footer />
    </>
  );
};
