// import React, { useContext } from 'react';
import { Products } from '../../Products/Products';
// import { ProductsContext } from '../../ProductsContext/ProductsContext';
// import { Product } from '../../../Types/Product';

// type Props = {
//   products: Product[];
// };

export const Phones: React.FC = () => {
  // const products: Product[] = useContext(ProductsContext);
  // const filteredProducts = products.filter(
  //   (product: Product) => product.category === 'phones',
  // );
  const currentCategory = 'Mobile Phones';

  return (
    <Products
      title={currentCategory}
      category="phones"
      // items={filteredProducts}
    />
  );
};
