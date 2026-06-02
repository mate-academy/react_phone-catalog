import { useEffect, useState } from 'react';
import { ProductCarousel } from '../../../shared/components/ProductCarousel';
import { getNewModels, getProducts } from '../../../../utils/api';
import { Product } from '../../../../types/Product';
import { PhoneCard } from '../../../shared/components/PhoneCard/PhoneCard';

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
        <PhoneCard key={product.id} phone={product} />
      ))}
    </ProductCarousel>
  );
};
