import data from '../../../public/api/products.json';
import { Product } from '../../modules/shared/types/Product';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';

export const HotPrices: React.FC = () => {
  const getHotPriceProducts = (products: Product[]) => {
    return [...products].sort(
      (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
    );
  };

  const hotProducts = getHotPriceProducts(data);

  return (
    <ProductsSlider title="Hot prices" products={hotProducts} showDiscount />
  );
};
