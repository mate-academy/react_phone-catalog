import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import {
  ShopByCategory,
} from '../components/main/home/categories/ShopByCategory';
import {
  CategoriesSlider,
} from '../components/main/home/categories/categories-slider/CategoriesSlider';
import {
  ProductsSlider,
} from '../components/main/products-sliders/ProductsSlider';
import { ProductsSlidersType } from '../helpers/enums/ProductsSliderType';

export const HomePage = () => (
  <>
    <Header
      hasSearch={false}
      currentPage="home"
    />

    <main className="home">
      <CategoriesSlider />

      <ProductsSlider type={ProductsSlidersType.hotProducts}>
        Hot prices
      </ProductsSlider>

      <ShopByCategory />

      <ProductsSlider type={ProductsSlidersType.newProducts}>
        Brand new models
      </ProductsSlider>
    </main>

    <Footer />
  </>
);
