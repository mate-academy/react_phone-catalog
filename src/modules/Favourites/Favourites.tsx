import { useEffect, useState } from 'react';
import styles from './Favourites.module.scss';
import { getDataPublic } from '../../shared/functions/getDataPublic';
import { Article } from '../../shared/types/Article';
import { Product } from '../../shared/Product';
import { useStorage } from '../../context/StorageContext';
import { useWindowWidth } from '../../hooks/WindowWidth';
import { NavAdress } from '../../shared/NavAdress';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const Favourites: React.FC = () => {
  const { favouritesItems } = useStorage();
  const { t } = useTranslation();
  const [products, setProducts] = useState<Article[] | null>(null);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    getDataPublic('products', 10).then((response: Article[]) => {
      const favouritesProducts = response.filter((el: Article) =>
        favouritesItems.includes(el.itemId),
      );

      setProducts(favouritesProducts);
    });
  }, [favouritesItems]);

  return (
    <div className={styles.favourites}>
      {products && (
        <div className={styles.favourites__content}>
          <NavAdress />
          <h1 className={styles.favourites__title}>{t('crt_favourites')}</h1>
          <p
            className={styles.favourites__count}
          >{`${favouritesItems.length} ${t('crt_items')}`}</p>

          <div className={styles.favourites__list}>
            <AnimatePresence mode="popLayout">
              {products.map((product: Article) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: '-50%' }}
                  animate={{ opacity: 1, y: '0' }}
                  exit={{ opacity: 0, y: '+50%' }}
                  className={styles.favourites__wrapper}
                >
                  <Product isCatalog={windowWidth < 640} article={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
      {products?.length === 0 && (
        <img
          src={`${import.meta.env.BASE_URL}/img/product-not-found.png`}
          alt="You dont have favourites products"
          style={{
            height: '40vh',
          }}
        />
      )}
    </div>
  );
};
