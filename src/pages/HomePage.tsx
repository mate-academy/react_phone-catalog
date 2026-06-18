import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../api/products';
import { ProductsSlider } from '../components/ProductsSlider/ProductsSlider';
import { Banner } from '../components/Banner/Banner';
import { Categories } from '../components/Categories/Categories';
import { MainTitle } from '../components/MainTitle/MainTitle';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(data => setProducts(data));
  }, []);

  //#region Sort section

  const hotPrices = [...products]
    .filter(p => p.fullPrice > p.price)
    .sort((a, b) => a.fullPrice - a.price - b.fullPrice + b.price);

  const brandNew = [...products].sort((a, b) => b.year - a.year);

  //#endregion

  return (
    <main>
      <section>
        <MainTitle />
      </section>

      <section>
        <Banner />
      </section>

      <section>
        <ProductsSlider title="Brand new models" products={brandNew} />
      </section>

      <section>
        <Categories title="Shop by category" products={products} />
      </section>

      <section>
        <ProductsSlider title="Hot prices" products={hotPrices} />
      </section>
    </main>
  );
};
