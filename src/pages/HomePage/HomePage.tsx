import { useState, useEffect } from 'react';
import './HomePage.scss';
import {
  // getAllProducts,
  getHotProducts,
  // getBrandNewProducts,
} from '../../helpers/FetchProducts';
import { Product } from '../../helpers/Product';
import { Banner } from '../../components/Banner/Banner';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Loader } from '../../components/Loader/Loader';

export const HomePage = () => {
  // const [products, setProducts] = useState<Product[]>([]);
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

  // const fetchAllProducts = async () => {
  //   try {
  //     const productsFromServer: Product[] = await getAllProducts();

  //     setProducts(productsFromServer);
  //   } catch {
  //     setError('Unable to load products');
  //   }
  // };

  useEffect(() => {
    fetchHotProducts();
    // fetchBrandProducts();
    // fetchAllProducts();
  }, []);

  return (
    <section className="home-page">
      <Banner />

      <div
        className="home-page__hot-products"
      >
        {!error && hotProducts ? (
          <ProductsSlider
            title="Hot prices"
            products={hotProducts}
          />
        ) : (
          <Loader />
        )}
      </div>

    </section>
  );
};
