import { BannerSlider } from './components/BannerSlider/BannerSlider';
import { Categories } from './components/Categories';
import { GoodsSlider } from '../../components/GoodsSlider';
import s from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className="container ">
      <div className="HomePage">
        <h1 className="is-hidden">Product Catalog</h1>
        <h1 className={`title ${s.homepage_title}`}>
          Welcome to Nice Gadgets store!
        </h1>
        {/* hero */}

        <BannerSlider />

        {/* Brand new models */}
        <h2 className="title">Brand new models</h2>
        <GoodsSlider collectionType={'new'} />

        <Categories />

        {/* Hot prices */}
        <h2 className="title">Hot prices</h2>
        <GoodsSlider collectionType={'hot'} />
      </div>
    </div>
  );
};
