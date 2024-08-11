import { useEffect, useState } from 'react';
import { ShopByCategory } from '../../components/ShopByCategory';
import { Slider } from '../../components/Slider';
import '../../styles/utils/typography.scss';
import './HomePage.scss';
import {
  getBrandNewModels,
  getHotPriceProducts,
} from '../../services/Products';
import { Product } from '../../types/Product';
import { ProductCarousel } from '../../components/ProductCarousel';
import { Loader } from '../../components/Loader';

export const HomePage = () => {
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [brandNewModels, setBrandNewModels] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [fetchedHotProducts, fetchedBrandNewModels] = await Promise.all([
          getHotPriceProducts(),
          getBrandNewModels(),
        ]);

        setHotProducts(fetchedHotProducts);
        setBrandNewModels(fetchedBrandNewModels);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="home-page">
      <h1 className="title home-page__title">Welcome to Nice Gadgets store!</h1>
      <div className="home-page__slider">
        <Slider />
      </div>
      <ProductCarousel products={brandNewModels} title="Brand New Models" />
      <ShopByCategory />
      <ProductCarousel products={hotProducts} title="Hot prices" />
    </div>
  );
};
