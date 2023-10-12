import { useEffect, useState } from 'react';
import './homePage.scss';
import { Product } from '../../types/Product';
import {
  getAllProducts,
  getHotProducts,
  getBrandNewProducts,
} from '../../helpers/FetchProducts';
import { Loader } from '../../components/Loader';
import { Category } from '../../components/Category/Category';
import { ProductSection } from '../../types/ProductSection';
import { Banner } from '../../components/Banner/Banner';
import { ProductsSlider } from '../../components/ProductSlider/ProductSlider';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [brandeNewProducts, setBrandeNewProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');

  const fetchHotProducts = async () => {
    try {
      const hotProductsFromServer: Product[] = await getHotProducts();

      setHotProducts(hotProductsFromServer);
    } catch {
      setError('Unable to load hot products');
    }
  };

  const fetchBrandProducts = async () => {
    try {
      const brandProductsFromServer: Product[] = await getBrandNewProducts();

      setBrandeNewProducts(brandProductsFromServer);
    } catch {
      setError('Unable to load brand new products');
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
    fetchBrandProducts();
    fetchAllProducts();
  }, []);

  // console.log(hotProducts);
  // console.log(error);
  return (
    <section className="home-page">
      <Banner />

      <div
        className="home-page__block home-page__hot-products"
      >
        {!error && hotProducts ? (
          <Loader />
        ) : (
          <ProductsSlider
            title={ProductSection.HotPrice}
            products={hotProducts}
          />
        )}
      </div>

      <div className="home-page__block">
        <Category products={products} />
      </div>

      <div
        className="home-page__block home-page__new-products"
      >
        {!error && brandeNewProducts ? (
          <Loader />
        ) : (
          <ProductsSlider
            title={ProductSection.HotPrice}
            products={hotProducts}
          />
        )}
      </div>
    </section>
  );
};
