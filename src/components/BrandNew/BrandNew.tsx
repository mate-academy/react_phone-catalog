import React, { useEffect, useState } from 'react';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import { filterProducts, sortProductsByNewest } from '../../utils/utils';
import { Product } from '../../type/Product';
import { getProduct } from '../../helpers/fetchClient';
import './BrandNew.scss';

interface BrandNewModulesProps {
  products: Product[];
}

export const BrandNew: React.FC<BrandNewModulesProps> = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const products = await getProduct();
      const filteredProducts = filterProducts(products);
      const hotPriceProducts = sortProductsByNewest(filteredProducts);

      setNewProducts(hotPriceProducts);
    }

    fetchProducts();
  }, []);

  return (
    <div className="brand-new" data-cy="cardsContainer">
      <ProductSlider
        title="Brand New Modules"
        products={newProducts}
      />
    </div>
  );
};
