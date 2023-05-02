import { useEffect, useState } from 'react';
import { Carousel } from '../../components/Carousel';
import { Product } from '../../types/Product';
import {
  getBrandNewProducts,
  getHotPriceProducts,
  getProducts,
} from '../../api';
import { Slider } from '../../components/Slider';

import './Home.scss';
import { ShopByCategory } from '../../components/ShopByCategory';
import { Loader } from '../../components/Loader';

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        const hotPriceProductsData = await getHotPriceProducts();
        const brandNewProductsData = await getBrandNewProducts();

        setHotPriceProducts(hotPriceProductsData);
        setBrandNewProducts(brandNewProductsData);

        setIsLoading(false);
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
        const productsData = await getProducts();

        setProducts(productsData);
      } catch {
        if (!products.length) {
          setProducts([]);
        }
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="carousel-container">
        <Carousel />
      </div>

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
