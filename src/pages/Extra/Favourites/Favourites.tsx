import { AnimatePresence, motion } from 'framer-motion';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ProductCard from '../../../components/ProductCard';
import { useFavorites } from '../../../context/FavoritesContext';
import './Favourites.scss';

const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.995 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as any },
  },
  exit: { opacity: 0, y: -12, scale: 0.995, transition: { duration: 0.18 } },
} as const;

const Favourites = () => {
  const { favorites } = useFavorites();

  const renderFavoritesCount = () => {
    const count = favorites.length;
    if (count === 1) {
      return <span className="favourites-item">1 item</span>;
    }
    return <span className="favourites-item">{count} items</span>;
  };

  return (
    <div className="favourites">
      <div className="favourites-breadcrumbs">
        <Breadcrumbs />
      </div>
      <h1 className="favourites-title">Favourites</h1>
      {renderFavoritesCount()}
      <motion.div
        className="favourites-list-grid"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {favorites.map(product => (
            <motion.div
              key={String(product.id)}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Favourites;
