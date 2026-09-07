import React, { useEffect, useState } from 'react';
import { MainSlider } from '../../components/MainSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { getBrandNewProducts, getHotPriceProducts } from '../../api/api';
import { Product } from '../../types/Product';
import './HomePage.scss';

export const HomePage: React.FC = () => {
  const [hotPricesProducts, setHotPricesProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    getHotPriceProducts().then(setHotPricesProducts);
  }, []);

  useEffect(() => {
    getBrandNewProducts().then(setBrandNewProducts);
  }, []);

  return (
    <div className="homePage">
      <MainSlider />

      <section className="hotPrices">
        <h1 className="title">Hot prices</h1>

        <ProductsSlider productsList={hotPricesProducts} showOldPrice />
      </section>

      <ShopByCategory />

      <section className="brandNewProducts">
        <h1 className="title">Brand new models</h1>

        <ProductsSlider productsList={brandNewProducts} showOldPrice={false} />
      </section>
    </div>
  );
};
