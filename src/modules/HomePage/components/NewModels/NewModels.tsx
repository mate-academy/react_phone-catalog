import { useEffect, useState } from 'react';
import { ProductCarousel } from '../../../shared/components/ProductCarousel';
import { getNewModels, getProducts } from '../../../../utils/api';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../../../shared/components/ProductCard';

export const NewModels = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(productsFromServer => {
      setNewProducts(getNewModels('phones', productsFromServer));
    });
  }, []);

  return (
    <ProductCarousel title={'Brand new models'}>
      {newProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductCarousel>
  );
};
