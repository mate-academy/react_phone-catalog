import { useTranslation } from 'react-i18next';
import { getClassNames } from '../../../utils/classNames';
import styles from './HomeCategories.module.scss';
import { useContext } from 'react';
import { ProductCatalogContext } from '../../../ProductContext';
import { NavLink } from 'react-router-dom';

const HomeCategories: React.FC = () => {
  const { t } = useTranslation();
  const { categories } = useContext(ProductCatalogContext);

  return (
    <div className={styles.categories}>
      <h2 className={styles.categories__title}>{t('home.shop_by_category')}</h2>
      <div className={styles.categories__content}>
        {Object.keys(categories).map(category => (
          <div key={category} className={styles.categories__category}>
            <NavLink
              className={styles.categories__categoryLink}
              to={'/' + category}
            >
              <img
                className={
                  styles.categories__categoryImage +
                  ' ' +
                  getClassNames(
                    'categories__categoryImage_bg_',
                    category,
                    styles,
                  )
                }
                src={`/img/assets/categories/${category}.png`}
                alt={category}
              />
            </NavLink>
            <div className={styles.categories__categoryBottom}>
              <p className={styles.categories__categoryName}>
                {t('home.category_' + category)}
              </p>

              <p className={styles.categories__categoryDescription}>
                {categories[category]} {t('home.models')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
