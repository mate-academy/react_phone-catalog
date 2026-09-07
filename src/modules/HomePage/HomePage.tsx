import { useContext, useEffect } from 'react';
import { BrandNewModels } from './components/BrandNewModels';
import { HeroBanner } from './components/HeroBanner';
import { HotPrices } from './components/HotPrices';
import { ShopByCategory } from './components/ShopByCategory';
import { DataContext } from '../../context/DataContext';

export const HomePage = () => {
  const { products } = useContext(DataContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const newProducts = products.filter(product =>
    product.name.includes('iPhone 14'),
  );

  const hotPricesProducts = products.filter(
    product =>
      product.name.includes('iPhone 13') || product.name.includes('iPhone 11'),
  );

  return (
    <div>
      <HeroBanner />
      <BrandNewModels products={newProducts} />
      <ShopByCategory products={products} />
      <HotPrices products={hotPricesProducts} />
    </div>
  );
};
