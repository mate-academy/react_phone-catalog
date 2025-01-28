import { useEffect, useState } from 'react';
import { CardSlider } from '../../CardSlider/CardSlider';
import { getProducts } from '../../../api';
import { Product } from '../../../types/ProductsType';

export const BrandNewModels = () => {
  const title = 'Brand new models';
  const [phones, setPhones] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(loadedProducts => {
        return loadedProducts.filter(
          product =>
            product.category === 'phones' &&
            product.year === 2022 &&
            product.itemId.includes('iphone-14'),
        );
      })
      .then(filteredProducts => setPhones(filteredProducts));
  }, []);

  return (
    <div className="brand-new-models">
      <CardSlider cardTitle={title} productCards={phones} />
    </div>
  );
};
