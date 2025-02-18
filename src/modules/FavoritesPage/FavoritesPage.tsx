import styles from './FavoritesPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useContext } from 'react';
import { FavouriteContext } from '../../ContextProvider';
import { ProductCard } from '../../components/ProductCard';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export const FavoritesPage = () => {
  const { t } = useTranslation('common');
  const { favouriteProducts } = useContext(FavouriteContext);

  return (
    <section className={styles.favoritesPageWrapper}>
      <div className={styles.breadCrumbsContainer}>
        <Breadcrumbs productList={favouriteProducts} />
      </div>
      <div className={styles.favoritesPageContainer}>
        <h1 className={styles.title}>{t('favorites')}</h1>
        <p className={styles.categoryNumModels}>
          {t('models', { count: favouriteProducts.length })}
        </p>
        <div className={styles.mainPartContainer}>
          {favouriteProducts.length ? (
            <div className={styles.productsContainer}>
              {favouriteProducts.map(product => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          ) : (
            <>
              <p className={styles.titleEmpty}>{t('noResult.noFavorites')}</p>
              <Link to={'/'} className={classNames('ctaBtn', styles.ctaBtn)}>
                {t('buttons.findFavorite')}
              </Link>
              <div
                className={styles.emptyFavImg}
                aria-label={t('accessibility.emptyFavorites')}
              ></div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
