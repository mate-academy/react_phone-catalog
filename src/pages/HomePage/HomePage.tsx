import React, { useEffect, useState } from 'react';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { Slider } from '../../components/Slider/Slider';
import { Product } from '../../types/Product';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { getProducts } from '../../api/api';

export const HomePage: React.FC = () => {
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    getProducts()
      .then((products) => {
        setIsLoaded(false);

        const sortedByDiscount = products
          .sort((a, b) => {
            const discountA = ((a.fullPrice - a.price) / a.fullPrice) * 100;
            const discountB = ((b.fullPrice - b.price) / b.fullPrice) * 100;

            return discountA - discountB;
          })
          .filter(product => (
            (product.fullPrice - product.price) / product.fullPrice
          ) * 100 >= 6);

        setHotPriceProducts(sortedByDiscount);

        const sortedByPrice = products
          .filter(product => product.year >= 2019)
          .sort((a, b) => b.price - a.price);

        setBrandNewProducts(sortedByPrice);
        setPhones(products
          .filter(product => product.category === 'phones'));
        setTablets(products
          .filter(product => product.category === 'tablets'));
        setAccessories(products
          .filter(product => product.category === 'accessories'));
      });
  }, []);

  return (
    <div className="page">
      <Slider />
      <div className="HotPrices">
        <ProductSlider
          products={hotPriceProducts}
          name="Hot prices"
          isLoaded={isLoaded}
        />
      </div>
      <ShopByCategory
        phones={phones}
        tablets={tablets}
        accessories={accessories}
        data-cy="categoryLinksContainer"
      />
      <div className="BrandNew">
        <ProductSlider
          products={brandNewProducts}
          name="Brand new"
          isLoaded={isLoaded}
        />
      </div>
    </div>
  );
};
