import './MainHome.scss';
import { useEffect, useState } from 'react';
import BannerSwiper from './BannerSwiper/BannerSwiper';
import ProductSlider from './ProductSlider/ProductSlider';
import { Product } from '../../types/Product';
import { getProducts } from '../../api';
import CategoryPhones from './CategoryPhones/CategoryPhones';
import CategoryTablets from './CategoryTablets/CategoryTablets';
import CategoryAccessories from './CategoryAccessories/CategoryAccessories';

const Main = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);
  const newModels = products.filter(product => product.year >= 2022);
  const hotPrices = products.filter(
    product => product.price < 850 && product.category === 'phones',
  );

  return (
    <div className="main">
      <h1 className="main__title">Welcome to Nice Gadgets store!</h1>
      <BannerSwiper />
      <ProductSlider title="Brand new models" products={newModels} />
      <div className="category__section">
        <h2 className="second__title">Shop by category</h2>
        <div className="categories">
          <CategoryPhones />
          <CategoryTablets />
          <CategoryAccessories />
        </div>
      </div>
      <ProductSlider title="Hot prices" products={hotPrices} />
    </div>
  );
};

export default Main;
