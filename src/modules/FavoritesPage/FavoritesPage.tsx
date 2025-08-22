import styles from './FavoritesPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Product } from '../../types/product';
import { ProductCard } from '../../components/ProductCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { motion } from 'motion/react';
import { fadeInDown } from '../../animations/animations';
import { empty_fav } from '../../assets/images';

export const FavoritesPage = () => {
  const favItems = useSelector((state: RootState) => state.favorites.items);

  return (
    <div className="container">
      <motion.div {...fadeInDown}>
        <Breadcrumbs />
      </motion.div>
      <motion.h1 {...fadeInDown} className={styles.title}>
        Favorites
      </motion.h1>
      {favItems.length > 0 && (
        <motion.p {...fadeInDown} className={styles.quantity}>
          {favItems.length} models
        </motion.p>
      )}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
        }}
        className={styles.list}
      >
        {favItems.length !== 0 &&
          favItems.map((product: Product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
      </motion.div>

      {favItems.length === 0 && (
        <img className={styles.empty} src={empty_fav} alt="Empty cart" />
      )}
    </div>
  );
};
