import { Link } from 'react-router-dom';
import styles from './Categories.module.scss';
import { useAppSelector } from '../../../../api/hooks';
import { useTranslation } from 'react-i18next';
const Categories = () => {
  const lengthOfPhones = useAppSelector(
    state => state.phones.listOfPhones,
  ).length;
  const lengthOfTablets = useAppSelector(
    state => state.tablets.listOfTablets,
  ).length;
  const lengthOfAccessories = useAppSelector(
    state => state.accessories.listOfAccessories,
  ).length;
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <h1 style={{ display: 'none' }}>Product Catalog</h1>
      <h2>{t('h2Category')}</h2>
      <div className={styles.categories}>
        <Link
          to="/phones"
          className={styles.category}
          onClick={() => scrollTo(0, 0)}
        >
          <div
            className={styles.categoryBlock + ' ' + styles.categoryBlock__1}
          ></div>
          <p className={styles.categoryTitle}>{t('mobiles')}</p>
          <p className={styles.categorySubtitle}>
            {lengthOfPhones} {t('models')}
          </p>
        </Link>
        <Link
          to="/tablets"
          className={styles.category}
          onClick={() => scrollTo(0, 0)}
        >
          <div
            className={styles.categoryBlock + ' ' + styles.categoryBlock__2}
          ></div>
          <p className={styles.categoryTitle}>{t('tablets')}</p>
          <p className={styles.categorySubtitle}>
            {lengthOfTablets} {t('models')}
          </p>
        </Link>
        <Link
          to="/accessories"
          className={styles.category}
          onClick={() => scrollTo(0, 0)}
        >
          <div
            className={styles.categoryBlock + ' ' + styles.categoryBlock__3}
          ></div>
          <p className={styles.categoryTitle}>{t('accessors')}</p>
          <p className={styles.categorySubtitle}>
            {lengthOfAccessories} {t('models')}
          </p>
        </Link>
      </div>
    </section>
  );
};

export default Categories;
