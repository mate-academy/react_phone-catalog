import { MainSlider } from '../MainSlider/MainSlider';
import { Navigation } from '../Navigation/Navigation';
import { CartPage } from '../New_Models/CartPage';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <>
      <Navigation />
      <div className="home">
        <h1 className="home__title">Welcome to Nice Gadgets store!</h1>
        <MainSlider />
        <CartPage />
      </div>
    </>
  );
};
