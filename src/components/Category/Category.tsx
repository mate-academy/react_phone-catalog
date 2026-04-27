import React from 'react';
import styles from './Category.module.scss';
import { Products } from '../../types/Product';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ContentLoader from 'react-content-loader';
import { useTranslation } from 'react-i18next';

type Props = {
  phones: Products[];
  tablets: Products[];
  accessories: Products[];
};

export const Category: React.FC<Props> = ({ phones, tablets, accessories }) => {
  const { isLoading } = useProducts();
  const { t } = useTranslation();

  return (
    <div className={styles.categorycontainer}>
      <h2 className={styles.title}>{t('titlecategory')}</h2>
      <Link className={styles.boxcategory} to={'/phones'}>
        <div className={styles.imgbox1}>
          <img
            src="./img/category-phones.webp"
            alt="Category"
            className={styles.img}
          />
        </div>

        <h3 className={styles.categorytitle}>{t('mobile')}</h3>
        <p className={styles.text}>
          {isLoading ? (
            <ContentLoader
              speed={2}
              width={100}
              height={20}
              viewBox="0 0 100 20"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="7" y="5" rx="3" ry="3" width="88" height="6" />
            </ContentLoader>
          ) : (
            `${phones.length} ${t('model')}`
          )}
        </p>
      </Link>
      <Link className={styles.boxcategory} to={'/tablets'}>
        <div className={styles.imgbox2}>
          <img
            src="./img/category-tablets.webp"
            alt="Category"
            className={styles.img}
          />
        </div>

        <h3 className={styles.categorytitle}>{t('tablets')}</h3>
        <p className={styles.text}>
          {isLoading ? (
            <ContentLoader
              speed={2}
              width={100}
              height={20}
              viewBox="0 0 100 20"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="7" y="5" rx="3" ry="3" width="88" height="6" />
            </ContentLoader>
          ) : (
            `${tablets.length} ${t('model')}`
          )}
        </p>
      </Link>
      <Link className={styles.boxcategory} to={'/accessories'}>
        <div className={styles.imgbox3}>
          <img
            src="./img/category-accessories.webp"
            alt="Category"
            className={styles.img}
          />
        </div>

        <h3 className={styles.categorytitle}>{t('accessories')}</h3>
        <p className={styles.text}>
          {isLoading ? (
            <ContentLoader
              speed={2}
              width={100}
              height={20}
              viewBox="0 0 100 20"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="7" y="5" rx="3" ry="3" width="88" height="6" />
            </ContentLoader>
          ) : (
            `${accessories.length} ${t('model')}`
          )}
        </p>
      </Link>
    </div>
  );
};
