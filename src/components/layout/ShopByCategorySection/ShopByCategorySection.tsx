import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { fetchPhoneDetails } from '@/api/phoneDetails';
import { fetchTabletDetails } from '@/api/tabletDetails';
import { fetchAccessoriesDetails } from '@/api/accessoriesDetails';
import styles from './ShopByCategorySection.module.scss';
import { useAllCategoryDetails } from '@/features/products/hooks/useCategoryDetails';

const CATEGORIES = [
  {
    key: 'phones',
    queryKey: 'phoneDetails',
    fetchFn: fetchPhoneDetails,
    image: './img/category-phones.webp',
    link: '/phones',
    bg: '#6D6474',
    imagePosition: { bottom: '-30%', left: '70%' },
  },
  {
    key: 'tablets',
    queryKey: 'tabletDetails',
    fetchFn: fetchTabletDetails,
    image: './img/category-tablets.png',
    link: '/tablets',
    bg: '#8D8D92',
    imagePosition: { bottom: '-11%', left: '70%' },
  },
  {
    key: 'accessories',
    queryKey: 'accessoriesDetails',
    fetchFn: fetchAccessoriesDetails,
    image: './img/category-accessories.webp',
    link: '/accessories',
    bg: '#973D5F',
    imagePosition: { bottom: '-27%', left: '70%' },
  },
];

export const ShopByCategorySection = () => {
  const { t } = useTranslation();
  const { counts } = useAllCategoryDetails();

  return (
    <section className={`container ${styles.section}`}>
      <h2 className={styles.title}>{t('categories.title')}</h2>

      <div className={styles.grid}>
        {CATEGORIES.map(({ key, image, link, bg, imagePosition }) => (
          <div key={key}>
            <Link
              to={link}
              className={styles.card}
              style={{ backgroundColor: bg }}
            >
              <div
                className={styles.imageWrapper}
                style={{
                  bottom: imagePosition.bottom,
                  left: imagePosition.left,
                }}
              >
                <img
                  src={image}
                  alt={t(`categories.${key}`)}
                  className={styles.image}
                />
              </div>
            </Link>
            <div key={key} className={styles.label}>
              <Link to={link}>
                <h3 className={styles.categoryName}>
                  {t(`categories.${key}`)}
                </h3>
              </Link>
              <p className={styles.count}>
                {t('categories.models', {
                  count: counts[key as keyof typeof counts],
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
