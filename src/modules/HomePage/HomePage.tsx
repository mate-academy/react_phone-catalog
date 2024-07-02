import { useContext } from 'react';
import './HomePage.scss';
import { Categorys } from './components/Category';
import { MainSlider } from './components/MainSlider';
import { ProductsSlider } from '../shared/ProductsSlider';
import { ProductContext } from '../shared/Context/Context';

export const HomePage = () => {
  const { products } = useContext(ProductContext);
  const newModels = products.slice(0, 11);
  const hotPrices = products.slice(11, 21);

  return (
    <main className="main">
      <MainSlider />
      <ProductsSlider
        products={newModels.sort((a, b) => b.price - a.price)}
        isDiscount={false}
        title="Brand new models"
      />
      <Categorys />
      <ProductsSlider
        products={hotPrices.sort((a, b) => b.price - a.price)}
        isDiscount={true}
        title="Hot prices"
      />
    </main>
  );
};
