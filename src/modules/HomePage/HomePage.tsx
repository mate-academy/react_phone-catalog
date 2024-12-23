import { useEffect, useState } from 'react';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { Slider } from '../../components/Slider/Slider';
import { Welcome } from '../../components/Welcome/Welcome';
import { Product } from '../../types/Product';
import { getNewProduct } from '../../helpers/helpers';

export const HomePage = () => {
  const [newProduct, setNewProduct] = useState<Product[]>([]);

  useEffect(() => {
    getNewProduct().then(setNewProduct);
  }, []);

  return (
    <>
      <Welcome />
      <Slider />
      <ProductSlider title={'Brand new models'} product={newProduct} />
      <ShopByCategory />
    </>
  );
};
