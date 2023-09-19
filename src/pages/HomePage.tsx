import { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { getProductsByCategory } from '../helpers/getProductsByCategory';
import { Loader } from '../components/Loader';
import { BannerSlider } from '../components/BannerSlider';
import { ProductsSlider } from '../components/ProductsSlider';
import { ShopByCategory } from '../components/ShopByCategory';
import './HomePage.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsByCategory()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const hotPriceProducts = [...products]
    .filter(product => product.fullPrice !== product.price)
    .sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price))
    .splice(0, 20);

  const newModelsProducts = [...products]
    .filter(product => product.fullPrice === product.price)
    .sort((a, b) => b.price - a.price);

  return (
    <div className="home-page">
      <div className="home-page__banner-slider">
        <BannerSlider />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="home-page__hot-price">
            <ProductsSlider products={hotPriceProducts} title="Hot prices" />
          </div>

          <div className="home-page__shop-by-category">
            <ShopByCategory products={products} />
          </div>

          <div className="home-page__brand-new-models">
            <ProductsSlider
              products={newModelsProducts}
              title="Brand new models"
            />
          </div>
        </>
      )}
    </div>
  );
};
