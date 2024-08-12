import { useEffect, useState } from 'react';
import { Category } from '../components/Category';
import { ProductSlider } from '../components/ProductSlider';
import { Welcome } from '../components/Welcome';
import { Product } from '../types/Product';
import { getProducts } from '../services/products';
import { Loader } from '../components/Loader';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      getProducts()
        .then(data => {
          setProducts(data);
        })
        .catch(() => {
          throw new Error('Internal Error. Loading Failed');
        })
        .finally(() => setIsLoading(false));
    }, 500);
  }, []);

  const newestModels = [...products].sort((a, b) => b.year - a.year);

  const hotPriceModels = [...products].sort((a, b) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA;
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Welcome />
          <ProductSlider title="New Models" items={newestModels} />
          <Category />
          <ProductSlider title="Hot Price" items={hotPriceModels} />
        </>
      )}
    </>
  );
};
