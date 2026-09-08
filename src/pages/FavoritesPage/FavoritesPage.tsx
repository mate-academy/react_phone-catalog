import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard';
import useFavoritesStore from '../../stores/useFavoritesStore';
import useLanguageStore from '../../stores/useLanguageStore';
import styles from './FavoritesPage.module.scss';
import favoritesIsEmpty from '../../images/product-not-found.png';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { useEffect, useMemo } from 'react';
import useAllProductsStore from '../../stores/useAllProductsStore';

function FavoritesPage() {
  const { favorites } = useFavoritesStore();
  const { t } = useLanguageStore();
  const { allProducts, fetchAllProducts } = useAllProductsStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // Обчислення "найновіших" продуктів
  const newestProducts = useMemo(() => {
    if (!allProducts) {
      return [];
    }

    return [...allProducts].sort((a, b) => b.year - a.year).slice(0, 10); // Наприклад, 10 найновіших для слайдера
  }, [allProducts]);

  return (
    <>
      <div className={styles.favorites}>
        <Breadcrumbs product={null} />

        <h1 className={styles.favorites_title}>{t('nav_favourites')}</h1>

        {favorites.length === 0 ? (
          <div className={styles.favourites__message_wrapper}>
            <h3 className={styles.favourites__message_1}>
              {t('favourites_no_items_1')}
            </h3>
            <p className={styles.favourites__message_2}>
              {t('favourites_no_items_2')}
            </p>
            <img
              className={styles.favourites__message_img}
              src={favoritesIsEmpty}
              alt="favourites is empty"
            />
          </div>
        ) : (
          <>
            <p className={styles.favorites_total_products}>
              {favorites.length} {t('category_models_count')}
            </p>

            <div className={styles.favorites_products}>
              {favorites.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className={styles.newest_products}>
          <ProductSlider
            products={newestProducts}
            title={t('newest_products_title')}
          />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default FavoritesPage;
