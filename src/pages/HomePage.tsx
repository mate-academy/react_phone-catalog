import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../api/products';
import { ProductsSlider } from '../components/ProductsSlider/ProductsSlider';
import { Banner } from '../components/Banner/Banner';
import { Categories } from '../components/Categories/Categories';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(data => setProducts(data));
  }, []);

  return (
    <main>
      <section>
        <h1>Welcome to Nice Gadgets store!</h1>
      </section>

      <section>
        <Banner />
      </section>

      <section>
        <ProductsSlider title="Brand new models" products={products} />
      </section>

      <section>
        <Categories title="Shop by category" products={products} />
      </section>

      <section>
        <ProductsSlider title="Hot prices" products={products} />
      </section>
    </main>
  );
};
