import { useEffect, useState } from 'react';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { Slider } from '../../components/Slider/Slider';
import { Welcome } from '../../components/Welcome/Welcome';
import { Product } from '../../types/Product';
import { getHotProduct, getNewProduct } from '../../helpers/helpers';

export const HomePage = () => {
  const [newProduct, setNewProduct] = useState<Product[]>([]);
  const [hotProduct, setHotProduct] = useState<Product[]>([]);

  useEffect(() => {
    getNewProduct().then(setNewProduct);
  }, []);

  useEffect(() => {
    getHotProduct().then(setHotProduct);
  }, []);

  return (
    <>
      <Welcome />

      <Slider />

      <ProductSlider
        title={'Brand new models'}
        product={newProduct}
        navigationIds={{ prevId: 'newProductPrev', nextId: 'newProductNext' }}
        showDiscount={false}
      />

      <ShopByCategory />

      <ProductSlider
        title={'Hot prices'}
        product={hotProduct}
        navigationIds={{ prevId: 'hotProductPrev', nextId: 'hotProductNext' }}
        showDiscount={true}
      />
    </>
  );
};
