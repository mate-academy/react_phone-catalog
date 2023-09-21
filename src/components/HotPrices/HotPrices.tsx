import { useProducts } from '../../context/ProductContext';
import { getHotPriceProducts } from '../../utils/getHotPriceProducts';
import { ProductSlider } from '../ProductSlider/ProductSlider';

export const HotPrices = () => {
  const { products } = useProducts();

  const hotPriceProducts = getHotPriceProducts(products);
  const title = 'Hot prices';

  return (
    <div className="container">
      <ProductSlider
        products={hotPriceProducts}
        title={title}
      />
    </div>
  );
};
