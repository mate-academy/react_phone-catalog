import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './Favorites.module.css';
import { BrandNewModels } from '../../components/BrandNewModels';
import { Loader } from '../../components/Loader';
import Pagination from '../../components/Pagination/Pagination';
import { Select } from '../../components/Select';
import { useFavorites } from './FavoritesContext';

export interface FavoritesProps {
  title?: string;
  perPage?: number;
  dataTestIdPrefix?: string;
}

const Favorites: React.FC<FavoritesProps> = ({
  title = 'Favoritos',
  perPage = 5,
  dataTestIdPrefix = 'favorites',
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(perPage);
  const [order, setOrder] = useState('recent');
  const [isLoading, setIsLoading] = useState(true);

  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);

    return () => clearTimeout(timer);
  }, []);

  const orderedItems = useMemo(() => {
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

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = orderedItems.slice(start, end);

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
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.actionsRow}>
          <Select value={order} onChange={setOrder} />
        </div>
      </div>

      <div className={styles.grid}>
        {currentItems.map(p => (
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
            <button
              className={styles.removeButton}
              onClick={() => toggleFavorite(p)}
              data-testid={`${dataTestIdPrefix}-remove-${p.id}`}
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      <Pagination
        total={favorites.length}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
        onPerPageChange={newPerPage => {
          setItemsPerPage(newPerPage);
          setCurrentPage(1);
        }}
      />
    </main>
  );
};

export default Favorites;
export { Favorites };
