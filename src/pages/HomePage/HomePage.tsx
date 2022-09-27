import React, { useEffect, useState, useMemo } from 'react';
import { getAllProducts } from '../../api/api';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { SliderHome } from '../../components/SliderHome';

import './HomePage.scss';

export const HomePage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);

  const [countPhones, setCountPhones] = useState<number>(0);
  const [countTablet, setCountTablet] = useState<number>(0);
  const [countAccessories, setCountAccessories] = useState<number>(0);

  const getHotPriceProducts = () => {
    const hotPriceFilter = allProducts.filter(product => product.discount > 0)
      .sort((a, b) => (
        (b.price / 100) * b.discount) - ((a.price / 100) * a.discount));

    setHotProducts(hotPriceFilter);
  };

  const getBrandNewProducts = () => {
    const brandNewProductsFilter = allProducts
      .filter(product => product.discount === 0)
      .sort((a, b) => b.price - a.price);

    setBrandNewProducts(brandNewProductsFilter);
  };

  useMemo(() => {
    getHotPriceProducts();
    getBrandNewProducts();

    allProducts.forEach(el => {
      switch (el.type) {
        case 'phone':
          setCountPhones((prev) => prev + 1);
          break;
        case 'tablet':
          setCountTablet((prev) => prev + 1);
          break;
        case 'accessory':
          setCountAccessories((prev) => prev + 1);
          break;
        default:
      }
    });
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
      {hotProducts && (
        <ProductsSlider products={hotProducts} title="Hot prices" />
      )}
      <ShopByCategory
        countPhones={countPhones}
        countTablet={countTablet}
        countAccessories={countAccessories}
      />
      {brandNewProducts && (
        <ProductsSlider products={brandNewProducts} title="Brand new models" />
      )}
    </div>
  );
};
