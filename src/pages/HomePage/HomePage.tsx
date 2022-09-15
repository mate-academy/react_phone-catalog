import React, { useEffect, useState, useMemo } from 'react';
import { getAllProducts } from '../../api/api';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { SliderHome } from '../../components/SliderHome';

import './HomePage.scss';

export const HomePage:React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);

  const getHotPriceProducts = () => {
    const hotPriceFilter = allProducts.filter(product => product.discount > 0)
      .sort((a, b) => ((b.price / 100) * b.discount) - ((a.price / 100) * a.discount));

    setHotProducts(hotPriceFilter);
  };

  const getBrandNewProducts = () => {
    const brandNewProductsFilter = allProducts.filter(product => product.discount === 0)
      .sort((a, b) => b.price - a.price);

    setBrandNewProducts(brandNewProductsFilter);
  };

  useMemo(() => {
    getHotPriceProducts();
    getBrandNewProducts();
  }, [allProducts]);

  useEffect(() => {
    (async () => {
      const allProductsFromServer = await getAllProducts();

      setAllProducts(allProductsFromServer);
    })();
  }, []);

  return (
    <div className="HomePage container">
      <SliderHome />
      {hotProducts && <ProductsSlider products={hotProducts} title="Hot prices" />}
      <ShopByCategory />
      {brandNewProducts && <ProductsSlider products={brandNewProducts} title="Brand new models" />}
    </div>
  );
};
