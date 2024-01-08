import { getBrandNewProducts } from '../../api/products';
import { ProductsSlider } from '../ProductsSlider';

import './BrandNewModels.scss';
import { useAppSelector } from '../../store/hooks';

export const BrandNewModels: React.FC = () => {
  const { items: products } = useAppSelector(state => state.products);

  return (
    <div className="BrandNewModels BrandNewModels__container">
      <ProductsSlider
        title="Brand new models"
        products={getBrandNewProducts(products).slice(0, 16)}
      />
    </div>
  );
};
