import { BannerSlider } from '../../components/BannerSlider';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="home-page__title">Home Page</h1>
      <BannerSlider />
    </div>
  );
};
