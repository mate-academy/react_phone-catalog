import { Link } from 'react-router-dom';
import { useAppState } from '../../contexts/AppContext';
import { getTranslation } from '../../modules/shared/utils/getTranslation';

import styles from './Categories.module.scss';

export const Categories: React.FC = () => {
  const { products, language } = useAppState();
  const t = getTranslation(language);

  return (
    <section className={styles.section}>
      <h3>{t.categories.title}</h3>

      <div className={styles.wrapper}>
        <Link to="phones" className={`${styles.category}`}>
          <div className={`${styles.banner} ${styles.bannerPhones}`}></div>

          <div className={styles.details}>
            <h5 className={styles.title}>{t.categories.phones}</h5>
            <span className={`${styles.counter} bodyText`}>
              {products.filter(product => product.category === 'phones').length}{' '}
              {t.categories.models}
            </span>
          </div>
        </Link>

        <Link to="tablets" className={`${styles.category}`}>
          <div className={`${styles.banner} ${styles.bannerTablets}`}></div>

          <div className={styles.details}>
            <h5 className={styles.title}>{t.categories.tablets}</h5>
            <span className={`${styles.counter} bodyText`}>
              {
                products.filter(product => product.category === 'tablets')
                  .length
              }{' '}
              {t.categories.models}
            </span>
          </div>
        </Link>

        <Link to="accessories" className={`${styles.category}`}>
          <div className={`${styles.banner} ${styles.bannerAccessories}`}></div>

          <div className={styles.details}>
            <h5 className={styles.title}>{t.categories.accessories}</h5>
            <span className={`${styles.counter} bodyText`}>
              {
                products.filter(product => product.category === 'accessories')
                  .length
              }{' '}
              {t.categories.models}
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
};
