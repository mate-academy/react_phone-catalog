import './HomePage.scss';
import { MainSlider } from '../../../MainSlider/MainSlider';
import { Slider } from '../Slider';

export const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-page__container">
        <section className="home-page__slider">
          <h1 className="home-page__title title">
            Welcome to Nice Gadgets store!
          </h1>
          <MainSlider />
        </section>
        <Slider/>
      </div>
    </div>
  );
};
