// src/pages/Favorites/Favorites.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './Favorites.module.css';
import { BrandNewModels } from '../../components/BrandNewModels';
import { Loader } from '../../components/Loader';
import { Select } from '../../components/Select';
import { useFavorites } from './FavoritesContext';
import Search from '../../components/Search';
import { useSearchVisibility } from '../../context/SearchVisibilityContext';
import { Product } from '../../types/Product';

export interface FavoritesProps {
  title?: string;
  dataTestIdPrefix?: string;
}

const Favorites: React.FC<FavoritesProps> = ({
  title = 'Favoritos',
  dataTestIdPrefix = 'favorites',
}) => {
  const [order, setOrder] = useState<'recent' | 'alphabetical' | 'cheap'>(
    'recent',
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const { favorites } = useFavorites();
  const { setVisible } = useSearchVisibility();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);

    return () => clearTimeout(timer);
  }, []);

  // ativa/desativa barra de busca global
  useEffect(() => {
    setVisible(true);

    return () => setVisible(false);
  }, [setVisible]);

  // ordenação
  const orderedItems: Product[] = useMemo(() => {
    const items = [...favorites];

    if (order === 'alphabetical') {
      items.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === 'cheap') {
      items.sort(
        (a, b) =>
          parseFloat((a.price ?? '0').replace(/[^\d.-]/g, '')) -
          parseFloat((b.price ?? '0').replace(/[^\d.-]/g, '')),
      );
    }

    return items;
  }, [favorites, order]);

  // filtro por searchQuery
  const filteredItems: Product[] = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    if (!q) {
      return orderedItems;
    }

    return orderedItems.filter(item => {
      const titleMatch = item.title?.toLowerCase().includes(q);
      const specsMatch = Object.values(item.specs ?? {})
        .join(' ')
        .toLowerCase()
        .includes(q);
      const descMatch =
        typeof item.description === 'string' &&
        item.description.toLowerCase().includes(q);

      return Boolean(titleMatch || specsMatch || descMatch);
    });
  }, [orderedItems, searchQuery]);

  const handleOrderChange = (value: string) => {
    if (value === 'recent' || value === 'alphabetical' || value === 'cheap') {
      setOrder(value);
    }
  };

  const handleSearch = (term: string) => {
    setSearchQuery(term);
  };

  if (isLoading) {
    return <Loader message="Carregando favoritos..." />;
  }

  if (favorites.length === 0) {
    return (
      <main
        className={styles.container}
        data-testid={`${dataTestIdPrefix}-empty`}
      >
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.emptyText}>
          Você ainda não adicionou nenhum favorito.
        </p>
        <Link to="/" className={styles.backLink}>
          Voltar para a loja
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.container} data-testid={`${dataTestIdPrefix}-page`}>
      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <div className={styles.headerRight}>
          <Search onSearch={handleSearch} />
          <div className={styles.selectWrapper}>
            <Select value={order} onChange={handleOrderChange} />
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {filteredItems.map(p => (
          <div key={p.id} className={styles.cardWrapper}>
            <Link
              to={`/product/${p.id}`}
              className={styles.cardLink}
              data-testid={`${dataTestIdPrefix}-link-${p.id}`}
            >
              <BrandNewModels
                id={p.id}
                title={p.title}
                imageSrc={p.imageSrc}
                imageAlt={p.title}
                price={p.price}
                specs={p.specs}
                data-testid={`${dataTestIdPrefix}-card-${p.id}`}
              />
            </Link>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className={styles.noResults} data-testid="no-results">
            Nenhum favorito encontrado
          </div>
        )}
      </div>
    </main>
  );
};

export default Favorites;
export { Favorites };
