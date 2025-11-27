import React, { useState, useEffect } from 'react';
import styles from './Accessories.module.css';
import { ViewAllProducts } from '../../pages/ViewAllProducts';
import { accessories } from '../../data/accessories';
import Pagination from '../../components/Pagination/Pagination';
import { BrandNewModels } from '../../components/BrandNewModels';
import { Loader } from '../../components/Loader';

const Accessories: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [favourites, setFavourites] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // simula chamada ao servidor (2 segundos)
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

  // lógica de paginação
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const currentItems = accessories.slice(start, end);

  return (
    <main className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Accessories</h1>
        <a
          className={styles.viewAllLink}
          onClick={() => setShowAll(true)}
          data-testid="accessories-view-all"
          aria-label="Ver todos os produtos"
        >
          Ver todos
        </a>
      </div>

      <div className={styles.grid}>
        {currentItems.map(t => (
          <BrandNewModels
            key={t.id}
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
        ))}
      </div>

      {/* Pagination deve ficar fora do map */}
      <Pagination
        total={accessories.length}
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
