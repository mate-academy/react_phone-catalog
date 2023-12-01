import { useEffect, useState } from 'react';
import { Product } from '../../Types/Product';
import { ProductSlider } from '../ProductSlider/ProductSlider';

export const BrandNew = () => {
  const [products, setProducts] = useState<Product[]>([]);

  function getBrandNewModels() {
    fetch('http://localhost:3000/_new/products.json')
      .then((response) => response.json())
      .then((productsFromServer) => {
        const sortedByNewest = productsFromServer.sort(
          (a: Product, b: Product) => b.price - a.price,
        );

        return setProducts(sortedByNewest);
      });
  }

  useEffect(() => {
    getBrandNewModels();
  }, []);

  return <ProductSlider name="Brand new models" products={products} />;
};
