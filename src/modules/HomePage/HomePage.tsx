import {
  categoriesArr,
  CategoriesContext,
} from '../../components/CategoriesContext/CategoriesContext';
import { BannerSlider } from './components/BannerSlider/BannerSlider';
import { Categories } from './components/Categories';
import { GoodsSlider } from './components/GoodsSlider';
import s from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <CategoriesContext.Provider value={categoriesArr}>
      <div className="container">
        <div className="HomePage">
          <h1 className="is-hidden">Product Catalog</h1>
          <h1 className={`title ${s.homepage_title}`}>
            Welcome to Nice Gadgets store!
          </h1>
          <BannerSlider />
          <GoodsSlider />
          <Categories />
          <GoodsSlider />
        </div>
      </div>
    </CategoriesContext.Provider>
  );
};
