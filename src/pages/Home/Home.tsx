import { useEffect, useState } from 'react';
import './Home.scss';
import { Hero } from '../../components/Hero';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { Product } from '../../types/Product';
import { getProducts } from '../../services/api';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // setIsLoading(true);
    getProducts().then(setProducts);
    // .finally(() => setIsLoading(false));
  }, []);

  // console.log(products);

  return (
    <main className="home">
      <Hero />
      <ProductSlider
        title={'Brand new models'}
        elements={products}
        settings={{
          itemWidth: 272,
          frameSize: 4,
          gap: 16,
          step: 2,
          animationDuration: 1000,
          infinite: false,
        }}
      />
    </main>
  );
};
