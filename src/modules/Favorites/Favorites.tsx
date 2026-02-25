import { useTranslation } from 'react-i18next';
import { useFavorite } from '../../hooks/context/useFavorite';
import { useProducts } from '../../hooks/context/useProducts';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { Loader } from '../shared/components/Loader';
import { ProductList } from '../shared/components/ProductList';
import styles from './Favorites.module.scss';

export const Favorites = () => {
  const { t } = useTranslation();
  const { favorites, howManyItem } = useFavorite();
  const { products, loading, error, reload } = useProducts();
  const readyProducrt = products.filter(product =>
    favorites.includes(product.itemId),
  );

  if (error) {
    return <Loader status="error" onReload={reload} />;
  }

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[{ label: t('ui.breadcrumbs.favourites') }]}
        classNames={styles.breadcrumbs}
      />

      <h1 className={styles.title}>{t('favourites_page.title')}</h1>

      {howManyItem <= 0 ? (
        <Loader
          status="empty"
          emptyMessage={t('ui.errors.favourites_is_empty')}
          classNames={styles.loader}
        />
      ) : (
        <p className={styles.itemsCount}>
          {t('ui.items_count', { count: howManyItem })}
        </p>
      )}

      <ProductList loading={loading} items={readyProducrt} />
    </div>
  );
};
