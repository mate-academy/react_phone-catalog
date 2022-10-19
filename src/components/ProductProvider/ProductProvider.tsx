import React, { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../../api/getProducts';

export const ProductsContext = React.createContext<ProductContextType>({
  products: [],
  setProducts: () => {},
  loading: false,
  setLoading: () => {},
  phones: [],
  setPhones: () => {},
  tablets: [],
  setTablets: () => {},
  accessories: [],
  setAccessories: () => {},
  hotPriceProducts: [],
  setHotPriceProducts: () => {},
  brandNewProducts: [],
  setBrandNewProducts: () => {},
  suggestedProducts: [],
  setSuggestedProducts: () => {},
});

export const ProductProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      getProducts()
        .then(result => {
          setProducts(result);
          setLoading(true);
        });
    } catch (error) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setPhones(products.filter(
      product => product.type === 'phone',
    ));
    setTablets(products.filter(
      product => product.type === 'tablet',
    ));
    setAccessories(products.filter(
      product => product.type === 'accessory',
    ));
    setHotPriceProducts(products.filter(
      product => product.discount > 0,
    ).sort((p1, p2) => p1.discount / 100 - p2.discount / 100));
    setBrandNewProducts(products.filter(
      product => product.discount === 0,
    ).sort((p1, p2) => p2.price - p1.price));
    setSuggestedProducts(products.sort(
      () => Math.random() - 0.5,
    ));
  }, [products]);

  const contextValue: ProductContextType = useMemo(() => {
    return {
      products,
      setProducts,
      loading,
      setLoading,
      phones,
      setPhones,
      tablets,
      setTablets,
      accessories,
      setAccessories,
      hotPriceProducts,
      setHotPriceProducts,
      brandNewProducts,
      setBrandNewProducts,
      suggestedProducts,
      setSuggestedProducts,
    };
  }, [products, loading]);

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
