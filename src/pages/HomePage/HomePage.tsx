import { useEffect, useState } from 'react';
import { getHotPriceProducts } from 'api/getHotPriceProducts';
import { getProducts } from 'api/products';
import { Product } from 'types/Product';
import { getNewModels } from 'api/getNewModels';
import { SliderComponent } from './sections/SliderComponent';
import { HotPricesSlider } from './sections/HotPrices';
import { ShopByCategory } from './sections/ShopByCategory';
import { BrandNewModels } from './sections/BrandNewModels';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [newModels, setNewModels] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const data = await getProducts();

    setProducts(data);

    setHotPriceProducts(getHotPriceProducts(data));
    setNewModels(getNewModels(data));

    return data;
  };

  // eslint-disable-next-line no-console
  console.log(products);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <SliderComponent />
      <HotPricesSlider hotPriceProducts={hotPriceProducts} />
      <ShopByCategory />
      <BrandNewModels newModels={newModels} />
    </div>
  );
};
