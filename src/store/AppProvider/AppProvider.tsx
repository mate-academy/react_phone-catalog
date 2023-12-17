import React, { useCallback, useEffect, useState } from 'react';
import * as ProductApi from '../../api/products';
import { Product, ProductCategory } from '../../types/Product';

type Props = {
  children: React.ReactNode;
};

type AppContextType = {
  products: Product[],
  phones: Product[],
  tablets: Product[],
  accessories: Product[],
  hotPriceProducts: Product[],
  brandNewProducts: Product[],
};

export const AppContext = React.createContext<AppContextType>({
  products: [],
  phones: [],
  tablets: [],
  accessories: [],
  hotPriceProducts: [],
  brandNewProducts: [],
});

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    ProductApi.getProducts()
      .then((p: Product[]) => {
        setProducts(p);
      });
  }, []);

  const getCategory = useCallback((category: ProductCategory) => {
    return [...products].filter(product => product.category === category);
  }, [products]);

  const value = ({
    products,
    phones: getCategory(ProductCategory.Phones),
    tablets: getCategory(ProductCategory.Tablets),
    accessories: getCategory(ProductCategory.Accessories),
    hotPriceProducts: ProductApi.getHotPriceProducts(products),
    brandNewProducts: ProductApi.getBrandNewProducts(products),
  });

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
