import { useContext } from 'react';
import { Product } from '../../types/Product';
import { GlobalContext } from '../Context/GlobalContext';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import './HotPrices.scss';

function getHotPriceProducts(hotProducts: Product[]): Product[] {
  const productsWithDiscounts = hotProducts.filter(
    (product) => product.price,
  );

  productsWithDiscounts.sort((a, b) => {
    return a.price - b.price;
  });

  return productsWithDiscounts;
}

export const HotPrices: React.FC = () => {
  const { products } = useContext(GlobalContext);
  const hotPriceProducts = getHotPriceProducts(products);

  return (
    <section className="hot-prices">
      <div className="container">
        <ProductSlider products={hotPriceProducts} title="Hot prices" />
      </div>
    </section>
  );
};
