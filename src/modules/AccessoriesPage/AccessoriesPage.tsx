import style from './AccessoriesPage.module.scss';
import React, { useEffect, useState } from 'react';

import { ProductList } from '@/components/ProductList/ProductList';
import { fetchProducts } from '@/utils/fetchProduct';
import { Product } from '@/types/Products';

export const Accessories: React.FC = () => {
  const [product, setProduct] = useState<Product[]>([]);

  const type = 'accessories';

  useEffect(() => {
    fetchProducts().then(data => setProduct(data));
  },[]);

  return (
    <div className={style.phone}>
      <div className={style.container}>
        <ProductList proudct={product} categoryProduct={type} />
      </div>
    </div>
  );
};
