import { ProductSlider } from '@components/ProductSlider';
import { getProducts } from '@api/productsApi';
import { ProductType } from 'types/productTypes';

import React, { useEffect, useState } from 'react';

export const YouMayLike: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getProducts();

      const randomProducts = allProducts
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

      const updatedProducts = randomProducts.map(product => ({
        ...product,
        image: `/${product.image}`,
      }));

      setProducts(updatedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <section>
      <ProductSlider title="You may also like" data={products} />
    </section>
  );
};
