import React, { useEffect, useState } from 'react';
import style from './HomePage.module.scss';
import { PicturesSlider } from './components/PicturesSlider/PicturesSlider';
import { Product } from '@/types/Products';
import { fetchProducts } from '@/utils/fetchProduct';
import { NewModel } from './components/NewModel/NewModel';
import { HotPrice } from './components/HotPrice/HotPrice';
import { Category } from './components/Category/Category';
import { Loader } from '@/components/Loader/Loader';

export const HomePage: React.FC = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetchProducts()
    //   .then(data => setProduct(data))
    //   .catch(error => console.log(error))
    //   .finally {
    //     setLoading(false);

    //   }

    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProduct(data); // Фільтруємо тільки телефони
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    loadProducts();
  }, []);

  const newProduct = product.filter(item => item.year === 2022);
  const hotPrice = product.filter(item => item.price < 500).sort();

  return (
    <div className={style.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PicturesSlider />

          <NewModel products={newProduct} isDiscount={false} />

          <Category />

          <HotPrice products={hotPrice} isDiscount={true} />
        </>
      )}
    </div>
  );
};
