import React, { useEffect, useState } from 'react';
import style from './HomePage.module.scss';
import { PicturesSlider } from './components/PicturesSlider/PicturesSlider';
import { Product } from '@/types/Products';
import { fetchProducts } from '@/utils/fetchProduct';
import { NewModel } from './components/NewModel/NewModel';
import { HotPrice } from './components/HotPrice/HotPrice';
import { Category } from './components/Category/Category';

export const HomePage: React.FC = () => {
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then(data => setProduct(data))
      .catch(error => console.log(error));
  }, []);

  const newProduct = product.filter(item => item.year === 2022);
  const hotPrice = product.filter(item => item.price < 500).sort();

  return (
    <div className={style.container}>
      <PicturesSlider />

      <NewModel products={newProduct} isDiscount={false} />

      <Category />

      <HotPrice products={hotPrice} isDiscount={true} />
    </div>
  );
};
