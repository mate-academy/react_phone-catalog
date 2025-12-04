// src/pages/Accessories/Accessories.tsx
import React, { useState, useEffect } from 'react';
import styles from './Accessories.module.css';
import { ViewAllProducts } from '../../pages/ViewAllProducts';
import { accessories, sampleAccessory } from '../../data/accessories';
import Pagination from '../../components/Pagination/Pagination';
import { BrandNewModels } from '../../components/BrandNewModels';
import { Loader } from '../../components/Loader';
import { Select } from '../../components/Select';
import { Product } from '../../types/Product';
import { useFavorites } from '../../pages/Favorites/FavoritesContext';

const Accessories: React.FC = () => {
  const [order, setOrder] = useState<'recent' | 'alphabetical' | 'cheap'>(
    'recent',
  );
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  const { isFavorite } = useFavorites();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // --- Normalização: garante imageSrc como string, specs como objeto não-undefined e preserva age
  const normalizedProducts: (Product & {
    imageSrc: string;
    specs: { screen?: string; capacity?: string; ram?: string };
    age?: number;
  })[] = (accessories as Product[]).map(p => {
    // lê age de forma segura mesmo que Product não declare esse campo
    const age = (p as unknown as { age?: number }).age;

    return {
      ...p,
      imageSrc: p.imageSrc ?? '',
      specs: {
        screen: p.specs?.screen,
        capacity: p.specs?.capacity,
        ram: p.specs?.ram,
      },
      // só inclui age se estiver definido
      ...(age !== undefined ? { age } : {}),
    };
  });

  if (isLoading) {
    return <Loader message="Carregando Accessories..." />;
  }

  if (showAll) {
    return (
      <ViewAllProducts
        title="Accessories"
        products={normalizedProducts}
        onBackClick={() => setShowAll(false)}
        dataTestIdPrefix="accessories"
      />
    );
  }

  // aplica ordenação sobre a lista normalizada
  const orderedItems = [...normalizedProducts];

  if (order === 'alphabetical') {
    orderedItems.sort((a, b) => a.title.localeCompare(b.title));
  } else if (order === 'cheap') {
    orderedItems.sort(
      (a, b) =>
        parseFloat(a.price.replace(/[^\d.-]/g, '')) -
        parseFloat(b.price.replace(/[^\d.-]/g, '')),
    );
  } else if (order === 'recent') {
    orderedItems.sort((a, b) => (b.age ?? 0) - (a.age ?? 0));
  }

  // paginação
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const currentItems = orderedItems.slice(start, end);

  // handler para Select sem usar "any"
  const handleOrderChange = (value: string) => {
    // garante que apenas os valores esperados sejam aceitos
    if (value === 'recent' || value === 'alphabetical' || value === 'cheap') {
      setOrder(value);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Accessories</h1>
        <div className={styles.actionsRow}>
          <Select value={order} onChange={handleOrderChange} />
          <button
            className={styles.viewAllLink}
            onClick={() => setShowAll(true)}
            data-testid="accessories-view-all"
            aria-label="Ver todos os produtos"
            type="button"
          >
            Ver todos
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {/* sampleAccessory para testes rápidos (opcional) */}
        {sampleAccessory && (
          <div
            key={sampleAccessory.id}
            className={styles.cardLink}
            data-testid={`accessory-sample-link-${sampleAccessory.id}`}
          >
            <BrandNewModels
              id={sampleAccessory.id}
              detailsLink={`/product/${sampleAccessory.id}`}
              title={sampleAccessory.title}
              imageSrc={sampleAccessory.imageSrc ?? ''}
              imageAlt={sampleAccessory.title}
              price={sampleAccessory.price}
              specs={{
                screen: sampleAccessory.specs?.screen,
                capacity: sampleAccessory.specs?.capacity,
                ram: sampleAccessory.specs?.ram,
              }}
              // handlers kept minimal: BrandNewModels is responsible for actions/toasts
              onButtonClick={() => undefined}
              onFavouriteClick={() => undefined}
              isFavourite={isFavorite(sampleAccessory.id)}
              data-testid={`accessories-card-${sampleAccessory.id}`}
            />
          </div>
        )}

        {currentItems.map(t => (
          <div
            key={t.id}
            className={styles.cardLink}
            data-testid={`accessories-link-${t.id}`}
          >
            <BrandNewModels
              id={t.id}
              detailsLink={`/product/${t.id}`}
              title={t.title}
              imageSrc={t.imageSrc}
              imageAlt={t.title}
              price={t.price}
              specs={{
                screen: t.specs?.screen,
                capacity: t.specs?.capacity,
                ram: t.specs?.ram,
              }}
              onButtonClick={() => undefined}
              onFavouriteClick={() => undefined}
              isFavourite={isFavorite(t.id)}
              data-testid={`accessories-card-${t.id}`}
            />
          </div>
        ))}
      </div>

      <Pagination
        total={orderedItems.length}
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
