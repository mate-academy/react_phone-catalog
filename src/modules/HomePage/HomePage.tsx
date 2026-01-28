import { BannerSlider } from './components/BannerSlider/BannerSlider';
import { Categories } from './components/Categories';
import { GoodsSlider } from '../../components/GoodsSlider';
import s from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={`container ${s.home_container}`}>
      <div className="HomePage">
        <h1 className="is-hidden">Product Catalog</h1>
        <h1 className={`title ${s.homepage_title}`}>
          Welcome to Nice Gadgets store!
        </h1>

        {/* hero */}
        <BannerSlider />

        {/* Brand new models */}
        <div className={`section px-0 ${s.styled_section}`}>
          <h2 className="title" style={{ position: 'absolute' }}>
            Brand new models
          </h2>
          <GoodsSlider collectionType={'new'} />
        </div>
        <div className={`section px-0 ${s.styled_section}`}>
          <Categories />
        </div>

        {/* Hot prices */}
        <div className={`section px-0 ${s.styled_section}`}>
          <h2 className="title" style={{ position: 'absolute' }}>
            Hot prices
          </h2>
          <GoodsSlider collectionType={'hot'} />
        </div>
      </div>
    </div>
  );
};
