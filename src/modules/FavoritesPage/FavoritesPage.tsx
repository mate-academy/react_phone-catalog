import { useMemo } from 'react';
import { useFavorites } from '../../shared/context/FavoritesContext';
import { useProductsIndex } from '../../shared/hooks/useProductsIndex';
import { ProductsList } from '../../shared/components/ProductsList';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../shared/components/Breadcrumbs';
import s from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { ids, count } = useFavorites();
  const { items, loading, error, reload } = useProductsIndex();
  const [params] = useSearchParams();
  const query = (params.get('query') || '').trim().toLowerCase();

  const favorites = useMemo(() => {
    const base = items.filter(p => ids.has(p.itemId));

    if (!query) {
      return base;
    }

    return base.filter(
      p =>
        p.name.toLowerCase().includes(query) ||
        p.capacity.toLowerCase().includes(query) ||
        p.color.toLowerCase().includes(query),
    );
  }, [items, ids, query]);

  const total = favorites.length;

  if (loading) {
    return <div style={{ padding: 24 }}>Loading…</div>;
  }

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        Something went wrong. <button onClick={reload}>Reload</button>
      </div>
    );
  }

  return (
    <section className={s.root}>
      <div className={s.inner}>
        <div className={s.back}>
          <Breadcrumbs trail={[{ label: 'Favorites' }]} />
        </div>
        <h1 className={s.title}>Favorites ({count})</h1>
        {total > 0 ? (
          <>
            <div className={s.stats}>
              {total} item{total !== 1 && 's'}
            </div>
            <div className={s.products}>
              <ProductsList items={favorites} />
            </div>
          </>
        ) : (
          <p className={s.empty}>
            There are no favorite products
            {query ? ' matching the query' : ' yet'}
          </p>
        )}
      </div>
    </section>
  );
};
