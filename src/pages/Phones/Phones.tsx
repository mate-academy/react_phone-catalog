// src/pages/Phones/Phones.tsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styles from './Phones.module.css';
import { phones, samplePhone } from '../../data/phones';
import Pagination from '../../components/Pagination/Pagination';
import { BrandNewModels } from '../../components/BrandNewModels';
import { Loader } from '../../components/Loader';
import { Select } from '../../components/Select';
import { Product } from '../../types/Product';
import { useSearchVisibility } from '../../context/SearchVisibilityContext';
import Search from '../../components/Search';
import { useNavigate } from 'react-router-dom';

type ProductWithDetails = Product & {
  detailsLink?: string;
  detailsAvailable?: boolean;
};

function specsToString(specs: string | string[] | undefined): string {
  if (!specs) {
    return '';
  }

  return Array.isArray(specs) ? specs.join(' ') : specs;
}

const Phones: React.FC = () => {
  const [favourites, setFavourites] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<'recent' | 'alphabetical' | 'cheap'>(
    'recent',
  );
  const [searchQuery, setSearchQuery] = useState('');

  const { setVisible } = useSearchVisibility();
  const navigate = useNavigate();

  useEffect(() => {
    setVisible(true);

    return () => setVisible(false);
  }, [setVisible]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleFavourite = (id: string) => {
    setFavourites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // ordenação
  const orderedItems: Product[] = useMemo(() => {
    const arr = [...phones];

    if (order === 'alphabetical') {
      arr.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === 'cheap') {
      arr.sort((a, b) => {
        const aPrice = Number(String(a.price).replace(/[^\d.-]/g, '')) || 0;
        const bPrice = Number(String(b.price).replace(/[^\d.-]/g, '')) || 0;

        return aPrice - bPrice;
      });
    }

    return arr;
  }, [order]);

  // filtro
  const filteredItems: Product[] = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    if (!q) {
      return orderedItems;
    }

    return orderedItems.filter(item => {
      const titleMatch = item.title?.toLowerCase().includes(q);
      const specsMatch = specsToString(item.specs).toLowerCase().includes(q);
      const descMatch =
        typeof item.description === 'string' &&
        item.description.toLowerCase().includes(q);

      return Boolean(titleMatch || specsMatch || descMatch);
    });
  }, [orderedItems, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleSearch = useCallback((term: string) => {
    setSearchQuery(term);
  }, []);

  // handler tipado para Select
  const handleOrderChange = (value: string) => {
    if (value === 'recent' || value === 'alphabetical' || value === 'cheap') {
      setOrder(value);
    }
  };

  // paginação
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const currentItems: Product[] = filteredItems.slice(start, end);

  const NOT_FOUND_IDS = new Set<string>([]);
  const getDetailsLink = (prod: ProductWithDetails): string => {
    if (!prod) {
      return '/not-found';
    }

    if (typeof prod.detailsLink === 'string') {
      return prod.detailsLink;
    }

    if (prod.detailsAvailable === false) {
      return '/not-found';
    }

    if (NOT_FOUND_IDS.has(prod.id)) {
      return '/not-found';
    }

    return `/product/${prod.id}`;
  };

  const sampleExistsInPhones = Boolean(
    samplePhone && phones.some(p => p.id === samplePhone.id),
  );

  if (isLoading) {
    return <Loader message="Carregando Phones..." />;
  }

  return (
    <main className={styles.container}>
      <div className={styles.headerRow}>
        {/* Linha 1: título + search */}
        <div className={styles.headerTop}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>Phones</h1>
          </div>

          <div className={styles.headerSearch}>
            <Search onSearch={handleSearch} />
          </div>
        </div>

        {/* Linha 2: select + view all */}
        <div className={styles.headerBottom}>
          <div className={styles.selectWrapper}>
            <Select value={order} onChange={handleOrderChange} />
          </div>

          <a
            className={styles.viewAllLink}
            onClick={() => navigate('/phones/all')}
            data-testid="phones-view-all"
            aria-label="Ver todos os produtos"
            role="button"
          >
            Ver todos
          </a>
        </div>
      </div>

      <div className={styles.grid}>
        {samplePhone && sampleExistsInPhones && (
          <BrandNewModels
            id={samplePhone.id}
            key={samplePhone.id}
            detailsLink={getDetailsLink(samplePhone)}
            title={samplePhone.title}
            imageSrc={samplePhone.imageSrc ?? ''}
            imageAlt={samplePhone.title}
            price={samplePhone.price ?? ''}
            specs={samplePhone.specs}
            onFavouriteClick={() => toggleFavourite(samplePhone.id)}
            isFavourite={!!favourites[samplePhone.id]}
            data-testid={`phone-card-${samplePhone.id}`}
          />
        )}

        {currentItems.map(p => (
          <BrandNewModels
            key={p.id}
            id={p.id}
            detailsLink={getDetailsLink(p as ProductWithDetails)}
            title={p.title}
            imageSrc={p.imageSrc ?? ''}
            imageAlt={p.title}
            price={p.price ?? ''}
            specs={p.specs}
            onFavouriteClick={() => toggleFavourite(p.id)}
            isFavourite={!!favourites[p.id]}
            data-testid={`phones-card-${p.id}`}
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

export default Phones;
