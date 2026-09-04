import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../api/products';
import { getImageUrl } from '../../constants';
import { Product } from '../../types/Product';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => {
        setProducts([]);
      });
  }, []);

  const brandNew = [...products].sort((a, b) => b.year - a.year).slice(0, 8);

  const hotPrices = [...products]
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 8);

  return (
    <main className={styles.page}>
      <h1 className="visually-hidden">Product Catalog</h1>

      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

      <PicturesSlider />

      <ProductsSlider
        title="Brand new models"
        products={brandNew}
        hideDiscount
      />

      <section className={styles.section}>
        <h2>Shop by category</h2>

        <div className={styles.categories}>
          <Link to="/phones" className={styles.category}>
            <div className={styles.categoryImage}>
              <img
                src={getImageUrl('img/category-phones.webp')}
                alt="Mobile phones"
              />
            </div>
            <h3>Mobile phones</h3>
            <p>{products.filter(p => p.category === 'phones').length} models</p>
          </Link>

          <Link to="/tablets" className={styles.category}>
            <div className={styles.categoryImage}>
              <img
                src={getImageUrl('img/category-tablets.webp')}
                alt="Tablets"
              />
            </div>
            <h3>Tablets</h3>
            <p>
              {products.filter(p => p.category === 'tablets').length} models
            </p>
          </Link>

          <Link to="/accessories" className={styles.category}>
            <div className={styles.categoryImage}>
              <img
                src={getImageUrl('img/category-accessories.webp')}
                alt="Accessories"
              />
            </div>
            <h3>Accessories</h3>
            <p>
              {products.filter(p => p.category === 'accessories').length} models
            </p>
          </Link>
        </div>
      </section>

      <ProductsSlider title="Hot prices" products={hotPrices} />
    </main>
  );
};
