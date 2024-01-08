import { useState, useEffect } from 'react';
import { BannerSlider } from '../../components/BannerSlider/BannerSlider';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { Product } from '../../types/Product';
import './HomePage.scss';

interface CountOfProducts {
  phones: number;
  tablets: number;
  accessories: number;
}

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasError, setHasError] = useState<string>('');

  const [countOfProducts, setCountOfProducts] = useState<CountOfProducts>({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response
          = await fetch(
            'https://mate-academy.github.io/react_phone-catalog/'
            + '_new/products.json',
          );

        const data = await response.json();

        const phones
          = data.filter(
            (product: Product) => product.category === 'phones',
          );
        const tablets
          = data.filter(
            (product: Product) => product.category === 'tablets',
          ).length;
        const accessories
          = data.filter(
            (product: Product) => product.category === 'accessories',
          ).length;

        setCountOfProducts(
          {
            phones: phones.length,
            tablets: tablets.length,
            accessories: accessories.length,
          },
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

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
          <ShopByCategory countOfProducts={countOfProducts} />
          <ProductsSlider
            title="Brand new models"
            products={brandNewProducts}
          />
        </>
      )}
    </div>
  );
};
