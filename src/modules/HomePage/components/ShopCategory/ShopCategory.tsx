import styles from '../ShopCategory/ShopCategory.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Category } from '../../../../types/Category';
import { ProductType } from '../../../../types/ProductType';
import { instantScroll } from '../../../../utils/instantScroll';
import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ProductListContext } from '../../../../ContextProvider';
import { ThemeType } from '../../../../types/ThemeType';

interface Props {
  isLoading: boolean;
}

export const ShopCategory: React.FC<Props> = ({ isLoading }) => {
  const { t } = useTranslation(['homepage', 'common']);
  const { productList } = useContext(ProductListContext);
  const [phonesLength, tabletsLength, accessoriesLength] = Object.keys(
    ProductType,
  ).map(productType => {
    return productList.filter(({ category }) => category === productType)
      .length;
  });
  const isDark = localStorage.getItem('theme') === ThemeType.dark;

  return (
    <section className={styles.shopCategoryContainer}>
      <h2 className={styles.title}>
        {t('titles.shopByCategoryTitle', { ns: 'homepage' })}
      </h2>

      {Object.keys(Category).map((category, index) => (
        <div
          className={classNames(
            styles.categoryContainer,
            styles[`categoryContainer${index + 1}`],
          )}
          key={category}
        >
          <Link
            to={`${category}`}
            className={classNames(
              styles.imgContainer,
              styles[`imgContainer${index + 1}`],
            )}
            onClick={instantScroll}
          >
            <img
              src={`img/${category}-category.webp`}
              alt={`${category}`}
              className={styles.imgItem}
            />
          </Link>
          <h4 className={styles.categoryTitle}>
            {category === ProductType.phones
              ? t('productCategory.mobilePhones', { ns: 'common' })
              : category === ProductType.tablets
                ? t('productCategory.tablets', { ns: 'common' })
                : t('productCategory.accessories', { ns: 'common' })}
          </h4>
          <p className={styles.categoryNumModels}>
            {isLoading ? (
              <SkeletonTheme
                baseColor={isDark ? '#3B3E4A' : '#E2E6E9'}
                highlightColor={isDark ? '#4A4D58' : '#F4F5F6'}
              >
                <Skeleton className={styles.categoryNumModelsSkeleton} />
              </SkeletonTheme>
            ) : category === ProductType.phones ? (
              t('models', { ns: 'common', count: phonesLength })
            ) : category === ProductType.tablets ? (
              t('models', { ns: 'common', count: tabletsLength })
            ) : (
              t('models', { ns: 'common', count: accessoriesLength })
            )}
          </p>
        </div>
      ))}
    </section>
  );
};
