import { useEffect, useState } from 'react';
import ProductSlider from '../ProductSlider/ProductSlider';
import { getProducts } from '../../api/api';
import { Products } from '../../types/Products';

export const NewModels = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const showDiscount = false;

  useEffect(() => {
    getProducts().then(data => {
      const sorted = [...data].sort((a, b) => b.year - a.year);

      setProducts(sorted);
    });
  }, []);

  return (
    <ProductSlider
      title="Brand new models"
      products={products}
      showDiscount={showDiscount}
    />
  );
};

export default NewModels;
