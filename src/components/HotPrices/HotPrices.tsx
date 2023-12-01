import { useEffect, useState } from 'react';
import { Product } from '../../Types/Product';
import { ProductSlider } from '../ProductSlider/ProductSlider';

export const HotPrices = () => {
  const [products, setProducts] = useState<Product[]>([]);

  function getHotPriceProducts() {
    fetch('http://localhost:3000/_new/products.json')
      .then((response) => response.json())
      .then((productsFromServer) => {
        const sortedByPrice = productsFromServer.sort(
          (a: Product, b: Product) => a.price - b.price,
        );

        return setProducts(sortedByPrice);
      });
  }

  useEffect(() => {
    getHotPriceProducts();
  }, []);

  return <ProductSlider name="Hot prices" products={products} />;
};
