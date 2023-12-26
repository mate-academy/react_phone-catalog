import React, {
  useContext,
} from 'react';
import { AppContext } from '../../store/AppProvider';
import { getBrandNewProducts } from '../../api/products';
import { ProductsSlider } from '../ProductsSlider';

import './BrandNewModels.scss';

export const BrandNewModels: React.FC = () => {
  const { products } = useContext(AppContext);

  return (
    <div className="BrandNewModels BrandNewModels__container">
      <ProductsSlider
        title="Brand new models"
        products={getBrandNewProducts(products).slice(0, 16)}
      />
    </div>
  );
};
