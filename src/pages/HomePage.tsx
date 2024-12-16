import { SliderProductCard } from '../components/Main/SliderProductCard/SliderProductCard';
import WelcomeSlider from '../components/Main/Slider/WelcomeSlider';
import { Shop } from '../components/Main/Shop/Shop';

import newProductsData from '../api/brand-new__models.json';
import productsData from '../api/products.json';
import shops from '../api/shops.json';

import { Product } from '../types/Product';

const newproducts: Product[] = newProductsData; // brand-new models
const products: Product[] = productsData; // brand-new models

export const HomePage: React.FC = () => {
  return (
    <>
      <section className="welcome-block">
        <h1 className="welcome-block__title">Welcome to Nice Gadgets store!</h1>
        <WelcomeSlider />
      </section>
      <section className="new-models-block">
        <SliderProductCard
          products={newproducts}
          showFullPrice={false}
          sliderTitle="Brand new models"
        />
      </section>
      <section className="shops-block">
        <h2 className="shops-block__title">Shop by category</h2>
        <Shop shops={shops} />
      </section>
      <section className="section-block">
        <SliderProductCard products={products} showFullPrice={true} sliderTitle="Hot prices" />
      </section>
    </>
  );
};

export default HomePage;
