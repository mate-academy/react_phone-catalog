// eslint-disable-next-line max-len
import { BannerSlider } from '../../components/BannerSlider/BannerSlider.component';

export const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="home-page__title">Welcome to Nice Gadgets store!</h1>
      <BannerSlider />
    </div>
  );
};
