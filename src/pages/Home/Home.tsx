import { useEffect, useState } from 'react';
import {
  getBrandNewProducts,
  getHotPriceProducts,
  getProducts,
} from '../../api';
import { Carousel } from '../../components/Carousel';
import { Slider } from '../../components/Slider';
import { Product } from '../../types/Product';

import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Loader } from '../../components/Loader';
import { ShopByCategory } from '../../components/ShopByCategory';
import { somethingWentWrongErrorMessage } from '../../helpers/consts';
import './Home.scss';

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(false);

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
        setError(true);

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
        setError(true);

        if (!products.length) {
          setProducts([]);
        }
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <ErrorMessage message={somethingWentWrongErrorMessage} reload />;
  }

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
