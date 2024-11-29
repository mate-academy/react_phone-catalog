import './HomePage.scss';

import { ResponsiveHeader } from '../../components/ResponsiveHeader';
import { BannerSlider } from '../../components/Sliders/BannerSlider';
import { Slider } from '../../components/Sliders/Slider';
import { Category } from './Category';

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <section className="home-page__title">
        <ResponsiveHeader>Welcome to Nice Gadgets store!</ResponsiveHeader>
      </section>

      <BannerSlider />

      <Slider title="Brand new models" category="phones" />

      <Category />

      <Slider title="Hot prices" category="phones" />
    </div>
  );
};
