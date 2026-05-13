import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { useT } from '../../context/LanguageContext';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const t = useT();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? favorites.filter(p => p.name.toLowerCase().includes(q))
      : favorites;
  }, [favorites, query]);

  return (
    <div className={styles.page}>
      <Breadcrumbs crumbs={[{ label: t('favorites.title') }]} />
      <h1 className={styles.h1}>{t('favorites.title')}</h1>
      {favorites.length > 0 && (
        <p className={styles.count}>
          {favorites.length}{' '}
          {favorites.length === 1
            ? t('count.items_one')
            : t('count.items_many')}
        </p>
      )}

      {favorites.length === 0 ? (
        <div className={styles.empty}>
          <p>{t('favorites.empty')}</p>
          <Link to="/phones" className={styles.shopLink}>
            {t('favorites.browse')}
          </Link>
        </div>
      ) : visible.length === 0 ? (
        <p className={styles.empty}>
          {t('favorites.noMatch')} "{query}"
        </p>
      ) : (
        <div className={styles.grid}>
          {visible.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};
