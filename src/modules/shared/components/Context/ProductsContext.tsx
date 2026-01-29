import React, { createContext, useContext, useState } from 'react';
import productsJson from '../../../../../public/api/products.json';

export interface UltimateProducts {
  phones: Product[];
  tablets: Product[];
  accessories: Product[];
}

interface ProductContextProps {
  products: UltimateProducts;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>> | null;
}

const products: UltimateProducts = {
  phones: [],
  tablets: [],
  accessories: [],
};

export const ProductsContext = createContext<ProductContextProps>({
  products: products,
  setProducts: null,
});

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [baseProducts, setProducts] = useState(productsJson);

  Object.keys(products).forEach(category => {
    products[category as keyof UltimateProducts] = baseProducts.filter(prd => {
      if (prd.category === category) {
        return true;
      }

      return false;
    }) as Product[];
  });

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
