import { useEffect, useState } from 'react';
import ProductsSlider from '../../components/ui/ProductsSlider/ProductsSlider';
import Slider from '../../components/ui/Slider/Slider';
import { Product } from '../../types';
import './HomePage.scss';
import CategoryBlock from '../../components/ui/CategoryBlock/CategoryBlock';
import { getProducts } from '../../api/client';

export default function HomePage() {
  const [brandNewModel, setBrandNewModel] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(data => {
      const newModelsData = data.slice(-10);

      setBrandNewModel(newModelsData);
    });
  }, []);

  return (
    <div className="HomePage">
      <h1 className="HomePage__title main__title">
        Welcome to Nice Gadgets store!
      </h1>

      <Slider />
      <ProductsSlider title="Brand new models" products={brandNewModel} />
      <CategoryBlock />
      <ProductsSlider title="Hot prices" products={brandNewModel} />
    </div>
  );
}
