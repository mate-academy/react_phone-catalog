// src/pages/Accessories/Accessories.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Accessories.module.css';
import { ViewAllProducts } from '../../pages/ViewAllProducts';
import { accessories, sampleAccessory } from '../../data/accessories';
import Pagination from '../../components/Pagination/Pagination';
import { BrandNewModels } from '../../components/BrandNewModels';
import { Loader } from '../../components/Loader';
import { Select } from '../../components/Select';

const Accessories: React.FC = () => {
  const [order, setOrder] = useState('recent');
  const [showAll, setShowAll] = useState(false);
  const [favourites, setFavourites] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleFavourite = (id: string) => {
    setFavourites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (isLoading) {
    return <Loader message="Carregando Accessories..." />;
  }

  if (showAll) {
    return (
      <ViewAllProducts
        title="Accessories"
        products={accessories}
        onBackClick={() => setShowAll(false)}
        dataTestIdPrefix="accessories"
      />
    );
  }

  // aplica ordenação
  const orderedItems = [...accessories];

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

  // lógica de paginação usando orderedItems
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const currentItems = orderedItems.slice(start, end);

  return (
    <main className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Accessories</h1>
        <div className={styles.actionsRow}>
          <Select value={order} onChange={setOrder} />
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
          <Link
            to={`/product/${sampleAccessory.id}`}
            key={sampleAccessory.id}
            className={styles.cardLink}
            data-testid={`accessory-sample-link-${sampleAccessory.id}`}
          >
            <BrandNewModels
              title={sampleAccessory.title}
              imageSrc={sampleAccessory.imageSrc}
              imageAlt={sampleAccessory.title}
              price={sampleAccessory.price}
              specs={sampleAccessory.specs}
              onButtonClick={() => sampleAccessory}
              onFavouriteClick={() => toggleFavourite(sampleAccessory.id)}
              isFavourite={!!favourites[sampleAccessory.id]}
              data-testid={`accessories-card-${sampleAccessory.id}`}
            />
          </Link>
        )}

        {currentItems.map(t => (
          <Link
            to={`/product/${t.id}`}
            key={t.id}
            className={styles.cardLink}
            data-testid={`accessories-link-${t.id}`}
          >
            <BrandNewModels
              title={t.title}
              imageSrc={t.imageSrc}
              imageAlt={t.title}
              price={t.price}
              specs={t.specs}
              onButtonClick={() => t}
              onFavouriteClick={() => toggleFavourite(t.id)}
              isFavourite={!!favourites[t.id]}
              data-testid={`accessories-card-${t.id}`}
            />
          </Link>
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
