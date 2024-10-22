import { Product } from '../../types/Product';
import './Main.scss';
import Slider from './Slider/Slider';
import { SliderProductCard } from './SliderProductCard/SliderProductCard';
import newProductsData from '../../api/brand-new__models.json';
import productsData from '../../api/products.json';
import { Shop } from './Shop/Shop';
import shops from '../../api/shops.json';

const newproducts: Product[] = newProductsData; // brand-new models
const products: Product[] = productsData; // brand-new models

export const Main: React.FC = () => {
  return (
    <main className="main">
      <section className="welcome-block">
        <h1 className="welcome-block__title">Welcome to Nice Gadgets store!</h1>
        <Slider />
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
    </main>
  );
};
