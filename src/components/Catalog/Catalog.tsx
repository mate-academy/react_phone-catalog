import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import {
  getBrandNewProducts,
  getHotPriceProducts,
  getProducts,
} from '../../api';
import { Slider } from '../Slider';

import './Home.scss';
import { ShopByCategory } from '../ShopByCategory';
import { Carousel } from '../Carousel';

export const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const hotPriceProductsData = await getHotPriceProducts();
        const brandNewProductsData = await getBrandNewProducts();

        setHotPriceProducts(hotPriceProductsData);
        setBrandNewProducts(brandNewProductsData);
      } catch {
        if (hotPriceProducts.length) {
          setHotPriceProducts([]);
        }

        if (brandNewProducts.length) {
          setBrandNewProducts([]);
        }
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosData = await getProducts();

        setProducts(todosData);
      } catch {
        if (!products.length) {
          setProducts([]);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="carousel-container">
        <Carousel />
      </div>

      {/* <ProductList/> */}
      <div className="section-container">
        {hotPriceProducts.length && (
          <Slider products={hotPriceProducts} title="Hot prices" />
        )}
      </div>

      <div className="section-container">
        <ShopByCategory products={products} />
      </div>

      <div className="section-container">
        {brandNewProducts.length && (
          <Slider products={brandNewProducts} title="Brand new models" />
        )}
      </div>
    </>
  );
};
