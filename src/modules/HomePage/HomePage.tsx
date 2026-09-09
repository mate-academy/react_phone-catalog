import { useEffect, useState } from 'react';
import { PicturesSlider } from './components/PicturesSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { Loader } from '../shared/components/Loader';
import { Product } from '../shared/types/Product';
import { getProducts } from '../shared/api/getProducts';
import styles from './HomePage.module.scss';

// новинки: свежий год выпуска первым
const getBrandNew = (products: Product[]) =>
  [...products].sort((a, b) => b.year - a.year).slice(0, 16);

// горячие скидки: самая большая абсолютная скидка первой (README Home п.3)
const getHotPrices = (products: Product[]) =>
  [...products]
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 16);

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.home}>
      {/* для SEO/доступности, визуально скрыт (README Home п.1) */}
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>

      {/* заголовок и баннер стоят ближе друг к другу (56px), чем секции (80px) */}
      <div className={styles.hero}>
        <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

        <PicturesSlider />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ProductsSlider
            title="Brand new models"
            products={getBrandNew(products)}
          />

          <ShopByCategory products={products} />

          <ProductsSlider
            title="Hot prices"
            products={getHotPrices(products)}
            showFullPrice
          />
        </>
      )}
    </div>
  );
};
