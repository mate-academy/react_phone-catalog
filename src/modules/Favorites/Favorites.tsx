import { useContext } from 'react';
import styles from './Favorites.module.scss';
import { ProductContext } from '../../context/ProductContext';
import { ProductCard } from '../../components/ProductCard';
import { Breadcrumbs } from '../../components/Breadcrumbs';

const Favorites = () => {
  const { favorites } = useContext(ProductContext);

  return (
    <section className={styles.container}>
      <Breadcrumbs />
      <h1 className={styles.title}>Favorites</h1>
      <p className={styles.count}>{`${favorites.length} items`}</p>
      <div className={styles.favorites}>
        {favorites.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Favorites;
