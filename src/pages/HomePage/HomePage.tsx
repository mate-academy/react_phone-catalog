import { BannerCarousel } from '../../components/BannerCarousel';

import './HomePage.scss';

export const HomePage = () => {
  return (
    <>
      <div className="grid">
        <h1 className="item-12 full-width home-title">
          Welcome to Nice <br /> Gadgets store!
        </h1>
        <BannerCarousel />
      </div>
    </>
  );
};
