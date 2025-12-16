// src/pages/Tablets/Tablets.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { tablets, sampleTablet } from '../../data/tablets';
import styles from './Tablets.module.css';
import Pagination from '../../components/Pagination/Pagination';
import { BrandNewModels } from '../../components/BrandNewModels';
import { Loader } from '../../components/Loader';
import { Select } from '../../components/Select';
import { Product } from '../../types/Product';
import { useNavigate } from 'react-router-dom';
import Search from '../../components/Search';
import { useSearchVisibility } from '../../context/SearchVisibilityContext';

const Tablets: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<'recent' | 'alphabetical' | 'cheap'>(
    'recent',
  );
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const { setVisible } = useSearchVisibility();

  useEffect(() => {
    // simula chamada ao servidor (2 segundos)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // ativa/desativa barra de busca global
  useEffect(() => {
    setVisible(true);

    return () => setVisible(false);
  }, [setVisible]);

  // aplica ordenação
  const orderedItems: Product[] = useMemo(() => {
    const arr = [...tablets];

    if (order === 'alphabetical') {
      arr.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === 'cheap') {
      arr.sort(
        (a, b) =>
          parseFloat(a.price.replace(/[^\d.-]/g, '')) -
          parseFloat(b.price.replace(/[^\d.-]/g, '')),
      );
    }

    return arr;
  }, [order]);

  // filtro por searchQuery (title, specs, description)
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

  // lógica de paginação
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const currentItems: Product[] = filteredItems.slice(start, end);

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
    return <Loader message="Carregando Tablets..." />;
  }

  return (
    <main className={styles.container}>
      <div className={styles.headerRow}>
        {/* Linha 1: título + search */}
        <div className={styles.headerTop}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>Tablets</h1>
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
            onClick={() => navigate('/tablets/all')}
            data-testid="tablet-view-all"
            aria-label="Ver todos os produtos"
            role="button"
          >
            Ver todos
          </a>
        </div>
      </div>

      <div className={styles.grid}>
        {sampleTablet && (
          <BrandNewModels
            key={sampleTablet.id}
            id={sampleTablet.id}
            detailsLink={`/product/${sampleTablet.id}`}
            title={sampleTablet.title}
            imageSrc={sampleTablet.imageSrc}
            imageAlt={sampleTablet.title}
            price={sampleTablet.price}
            specs={sampleTablet.specs}
            data-testid={`tablet-card-${sampleTablet.id}`}
          />
        )}

        {currentItems.map((t: Product) => (
          <BrandNewModels
            key={t.id}
            id={t.id}
            detailsLink={`/product/${t.id}`}
            title={t.title}
            imageSrc={t.imageSrc}
            imageAlt={t.title}
            price={t.price}
            specs={t.specs}
            data-testid={`tablets-card-${t.id}`}
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

export default Tablets;
