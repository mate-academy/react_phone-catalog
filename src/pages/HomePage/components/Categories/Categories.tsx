import React from 'react';
import styles from './Categories.module.scss';
import { Link } from 'react-router-dom';
import useLanguageStore from '../../../../stores/useLanguageStore';

type Props = {
  totalPhones: number | undefined;
  totalTablets: number | undefined;
  totalAccessories: number | undefined;
};

export const Categories: React.FC<Props> = ({
  totalPhones,
  totalTablets,
  totalAccessories,
}) => {
  const { t } = useLanguageStore();

  const categories = [
    {
      title: t('nav_phones'),
      models: `${totalPhones} ${t('category_models_count')}`,
      image: 'src/images/category-phones.webp',
      link: '/phones',
      bgColor: '#6D6474',
    },
    {
      title: t('nav_tablets'),
      models: `${totalTablets} ${t('category_models_count')}`,
      image: 'src/images/category-tablets.webp',
      link: '/tablets',
      bgColor: '#8D8D92',
    },
    {
      title: t('nav_accessories'),
      models: `${totalAccessories} ${t('category_models_count')}`,
      image: 'src/images/category-accessories.webp',
      link: '/accessories',
      bgColor: '#973D5F',
    },
  ];

  return (
    <section>
      <div className={styles.categories}>
        <h2 className={styles.categories_title}>{t('home_category_title')}</h2>
        <div className={styles.categories_cards}>
          {categories.map(cat => (
            <Link to={cat.link} key={cat.title} className={styles.card}>
              <div
                className={styles.image_conteiner}
                style={{ backgroundColor: cat.bgColor }}
              >
                <img src={cat.image} alt={cat.title} className={styles.image} />
              </div>

              <div className={styles.description}>
                <h4 className={styles.card_title}>{cat.title}</h4>
                <p className={styles.card_models}>{cat.models}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
