import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tablets, sampleTablet } from '../../data/tablets';
import styles from './Tablets.module.css';
import { ViewAllProducts } from '../../pages/ViewAllProducts';
import Pagination from '../../components/Pagination/Pagination';
import { BrandNewModels } from '../../components/BrandNewModels';
import { Loader } from '../../components/Loader';
import { Select } from '../../components/Select';

const Tablets: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [favourites, setFavourites] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState('recent');

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
    return <Loader message="Carregando Tablets..." />;
  }

  if (showAll) {
    return (
      <ViewAllProducts
        title="Tablets"
        products={tablets}
        onBackClick={() => setShowAll(false)}
        dataTestIdPrefix="tablets"
      />
    );
  }

  // aplica ordenação
  const orderedItems = [...tablets];

  if (order === 'alphabetical') {
    orderedItems.sort((a, b) => a.title.localeCompare(b.title));
  } else if (order === 'cheap') {
    orderedItems.sort(
      (a, b) =>
        parseFloat(a.price.replace(/[^\d.-]/g, '')) -
        parseFloat(b.price.replace(/[^\d.-]/g, '')),
    );
  }

  // lógica de paginação
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const currentItems = tablets.slice(start, end);

  return (
    <main className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Tablets</h1>
        {/* Select + link "Ver todos" na mesma linha */}
        <div className={styles.actionsRow}>
          <Select value={order} onChange={setOrder} />
          <a
            className={styles.viewAllLink}
            onClick={() => setShowAll(true)}
            data-testid="tablet-view-all"
            aria-label="Ver todos os produtos"
          >
            Ver todos
          </a>
        </div>
      </div>

      <div className={styles.grid}>
        {sampleTablet && (
          <Link
            to={`/product/${sampleTablet.id}`}
            key={sampleTablet.id}
            className={styles.cardLink}
            data-testid={`tablet-sample-link-${sampleTablet.id}`}
          >
            <BrandNewModels
              title={sampleTablet.title}
              imageSrc={sampleTablet.imageSrc}
              imageAlt={sampleTablet.title}
              price={sampleTablet.price}
              specs={sampleTablet.specs}
              onButtonClick={() => sampleTablet}
              onFavouriteClick={() => toggleFavourite(sampleTablet.id)}
              isFavourite={!!favourites[sampleTablet.id]}
              data-testid={`tablet-card-${sampleTablet.id}`}
            />
          </Link>
        )}

        {currentItems.map(t => (
          <Link
            to={`/product/${t.id}`}
            key={t.id}
            className={styles.cardLink}
            data-testid={`tablet-link-${t.id}`}
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
              data-testid={`tablets-card-${t.id}`}
            />
          </Link>
        ))}
      </div>

      {/* Pagination deve ficar fora do map */}
      <Pagination
        total={tablets.length}
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
