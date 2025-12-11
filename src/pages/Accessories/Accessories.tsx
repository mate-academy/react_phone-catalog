// src/pages/Accessories/Accessories.tsx
import React, { useState, useEffect, useMemo } from 'react';
import styles from './Accessories.module.css';
import { accessories, sampleAccessory } from '../../data/accessories';
import Pagination from '../../components/Pagination/Pagination';
import { BrandNewModels } from '../../components/BrandNewModels';
import { Loader } from '../../components/Loader';
import { Select } from '../../components/Select';
import { Product } from '../../types/Product';
import { useFavorites } from '../../pages/Favorites/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import Search from '../../components/Search';
import { useSearchVisibility } from '../../context/SearchVisibilityContext';

const Accessories: React.FC = () => {
  const [order, setOrder] = useState<'recent' | 'alphabetical' | 'cheap'>(
    'recent',
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const { isFavorite } = useFavorites();
  const navigate = useNavigate();
  const { setVisible } = useSearchVisibility();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => clearTimeout(timer);
  }, []);

  // ativa/desativa barra de busca global
  useEffect(() => {
    setVisible(true);

    return () => setVisible(false);
  }, [setVisible]);

  // normalização
  const normalizedProducts = useMemo(() => {
    return (accessories as Product[]).map(p => {
      const age = (p as unknown as { age?: number }).age;

      return {
        ...p,
        imageSrc: p.imageSrc ?? '',
        specs: {
          screen: p.specs?.screen,
          capacity: p.specs?.capacity,
          ram: p.specs?.ram,
        },
        ...(age !== undefined ? { age } : {}),
      };
    });
  }, []);

  // ordenação
  const orderedItems = useMemo(() => {
    const arr = [...normalizedProducts];

    if (order === 'alphabetical') {
      arr.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === 'cheap') {
      arr.sort(
        (a, b) =>
          parseFloat(a.price.replace(/[^\d.-]/g, '')) -
          parseFloat(b.price.replace(/[^\d.-]/g, '')),
      );
    } else if (order === 'recent') {
      arr.sort((a, b) => (b.age ?? 0) - (a.age ?? 0));
    }

    return arr;
  }, [normalizedProducts, order]);

  // filtro por searchQuery
  const filteredItems = useMemo(() => {
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

  // paginação
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const currentItems = filteredItems.slice(start, end);

  const handleOrderChange = (value: string) => {
    if (value === 'recent' || value === 'alphabetical' || value === 'cheap') {
      setOrder(value);
    }
  };

  const handleSearch = (term: string) => {
    setSearchQuery(term);
    setCurrentPage(1); // resetar página ao buscar
  };

  if (isLoading) {
    return <Loader message="Carregando Accessories..." />;
  }

  return (
    <main className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Accessories</h1>
        </div>
        <div className={styles.headerRight}>
          <Search onSearch={handleSearch} />
          <div className={styles.selectWrapper}>
            <Select value={order} onChange={handleOrderChange} />
          </div>
          <a
            className={styles.viewAllLink}
            onClick={() => navigate('/accessories/all')}
            data-testid="accessories-view-all"
            aria-label="Ver todos os produtos"
            role="button"
          >
            Ver todos
          </a>
        </div>
      </div>

      <div className={styles.grid}>
        {sampleAccessory && (
          <BrandNewModels
            id={sampleAccessory.id}
            detailsLink={`/product/${sampleAccessory.id}`}
            title={sampleAccessory.title}
            imageSrc={sampleAccessory.imageSrc ?? ''}
            imageAlt={sampleAccessory.title}
            price={sampleAccessory.price}
            specs={sampleAccessory.specs}
            onButtonClick={() => undefined}
            onFavouriteClick={() => undefined}
            isFavourite={isFavorite(sampleAccessory.id)}
            data-testid={`accessories-card-${sampleAccessory.id}`}
          />
        )}

        {currentItems.map(t => (
          <BrandNewModels
            key={t.id}
            id={t.id}
            detailsLink={`/product/${t.id}`}
            title={t.title}
            imageSrc={t.imageSrc}
            imageAlt={t.title}
            price={t.price}
            specs={t.specs}
            onButtonClick={() => undefined}
            onFavouriteClick={() => undefined}
            isFavourite={isFavorite(t.id)}
            data-testid={`accessories-card-${t.id}`}
          />
        ))}

        {filteredItems.length === 0 && (
          <div className={styles.noResults} data-testid="no-results">
            Nenhum produto encontrado
          </div>
        )}
      </div>

      <Pagination
        total={filteredItems.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
        onPerPageChange={newPerPage => {
          setPerPage(newPerPage);
          setCurrentPage(1);
        }}
      />
    </main>
  );
};

export default Accessories;
