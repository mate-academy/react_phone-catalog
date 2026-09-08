import style from './PhonePage.module.scss';
import React, { useEffect, useState } from 'react';

import { ProductList } from '@/components/ProductList/ProductList';
import { fetchProducts } from '@/utils/fetchProduct';
import { Product } from '@/types/Products';
import { Loader } from '@/components/Loader/Loader';

export const Phones: React.FC = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [loader, setLoader] = useState(true);

  const type = 'phones';

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();

        setProduct(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setTimeout(() => {
          setLoader(false);
        }, 1000);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className={style.phone}>
      {loader ? (
        <Loader />
      ) : (
        <div className={style.container}>
          <ProductList proudct={product} categoryProduct={type} />
        </div>
      )}
    </div>
  );
};
