import { HeroSlider } from '../HeroSlider';
import './HeroSection.scss';

export const HeroSection = () => {
  return (
    <section className="hero__section">
      <h1 className="hero__section-title">
        <span>Welcome to Nice Gadgets store!</span>
      </h1>
      <div className="hero__slider__wrapper">
        <HeroSlider></HeroSlider>
      </div>
    </section>
  );
};
