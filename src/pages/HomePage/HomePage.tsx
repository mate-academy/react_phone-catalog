import { useState, useEffect } from 'react';
import './HomePage.scss';
import {
  getAllProducts,
  getHotProducts,
  // getBrandNewProducts,
} from '../../helpers/FetchProducts';
import { Product } from '../../types/Product';
import { Banner } from '../../components/Banner/Banner';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Loader } from '../../components/Loader/Loader';
import { Categories } from '../../components/Categories/Categories';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');

  const fetchHotProducts = async () => {
    try {
      const hotProductsFromServer: Product[] = await getHotProducts();

      setHotProducts(hotProductsFromServer);
    } catch {
      setError('Unable to load hot products');
    }
  };

  const fetchAllProducts = async () => {
    try {
      const productsFromServer: Product[] = await getAllProducts();

      setProducts(productsFromServer);
    } catch {
      setError('Unable to load products');
    }
  };

  useEffect(() => {
    fetchHotProducts();
    // fetchBrandProducts();
    fetchAllProducts();
  }, []);

  return (
    <div className="home-page">
      <section className="home-page__section">
        <Banner />
      </section>

      <section className="home-page__section">
        {!error && hotProducts ? (
          <ProductsSlider title="Hot prices" products={hotProducts} />
        ) : (
          <Loader />
        )}
      </section>

      <section className="home-page__section">
        <Categories products={products} />
      </section>
    </div>
  );
};
