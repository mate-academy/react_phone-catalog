import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import { getProducts } from '../api/products';
import { ProductsSlider } from '../components/ProductsSlider/ProductsSlider';

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
        <ProductsSlider title="Brand new models" products={products} />
      </section>

      <section>
        <h2>Shop by category</h2>
        <div>
          <Link to="/phones">
            <img src="/img/category-phones.png" alt="Mobile phones" />
            <h3>Mobile phones</h3>
            <p>95 models</p>
          </Link>

          <Link to="/tablets">
            <img src="/img/category-tablets.png" alt="Tablets banner" />
            <h3>Tablets</h3>
            <p>24 models</p>
          </Link>
          <Link to="/accessories">
            <img src="/img/category-accessories.png" alt="Accessories banner" />
            <h3>Accessories</h3>
            <p>100 models</p>
          </Link>
        </div>
      </section>

      <section>
        <ProductsSlider title="Hot prices" products={products} />
      </section>
    </main>
  );
};
