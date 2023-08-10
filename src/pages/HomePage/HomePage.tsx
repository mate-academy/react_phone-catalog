import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { BannerSlider } from '../../components/BannerSlider';
import { HotPrices } from '../../components/HotPrices';
import { ShopByCategory } from '../../components/ShopByCategory';
import { BrandNew } from '../../components/BrandNew';
import { getProducts } from '../../helpers/fetchClient';

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const productsFromServer = await getProducts();

      setProducts(productsFromServer);
    } catch {
      throw new Error('Loading Error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      {isLoading ? (<Loader />) : (
        <>
          <BannerSlider />
          <HotPrices products={products} />
          <ShopByCategory products={products} />
          <BrandNew products={products} />
        </>
      )}
    </>
  );
};
