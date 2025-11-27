import React, { useState, useEffect } from 'react';
import styles from './Phones.module.css';
import { ViewAllProducts } from '../../pages/ViewAllProducts';
import { phones } from '../../data/phones';
import Pagination from '../../components/Pagination/Pagination';
import { BrandNewModels } from '../../components/BrandNewModels';
import { Loader } from '../../components/Loader';

const Phones: React.FC = () => {
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
    return <Loader message="Carregando Phones..." />;
  }

  if (showAll) {
    return (
      <ViewAllProducts
        title="Phones"
        products={phones}
        onBackClick={() => setShowAll(false)}
        dataTestIdPrefix="phones"
      />
    );
  }

  // lógica de paginação
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const currentItems = phones.slice(start, end);

  return (
    <main className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Phones</h1>
        <a
          className={styles.viewAllLink}
          onClick={() => setShowAll(true)}
          data-testid="phones-view-all"
          aria-label="Ver todos os produtos"
        >
          Ver todos
        </a>
      </div>

      <div className={styles.grid}>
        {currentItems.map(p => (
          <BrandNewModels
            key={p.id}
            title={p.title}
            imageSrc={p.imageSrc}
            imageAlt={p.title}
            price={p.price}
            specs={p.specs}
            onButtonClick={() => p}
            onFavouriteClick={() => toggleFavourite(p.id)}
            isFavourite={!!favourites[p.id]}
            data-testid={`phones-card-${p.id}`}
          />
        ))}
      </div>

      <Pagination
        total={phones.length}
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
