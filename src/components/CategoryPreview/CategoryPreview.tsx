import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styles from './CategoryPreview.module.scss';
import img1 from '../../../public/_old/v2/img/category-phones.png';
import img2 from '../../../public/_old/v2/img/category-tablets.png';
import img3 from '../../../public/_old/v2/img/category-accessories.png';

interface RawProduct {
  id: string;
  category: string;
  name: string;
}

export const CategoryPreview: React.FC = () => {
  const { t } = useTranslation();
  const [phonesCount, setPhonesCount] = useState(0);
  const [tabletsCount, setTabletsCount] = useState(0);
  const [accessoriesCount, setAccessoriesCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [phonesRes, tabletsRes, accessoriesRes] = await Promise.all([
          fetch('api/phones.json'),
          fetch('api/tablets.json'),
          fetch('api/accessories.json'),
        ]);

        if (!phonesRes.ok || !tabletsRes.ok || !accessoriesRes.ok) {
          throw new Error('Failed to fetch categories');
        }

        const [phones, tablets, accessories]: RawProduct[][] =
          await Promise.all([
            phonesRes.json(),
            tabletsRes.json(),
            accessoriesRes.json(),
          ]);

        setPhonesCount(phones.length);
        setTabletsCount(tablets.length);
        setAccessoriesCount(accessories.length);
      } catch (err) {}
    };

    fetchData();
  }, []);

  const categories = [
    {
      img: img1,
      title: t('home.categories.phones'),
      subtitle: t('home.categories.phonesSubtitle', { count: phonesCount }),
      bg: '#F1E0B5',
      link: '/phones',
    },
    {
      img: img2,
      title: t('home.categories.tablets'),
      subtitle: t('home.categories.tabletsSubtitle', { count: tabletsCount }),
      bg: '#8D8D92',
      link: '/tablets',
    },
    {
      img: img3,
      title: t('home.categories.accessories'),
      subtitle: t('home.categories.accessoriesSubtitle', {
        count: accessoriesCount,
      }),
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
