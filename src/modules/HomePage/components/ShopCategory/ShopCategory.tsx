import styles from '../ShopCategory/ShopCategory.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Category } from '../../../../types/Category';
import phone from '../../../../../public/api/phones.json';
import tablet from '../../../../../public/api/tablets.json';
import watch from '../../../../../public/api/accessories.json';
import { ProductType } from '../../../../types/ProductType';
import { instantScroll } from '../../../../utils/instantScroll';
import { useTranslation } from 'react-i18next';

export const ShopCategory = () => {
  const { t } = useTranslation(['homepage', 'common']);

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
            {category === ProductType.phones
              ? t('models', { ns: 'common', count: phone.length })
              : category === ProductType.tablets
                ? t('models', { ns: 'common', count: tablet.length })
                : t('models', { ns: 'common', count: watch.length })}
          </p>
        </div>
      ))}
    </section>
  );
};
