import './HomePage.scss';

import { ResponsiveHeader } from '../../components/ResponsiveHeader';
import { BannerSlider } from '../../components/Sliders/BannerSlider';

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="home-page__title">
        <ResponsiveHeader>Welcome to Nice Gadgets store!</ResponsiveHeader>
      </div>
      <BannerSlider></BannerSlider>
    </div>
  );
};
