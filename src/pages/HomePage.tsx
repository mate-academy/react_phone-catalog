import { useEffect, useState } from 'react';
import { ProductsSlider } from '../components/ProductsSlider';
import { ShopByCategory } from '../components/ShopByCategory';
import { Banner } from '../components/Banner';
import { useMyContext } from '../context/context';
import { Product } from '../helpers/Types';

export const HomePage = () => {
  const { products } = useMyContext();
  const [hotPrices, setHotPrices] = useState<Product[]>([]);
  const [brandNew, setBrandNew] = useState<Product[]>([]);

  useEffect(() => {
    const getHotPriceProducts = () => {
      setHotPrices(() => products.filter((product) => product.discount > 0)
        .sort((product, product2) => (
          (product2.price * product2.discount) / 100)
      - ((product.price * product.discount) / 100)));
    };

    const getBrandNewProducts = () => {
      setBrandNew(() => products.filter((product) => product.discount <= 0)
        .sort((product, product2) => (
          product2.price - product.price
        )));
    };

    getHotPriceProducts();
    getBrandNewProducts();
  }, [products]);

  return (
    <div className="home">
      <Banner />

      <ProductsSlider
        products={hotPrices}
        title="Hot prices"
      />

      <div data-cy="categoryLinksContainer">
        <ShopByCategory products={products} />
      </div>

      <ProductsSlider
        products={brandNew}
        title="Brand new models"
      />

    </div>
  );
};
