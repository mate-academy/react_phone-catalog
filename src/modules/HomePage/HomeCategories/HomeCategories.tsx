import { useTranslation } from 'react-i18next';
import { Category } from '../../../types/Category';
import { getClassNames } from '../../../utils/classNames';
import styles from './HomeCategories.module.scss';

interface Props {
  categories: Category[];
}

const HomeCategories: React.FC<Props> = ({ categories }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.categories}>
      <h2 className={styles.categories__title}>{t('home.shop_by_category')}</h2>
      <div className={styles.categories__content}>
        {categories.map(category => (
          <div key={category.name} className={styles.categories__category}>
            <img
              className={
                styles.categories__categoryImage +
                ' ' +
                getClassNames(
                  'categories__categoryImage_bg_',
                  category.name,
                  styles,
                )
              }
              src={`/img/assets/categories/${category.name}.png`}
              alt={category.name}
            />

            <div className={styles.categories__categoryBottom}>
              <p className={styles.categories__categoryName}>
                {t('home.category_' + category.name)}
              </p>

              <p className={styles.categories__categoryDescription}>
                {category.amount} {t('home.models')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
