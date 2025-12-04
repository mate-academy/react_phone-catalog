// src/pages/Phones/Phones.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Phones.module.css';
import { ViewAllProducts } from '../../pages/ViewAllProducts';
import { phones, samplePhone } from '../../data/phones';
import Pagination from '../../components/Pagination/Pagination';
import { BrandNewModels } from '../../components/BrandNewModels';
import { Loader } from '../../components/Loader';
import { Select } from '../../components/Select';
import { Product } from '../../types/Product'; // ✅ tipo centralizado

const Phones: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [favourites, setFavourites] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState('recent'); // estado para ordenação

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
        products={phones as Product[]} // ✅ tipagem correta
        onBackClick={() => setShowAll(false)}
        dataTestIdPrefix="phones"
      />
    );
  }

  // aplica ordenação
  const orderedItems: Product[] = [...phones];

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
        <h1 className={styles.title}>Phones</h1>

        {/* Select + link "Ver todos" na mesma linha */}
        <div className={styles.actionsRow}>
          <Select value={order} onChange={setOrder} />
          <a
            className={styles.viewAllLink}
            onClick={() => setShowAll(true)}
            data-testid="phones-view-all"
            aria-label="Ver todos os produtos"
          >
            Ver todos
          </a>
        </div>
      </div>

      <div className={styles.grid}>
        {/* samplePhone para testes rápidos (opcional) */}
        {samplePhone && (
          <Link
            to={`/product/${samplePhone.id}`}
            key={samplePhone.id}
            className={styles.cardLink}
            data-testid={`phone-sample-link-${samplePhone.id}`}
          >
            <BrandNewModels
              id={samplePhone.id} // ✅ importante passar o id
              title={samplePhone.title}
              imageSrc={samplePhone.imageSrc}
              imageAlt={samplePhone.title}
              price={samplePhone.price}
              specs={samplePhone.specs}
              onFavouriteClick={() => toggleFavourite(samplePhone.id)}
              isFavourite={!!favourites[samplePhone.id]}
              data-testid={`phone-card-${samplePhone.id}`}
            />
          </Link>
        )}

        {currentItems.map((p: Product) => (
          <BrandNewModels
            key={p.id}
            id={p.id} // ✅ necessário para addItem
            detailsLink={`/product/${p.id}`} // ✅ título/imagem navegam para detalhes
            title={p.title}
            imageSrc={p.imageSrc}
            imageAlt={p.title}
            price={p.price}
            specs={p.specs}
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
