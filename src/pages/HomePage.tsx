import { useEffect, useState } from 'react';
import { ProductsSlider } from '../components/ProductsSlider';
import { ShopByCategory } from '../components/ShopByCategory';
import { Banner } from '../components/Banner';
import { useMyContext } from '../context/context';
import { Product } from '../helpers/Types';
import { Loader } from '../components/Loader';

export const HomePage = () => {
  const { products } = useMyContext();
  const [hotPrices, setHotPrices] = useState<Product[]>([]);
  const [brandNew, setBrandNew] = useState<Product[]>([]);

  useEffect(() => {
    setHotPrices(() => products.sort((product, product2) => (
      (product2.fullPrice - product2.price)
      - (product.fullPrice - product.price)
    )));

    setBrandNew(() => products.sort((product, product2) => (
      product2.fullPrice - product.fullPrice
    )));
  }, [products]);

  return (
    <div className="home">
      <Banner />
      <div data-cy="cardsContainer">
        {hotPrices.length > 0 ? (
          <ProductsSlider
            products={hotPrices}
            title="Hot prices"
          />
        ) : (<Loader />)}
      </div>

      <div data-cy="categoryLinksContainer">
        <ShopByCategory />
      </div>
      {brandNew.length > 0 ? (
        <ProductsSlider
          products={brandNew}
          title="Brand new models"
        />
      ) : (<Loader />)}

    </div>
  );
};
