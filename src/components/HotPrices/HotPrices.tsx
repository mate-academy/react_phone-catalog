import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../Context/GlobalContext';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';
import './HotPrices.scss';

export const HotPrices = () => {
  const [hotPrices, setHotPrices] = useState<Product[]>([]);
  const { products } = useContext(GlobalContext);

  useEffect(() => {
    const newProducts = products.map(product => {
      const discount = product.fullPrice - product.price;

      return { ...product, discount };
    });

    newProducts
      .sort((a, b) => b.discount - a.discount);

    const slicedProd = newProducts.slice(0, 21);

    setHotPrices(slicedProd);
  }, [products]);

  return (
    <section className="hot-prices">
      <ProductsSlider
        sliderTitle="Hot prices"
        items={hotPrices}
        discount
      />
    </section>
  );
};
