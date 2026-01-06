import { useEffect, useState } from 'react';
import ProductsSlider from '../../components/ui/ProductsSlider/ProductsSlider';
import Slider from '../../components/ui/Slider/Slider';
import { Product } from '../../types';
import './HomePage.scss';
import CategoryBlock from '../../components/ui/CategoryBlock/CategoryBlock';
import { getProducts } from '../../api/client';

export default function HomePage() {
  const [brandNewModels, setBrandNewModels] = useState<Product[]>([]);
  const [hotPrices, setHotPrices] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(data => {
      const brandNew = data
        .sort((a, b) => b.year - a.year || b.price - a.price)
        .slice(0, 10)
        .map(item => ({ ...item, fullPrice: item.price }));

      setBrandNewModels(brandNew);

      const hot = data
        .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
        .slice(0, 10);

      setHotPrices(hot);
    });
  }, []);

  return (
    <div className="HomePage">
      <h1 className="HomePage__title main__title">
        Welcome to Nice Gadgets store!
      </h1>

      <Slider />
      <ProductsSlider title="Brand new models" products={brandNewModels} />
      <CategoryBlock />
      <ProductsSlider title="Hot prices" products={hotPrices} />
    </div>
  );
}
