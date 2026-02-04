import styles from './Categories.module.scss';
import { CategoriesSkeleton } from '../CategoriesSkeleton';
import { useCategories } from './hooks/useCategories';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Categories = () => {
  const { t } = useTranslation();
  const { counts, isLoading } = useCategories();

  if (isLoading) {
    return <CategoriesSkeleton />;
  }

  return (
    <section className={styles.categories}>
      <h2 className={styles.title}>{t('categories.title')}</h2>

      <div className={styles.list}>
        {[
          {
            titleKey: 'categories.phonesTitle',
            amount: counts.phones,
            img: '/img/category-phones.webp',
            link: 'phones',
          },
          {
            titleKey: 'categories.tabletsTitle',
            amount: counts.tablets,
            img: '/img/category-tablets.png',
            link: 'tablets',
          },
          {
            titleKey: 'categories.accessoriesTitle',
            amount: counts.accessories,
            img: '/img/category-accessories.png',
            link: 'accessories',
          },
        ].map(({ titleKey, amount, img, link }) => (
          <Link to={`/${link}`} key={link} className={styles.card}>
            <div className={`${styles.imageContainer} ${styles[link]}`}>
              <img src={img} alt={t(titleKey)} className={styles.image} />
            </div>
            <h4 className={styles.cardTitle}>{t(titleKey)}</h4>
            <p className={styles.modelsCount}>
              {t('common.models', { count: amount })}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};
