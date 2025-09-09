import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styles from './CategoryPreview.module.scss';
import img1 from '../../assets/images/mobile-phones.png';
import img2 from '../../assets/images/tablets.png';
import img3 from '../../assets/images/accessories.png';

interface CategoryPreviewProps {
  phonesTitle: string;
  tabletsTitle: string;
  accessoriesTitle: string;
}

export const CategoryPreview: React.FC<CategoryPreviewProps> = ({
  phonesTitle,
  tabletsTitle,
  accessoriesTitle,
}) => {
  const { t } = useTranslation();

  const categories = [
    {
      img: img1,
      title: phonesTitle,
      subtitle: t('home.categories.phonesSubtitle'),
      bg: '#6D6474',
      link: '/phones',
    },
    {
      img: img2,
      title: tabletsTitle,
      subtitle: t('home.categories.tabletsSubtitle'),
      bg: '#8D8D92',
      link: '/tablets',
    },
    {
      img: img3,
      title: accessoriesTitle,
      subtitle: t('home.categories.accessoriesSubtitle'),
      bg: '#973D5F',
      link: '/accessories',
    },
  ];

  return (
    <section className={styles.categoryPreview}>
      <h2 className={styles.title}>{t('home.shopByCategory')}</h2>
      <div className={styles.blocks}>
        {categories.map((cat, i) => (
          <NavLink to={cat.link} key={i} className={styles.block}>
            <div
              className={styles.imageWrapper}
              style={{ backgroundColor: cat.bg }}
            >
              <img src={cat.img} alt={cat.title} className={styles.image} />
            </div>
            <div className={styles.textBlock}>
              <p className={styles.titleText}>{cat.title}</p>
              <p className={styles.subtitleText}>{cat.subtitle}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  );
};
