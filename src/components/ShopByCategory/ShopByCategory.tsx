import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TranslationKey, useLanguage } from '../../context/LanguageContext';
import { getPublicPath } from '../../utils/getPublicPath';
import styles from './ShopByCategory.module.scss';

const categoriesData = [
  {
    id: 'phones',
    titleKey: 'home.mobilePhones',
    image: getPublicPath('img/category-phones.webp'),
    link: '/phones',
    bgColor: '#6D6474',
    imgClass: styles.imgPhones,
  },
  {
    id: 'tablets',
    titleKey: 'nav.tablets',
    image: getPublicPath('img/category-tablets.png'),
    link: '/tablets',
    bgColor: '#8D8D92',
    imgClass: styles.imgTablets,
  },
  {
    id: 'accessories',
    titleKey: 'nav.accessories',
    image: getPublicPath('img/category-accessories.png'),
    link: '/accessories',
    bgColor: '#973D5F',
    imgClass: styles.imgAccessories,
  },
] satisfies {
  id: 'phones' | 'tablets' | 'accessories';
  titleKey: TranslationKey;
  image: string;
  link: string;
  bgColor: string;
  imgClass: string;
}[];

export const ShopByCategory = () => {
  const { t } = useLanguage();
  const [counts, setCounts] = useState({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch(getPublicPath('api/phones.json')).then(res => res.json()),
      fetch(getPublicPath('api/tablets.json')).then(res => res.json()),
      fetch(getPublicPath('api/accessories.json')).then(res => res.json()),
    ])
      .then(([phonesData, tabletsData, accessoriesData]) => {
        setCounts({
          phones: phonesData.length,
          tablets: tabletsData.length,
          accessories: accessoriesData.length,
        });
      })
      .catch(() =>
        setCounts({
          phones: 0,
          tablets: 0,
          accessories: 0,
        }),
      );
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{t('home.shopByCategory')}</h2>

      <div className={styles.grid}>
        {categoriesData.map(category => (
          <Link to={category.link} key={category.id} className={styles.card}>
            <div
              className={styles.imageContainer}
              style={{ backgroundColor: category.bgColor }}
            >
              <img
                src={category.image}
                alt={t(category.titleKey)}
                className={category.imgClass}
              />
            </div>

            <h3 className={styles.cardTitle}>{t(category.titleKey)}</h3>
            <p className={styles.cardCount}>
              {t('home.models', { count: counts[category.id] })}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};
