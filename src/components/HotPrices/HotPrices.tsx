import { useAppSelector } from '../../store/hooks';
import { getHotPriceProducts } from '../../api/products';
import { ProductsSlider } from '../ProductsSlider';

import './HotPrices.scss';

export const HotPrices: React.FC = () => {
  const { items: products } = useAppSelector(state => state.products);

  return (
    <div className="HotPrices HotPrices__container">
      <ProductsSlider
        title="Hot prices"
        products={getHotPriceProducts(products).slice(0, 16)}
      />
    </div>
  );
};
