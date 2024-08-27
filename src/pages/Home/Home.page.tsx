// eslint-disable-next-line max-len
import { BannerSlider } from '../../components/BannerSlider/BannerSlider.component';
// eslint-disable-next-line max-len
import { ProductSlider } from '../../components/base/ProductSlider/ProductSlider.component';

export const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="home-page__title">Welcome to Nice Gadgets store!</h1>
      <BannerSlider />
      <ProductSlider title={'Brand new models'} />
    </div>
  );
};
