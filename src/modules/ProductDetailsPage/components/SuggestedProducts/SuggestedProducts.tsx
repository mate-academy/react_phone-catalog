import React, { useEffect, useState } from 'react';
import { Product } from '../../../../types/Product';
import { getSuggestedProducts } from '../../../../services/products';
import { ProductsSlider } from '../../../shared/ProductsSlider';

export const SuggestedProducts: React.FC = () => {
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  useEffect(() => {
    getSuggestedProducts().then(setSuggestedProducts);
  }, []);

  return (
    <div className="suggestedProducts">
      <ProductsSlider
        products={suggestedProducts}
        title={'You may also like'}
        discount={true}
      />
    </div>
  );
};
