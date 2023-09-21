import { Product } from '../../types/Product';
import { ProductsSlider } from '../ProductsSlider';
import './HomePage.scss';

export const HomePage = () => {
  const product: Product = {
    age: 1,
    type: 'tablet',
    id: 'motorola-xoom',
    imageUrl: 'img/phones/motorola-xoom.0.jpg',
    name: 'MOTOROLA XOOM™',
    // eslint-disable-next-line max-len
    snippet: 'The Next, Next Generation\n\nExperience the future with MOTOROLA XOOM, the world\'s first tablet powered by Android 3.0 (Honeycomb).',
    price: 910,
    discount: 10,
    screen: '10.1 inches',
    capacity: '32000MB',
    ram: '1000MB',
  };

  return (
    <div className="HomePage">
      <h1>Home Page</h1>

      <ProductsSlider
        sliderTitle="Hot prices"
        products={[product, product, product, product, product]}
      />
    </div>
  );
};
