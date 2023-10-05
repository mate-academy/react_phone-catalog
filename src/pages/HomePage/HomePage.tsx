import { FC, useEffect, useState } from 'react';

import { getProducts } from '../../api/products';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { Product } from '../../types/Product';

import { Banner } from '../../components/Banner/Banner';
import { Categories } from '../../components/Categories/Categories';
import { ProductsSlider } from '../../components/ProductSlider/ProductsSlider';
import { Loader } from '../../components/Loader/Loader';

export const HomePage: FC = () => {
  const [products, setProducts] = useLocalStorage<Product[]>('products', []);
  const [isLoading, setIsloading] = useState(false);

  const newModels = products.filter(product => product.year > 2018)
    .sort((a, b) => b.price - a.price);

  useEffect(() => {
    if (!products.length) {
      (async () => {
        try {
          setIsloading(true);
          const productsFromServer = await getProducts();

          setProducts(productsFromServer);
        } catch (error) {
          Promise.reject(new Error('error'));
        } finally {
          setIsloading(false);
        }
      })();
    }
  }, []);

  return (
    <main>
      {isLoading ? <Loader /> : (
        <>
          <Banner />

          <ProductsSlider
            products={products}
            title="Hot prices"
          />

          <Categories products={products} />

          <ProductsSlider
            products={newModels}
            title="Brand new models"
          />
        </>
      )}
    </main>
  );
};
