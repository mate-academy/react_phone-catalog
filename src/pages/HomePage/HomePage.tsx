import './HomePage.scss';
import { useEffect, useState } from 'react';
import { Banner } from '../../components/Banner/Banner';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Product } from '../../types/Product';
import {
  getAllProducts,
  getBrandNewProducts,
  getHotPriceProducts,
} from '../../helpers/FetchProducts';
import { Loader } from '../../components/Loader';
import { Category } from '../../components/Category/Category';
import { ProductSection } from '../../types/ProductSection';

export const HomePage = () => {
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');

  const fetchHotProducts = async () => {
    try {
      const hotProductsFromServer: Product[] = await getHotPriceProducts();

      setHotProducts(hotProductsFromServer);
    } catch {
      setError('Unable to load a hot products');
    }
  };

  const fetchBrandNewProducts = async () => {
    try {
      const brandNewProdFromServer: Product[] = await getBrandNewProducts();

      setBrandNewProducts(brandNewProdFromServer);
    } catch {
      setError('Unable to load a brand new products');
    }
  };

  const fetchAllProducts = async () => {
    try {
      const productsFromServer: Product[] = await getAllProducts();

      setProducts(productsFromServer);
    } catch {
      setError('Unable to load a products');
    }
  };

  useEffect(() => {
    fetchHotProducts();
    fetchBrandNewProducts();
    fetchAllProducts();
  }, []);

  return (
    <section className="home-page">
      <Banner />

      <div className="home-page__block home-page__hot-products">
        {!error && hotProducts ? (
          <ProductsSlider
            title={ProductSection.HotPrice}
            products={hotProducts}
          />
        ) : (
          <Loader />
        )}
      </div>

      <div className="home-page__block">
        <Category products={products} />
      </div>

      <div className="home-page__block home-page__new-products">
        {!error && brandNewProducts ? (
          <ProductsSlider
            title={ProductSection.NewBrand}
            products={brandNewProducts}
          />
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
};
