import { BannerSlider } from './components/BannerSlider/BannerSlider';
import { Categories } from './components/Categories/Categories';
import { ProductsSlider } from './components/ProductsSlider/ProductsSlider';

export const HomePage = () => {
  return (
    <>
      <div className="container">
        <h1 className="page-title">Welcome to Nice Gadgets store!</h1>
        <BannerSlider />
        <ProductsSlider title="Brand new models" sortBy="year" />
        <Categories />
        <ProductsSlider title="Hot prices" sortBy="discount" />
      </div>
    </>
  );
};
