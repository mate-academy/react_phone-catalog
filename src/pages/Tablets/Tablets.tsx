// src/pages/Tablets/Tablets.tsx
import React, { useState, useEffect } from 'react';
import { tablets, sampleTablet } from '../../data/tablets';
import styles from './Tablets.module.css';
import { ViewAllProducts } from '../../pages/ViewAllProducts';
import Pagination from '../../components/Pagination/Pagination';
import { BrandNewModels } from '../../components/BrandNewModels';
import { Loader } from '../../components/Loader';
import { Select } from '../../components/Select';
import { Product } from '../../types/Product';

const Tablets: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
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

  if (isLoading) {
    return <Loader message="Carregando Tablets..." />;
  }

  if (showAll) {
    return (
      <ViewAllProducts
        title="Tablets"
        products={tablets as Product[]}
        onBackClick={() => setShowAll(false)}
        dataTestIdPrefix="tablets"
      />
    );
  }

  // aplica ordenação
  const orderedItems: Product[] = [...tablets];

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
  const currentItems: Product[] = orderedItems.slice(start, end);

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
            key={t.id} // ✅ corrige lint
            id={t.id} // ✅ necessário para addItem
            detailsLink={`/product/${t.id}`} // ✅ título/imagem navegam para detalhes
            title={t.title}
            imageSrc={t.imageSrc}
            imageAlt={t.title}
            price={t.price}
            specs={t.specs}
            data-testid={`tablets-card-${t.id}`}
          />
        ))}
      </div>

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
