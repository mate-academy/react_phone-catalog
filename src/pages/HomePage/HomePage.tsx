import {
  useState,
  useEffect,
} from 'react';
// import { Banner } from './Banner';

import {
  getAllProducts,
  getBrandNewProducts,
  getHotPriceProducts,
} from '../../helpers/fetchProducts';

import { Banner } from './Banner';
import { ProductSlider } from '../../components/Product/Slider';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';

import './HomePage.scss';

import { ProductTitles } from '../../types/ProductTitles';
import { Categories } from './Categories';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);

  const [error, setError] = useState('');

  const fetchHotProducts = async () => {
    try {
      const hotProductsFromServer: Product[] = await getHotPriceProducts();

      setHotProducts(hotProductsFromServer);
    } catch {
      setError('Unable to load a hot products');
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

  const fetchBrandNewProducts = async () => {
    try {
      const brandNewProductsFromServer: Product[]
        = await getBrandNewProducts();

      setBrandNewProducts(brandNewProductsFromServer);
    } catch {
      setError('Unable to load a brand new products');
    }
  };

  useEffect(() => {
    fetchHotProducts();
    fetchAllProducts();
    fetchBrandNewProducts();
  }, []);

  return (
    <div className="home-page">
      <Banner />

      <div className="container">
        <div className="home-page__hot-products">
          {!error && hotProducts ? (
            <ProductSlider
              title={ProductTitles.HotPrice}
              products={hotProducts}
            />
          ) : (
            <Loader />
          )}
        </div>
      </div>

      <div className="container">
        <Categories products={products} />
      </div>

      <div className="container">
        {!error && brandNewProducts ? (
          <ProductSlider
            title={ProductTitles.NewBrand}
            products={brandNewProducts}
          />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
