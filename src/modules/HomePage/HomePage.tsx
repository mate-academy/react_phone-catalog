import { useState, useEffect } from 'react';
import { Product } from '../../types/Product';
import { getHotProducts, getBrandNewProducts } from '../../api/products';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { BannerSlider } from '../../components/BannerSlider/BannerSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory'; // ДОДАНО ІМПОРТ

export const HomePage = () => {
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getHotProducts(), getBrandNewProducts()])
      .then(([hot, brandNew]) => {
        setHotProducts(hot);
        setNewProducts(brandNew);
      })
      // eslint-disable-next-line no-console
      .catch(err => console.error('Error loading homepage data', err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
      <h1 className="visually-hidden">Product Catalog</h1>

      <BannerSlider />

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>
      ) : (
        <>
          <ProductsSlider
            title="Brand new models"
            products={newProducts}
            hideOldPrice={true}
          />

          <ShopByCategory />

          <ProductsSlider title="Hot prices" products={hotProducts} />
        </>
      )}
    </div>
  );
};
