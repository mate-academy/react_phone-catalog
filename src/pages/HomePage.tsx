import { Link } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { getProducts } from '../services/api';
import { Loader } from '../components/Loader';
import { PicturesSlider } from '../components/PicturesSlider';
import { ProductsSlider } from '../components/ProductsSlider';
import styles from './pages.module.scss';
import { getAssetUrl } from '../utils/asset';

const banners = [
  getAssetUrl('img/banner-tablets.png'),
  getAssetUrl('img/banner-phones.png'),
  getAssetUrl('img/banner-accessories.png'),
];

export const HomePage = () => {
  const { data, loading, error } = useAsync(getProducts, []);

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <p>Something went wrong</p>;
  }

  const hot = [...data]
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 20);

  const newest = [...data].sort((a, b) => b.year - a.year).slice(0, 20);

  const counts = {
    phones: data.filter(item => item.category === 'phones').length,
    tablets: data.filter(item => item.category === 'tablets').length,
    accessories: data.filter(item => item.category === 'accessories').length,
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.welcomeTitle}>Welcome to Nice Gadgets store!</h2>
      <h1 className="visually-hidden">Product Catalog</h1>

      <PicturesSlider images={banners} />

      <ProductsSlider
        title="Brand new models"
        products={newest}
        showDiscount={false}
      />

      <section>
        <h2>Shop by category</h2>
        <div className={styles.categories}>
          <Link to="/phones" className={styles.categoryCard}>
            <img src={getAssetUrl('img/category-phones.png')} alt="Phones" />
            <h3>Mobile phones</h3>
            {counts.phones > 0 && <p>{counts.phones} models</p>}
          </Link>
          <Link to="/tablets" className={styles.categoryCard}>
            <img src={getAssetUrl('img/category-tablets.png')} alt="Tablets" />
            <h3>Tablets</h3>
            {counts.tablets > 0 && <p>{counts.tablets} models</p>}
          </Link>
          <Link to="/accessories" className={styles.categoryCard}>
            <img
              src={getAssetUrl('img/category-accessories.png')}
              alt="Accessories"
            />
            <h3>Accessories</h3>
            {counts.accessories > 0 && <p>{counts.accessories} models</p>}
          </Link>
        </div>
      </section>

      <ProductsSlider title="Hot prices" products={hot} />
    </div>
  );
};
