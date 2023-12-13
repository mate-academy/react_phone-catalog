import { useState, useEffect } from 'react';
import { BannerSlider } from '../../components/BannerSlider/BannerSlider';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { Product } from '../../types/Product';
import './HomePage.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasError, setHasError] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await fetch('/_new/products.json');
        const response
        = await fetch(
          'https://mate-academy.github.io/react_phone-catalog/'
          + '_new/products.json',
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        setHasError('Something went wrong');
      }
    };

    fetchProducts();
  }, []);

  const getHotPriceProducts = () => {
    return products
      .filter(product => product.fullPrice !== product.price)
      .sort((a, b) => {
        const discountA: number = a.fullPrice - a.price;
        const discountB: number = b.fullPrice - b.price;

        return discountB - discountA;
      });
  };

  const getBrandNewProducts = () => {
    return products
      .sort((a, b) => b.fullPrice - a.fullPrice);
  };

  const hotPriceProducts = getHotPriceProducts();
  const brandNewProducts = getBrandNewProducts();

  return (
    <div>
      <BannerSlider />

      {hasError && (
        <p>{hasError}</p>
      )}

      {!hasError && !!products.length && (
        <>
          <ProductsSlider title="Hot prices" products={hotPriceProducts} />
          <ShopByCategory />
          <ProductsSlider
            title="Brand new models"
            products={brandNewProducts}
          />
        </>
      )}
    </div>
  );
};
