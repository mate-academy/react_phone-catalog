import { BannerSlider } from './components/BannerSlider/BannerSlider';
import { Categories } from './components/Categories';
import { GoodsSlider } from '../../components/GoodsSlider';

import s from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className="HomePage">
      <h1 className="is-hidden">Product Catalog</h1>
      <h2 className={`title mb-0 ${s.homepage_title}`}>
        Welcome to Nice Gadgets store!
      </h2>
      {/* hero */}
      <BannerSlider />

      {/* Brand new models */}
      <div className={`section px-0 ${s.styled_section}`}>
        <div className={`${s.absolute_wrapper}`}>
          <h2
            className={`title mb-0 ${s.home_titles} ${s.mobile_title}`}
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            Brand new models
          </h2>
          <GoodsSlider collectionType={'new'} />
        </div>
      </div>

      <div className={`section px-0 ${s.styled_section}`}>
        <Categories />
      </div>

      {/* Hot prices */}
      <div className={`section px-0 ${s.styled_section}`}>
        <div className={`${s.absolute_wrapper}`}>
          <h2 className={`title mb-0 ${s.home_titles} ${s.absolute_title}`}>
            Hot prices
          </h2>
          <GoodsSlider collectionType={'hot'} />
        </div>
      </div>
    </div>
  );
};
