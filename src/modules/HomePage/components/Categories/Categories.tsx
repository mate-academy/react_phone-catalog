// #region imports
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../store/hooks';
import { selectCategoryCounts } from '../../../../store/selectors/products';
import { useTranslation } from 'react-i18next';
import { categoriesLinks } from '../../../shared/constants/categories';
import { capitalizeFirstWord } from '../../../../services/capitalizeFirstWord';
import baseStyles from './base.module.scss';
import styles from './Categories.module.scss';
import { useMemo } from 'react';
// #endregion

export const Categories = () => {
  const { t } = useTranslation('homePage');
  const { t: tCategories } = useTranslation('categories');

  const counts = useAppSelector(selectCategoryCounts);

  const categoriesParams = useMemo(
    () => [
      {
        name: tCategories('categoriesNames.phones'),
        img: 'img/categories/Phones.png',
        linkTo: categoriesLinks.phones,
        modelsAmount: counts.phones,
      },
      {
        name: tCategories('categoriesNames.tablets'),
        img: 'img/categories/Tablets.png',
        linkTo: categoriesLinks.tablets,
        modelsAmount: counts.tablets,
      },
      {
        name: tCategories('categoriesNames.accessories'),
        img: 'img/categories/Accessories.png',
        linkTo: categoriesLinks.accessories,
        modelsAmount: counts.accessories,
      },
    ],
    [tCategories, counts],
  );

  return (
    <div className={baseStyles.categories}>
      <h2>{t('categories')}</h2>

      <ul className={baseStyles.categoriesList}>
        {categoriesParams.map(category => (
          <li
            key={category.name}
            className={`${baseStyles.category} ${styles.category}`}
          >
            <Link to={category.linkTo}>
              <img
                src={category.img}
                alt={category.name}
                className={baseStyles.categoryImg}
              />

              <h3 className={styles.categoryName}>
                {capitalizeFirstWord(category.name)}
              </h3>

              <div className={styles.modelsAmount}>
                {`${t('models', { count: category.modelsAmount })}`}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
