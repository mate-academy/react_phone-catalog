// import { useEffect, useState } from 'react';
import { Hero } from '../../components/Hero';

// import ProductSlider from '../../components/ProductSlider/ProductSlider';
import './Home.scss';
// import { Product } from '../../types/Product';
// import { getProducts } from '../../services/api';
// import { ProductCard } from '../../components/ProductCard';

export const Home = () => {
  // const [products, setProducts] = useState<Product[]>([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  // setIsLoading(true);
  // getProducts().then(setProducts);
  // .finally(() => setIsLoading(false));
  // }, []);

  // console.log(products);

  return (
    <main className="home">
      <Hero />
      {/* <ProductSlider
        title={'Brand new models'}
        items={products}
        settings={{
          visibleSlides: 3,
          step: 1,
          animationDuration: 1000,
          infinite: false,
        }}
      /> */}

      {/* <ProductCard product={products[0]} /> */}
    </main>
  );
};
