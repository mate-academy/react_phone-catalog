import './HomePage.scss';
import { MainSlider } from '../MainSlider';
import { SliderCards } from '../SliderCards';
import { newPhones, phonesWithDiscount } from '../../../../constants/common';
import { Category } from '../Category';

export const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-page__container">
        <section className="main-slider">
          <h1 className="home-page__title">
            Welcome to Nice Gadgets store!
          </h1>
          <MainSlider />
        </section>
        <section className="new-models">
          <SliderCards 
            products={newPhones} 
            title="Brand new models" 
          />
        </section>
        <section className="shop-by-category">
          <Category/>
        </section>
        <section className="hot-prices">
          <SliderCards
            products={phonesWithDiscount}
            title="Hot prices"
            discountPrice={true}
          />
        </section>
      </div>
    </div>
  );
};
