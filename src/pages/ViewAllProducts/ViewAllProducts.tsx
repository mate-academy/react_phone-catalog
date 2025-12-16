// src/pages/ViewAllProducts/index.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './ViewAllProducts.module.css';
import Button from '../../components/Button/Button';
import { BrandNewModels } from '../../components/BrandNewModels';
import { Loader } from '../../components/Loader';
import Search from '../../components/Search';
import { Select } from '../../components/Select';
import { useSearchVisibility } from '../../context/SearchVisibilityContext';

interface ProductSpec {
  screen?: string;
  capacity?: string;
  ram?: string;
}

export interface ViewAllProductItem {
  id: string;
  sku?: string;
  title: string;
  price: string;
  imageSrc: string;
  specs?: ProductSpec;
  description?: string;
  detailsLink?: string;
}

interface ViewAllProductsProps {
  title: string;
  products: ViewAllProductItem[];
  onBackClick: () => void;
  dataTestIdPrefix: string;
}

function specsToString(specs: ProductSpec | undefined): string {
  if (!specs) {
    return '';
  }

  const parts: string[] = [];

  if (specs.screen) {
    parts.push(specs.screen);
  }

  if (specs.capacity) {
    parts.push(specs.capacity);
  }

  if (specs.ram) {
    parts.push(specs.ram);
  }

  return parts.join(' ');
}

const ViewAllProducts: React.FC<ViewAllProductsProps> = ({
  title,
  products,
  onBackClick,
  dataTestIdPrefix,
}) => {
  const [favourites, setFavourites] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [order, setOrder] = useState<'recent' | 'alphabetical' | 'cheap'>(
    'recent',
  );

  const { setVisible } = useSearchVisibility();

  useEffect(() => {
    setVisible(true);

    return () => setVisible(false);
  }, [setVisible]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => clearTimeout(timer);
  }, []);

  const ordered = useMemo(() => {
    const arr = [...products];

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
  }, [products, order]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    if (!q) {
      return ordered;
    }

    return ordered.filter(p => {
      const inTitle = p.title.toLowerCase().includes(q);
      const inDesc =
        typeof p.description === 'string' &&
        p.description.toLowerCase().includes(q);
      const inSpecs = specsToString(p.specs).toLowerCase().includes(q);

      return Boolean(inTitle || inDesc || inSpecs);
    });
  }, [ordered, searchQuery]);

  const toggleFavourite = useCallback((id: string) => {
    setFavourites(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchQuery(term);
  }, []);

  const handleSelectChange = useCallback((value: string) => {
    const v = value as 'recent' | 'alphabetical' | 'cheap';

    if (v === 'recent' || v === 'alphabetical' || v === 'cheap') {
      setOrder(v);
    }
  }, []);

  if (isLoading) {
    return <Loader message={`Carregando lista de ${title}...`} />;
  }

  return (
    <main className={styles.container}>
      <div className={styles.headerRow}>
        {/* Linha 1: título + search */}
        <div className={styles.headerTop}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>{title}</h1>
          </div>

          <div className={styles.headerSearch}>
            <Search onSearch={handleSearch} />
          </div>
        </div>

        {/* Linha 2: select + back link */}
        <div className={styles.headerBottom}>
          <div className={styles.selectWrapper}>
            <Select
              value={order}
              onChange={handleSelectChange}
              aria-label="Ordenar produtos"
            />
          </div>

          <a
            className={styles.backLink}
            onClick={onBackClick}
            data-testid={`${dataTestIdPrefix}-back-link`}
            aria-label="Voltar à página anterior"
            role="button"
          >
            Voltar
          </a>
        </div>
      </div>

      <div className={styles.grid}>
        {filtered.length === 0 ? (
          <div
            className={styles.noResults}
            data-testid={`${dataTestIdPrefix}-no-results`}
          >
            Nenhum produto encontrado
          </div>
        ) : (
          filtered.map(p => (
            <BrandNewModels
              key={p.id}
              id={p.id}
              detailsLink={p.detailsLink ?? `/product/${p.id}`}
              title={p.title}
              imageSrc={p.imageSrc}
              imageAlt={p.title}
              price={p.price}
              specs={p.specs}
              onButtonClick={() => {}}
              onFavouriteClick={() => toggleFavourite(p.id)}
              isFavourite={!!favourites[p.id]}
              data-testid={`${dataTestIdPrefix}-card-${p.id}`}
            />
          ))
        )}
      </div>

      <div className={styles.buttonRow}>
        <Button
          onClick={onBackClick}
          variant="primary"
          size="md"
          className={styles.backButton}
          data-testid={`${dataTestIdPrefix}-back-button`}
          ariaLabel="Voltar à página anterior"
        >
          Voltar
        </Button>
      </div>
    </main>
  );
};

export default ViewAllProducts;
