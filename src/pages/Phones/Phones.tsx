import React, { useState, useEffect } from 'react';
import styles from './Phones.module.css';
import { ViewAllProducts } from '../../pages/ViewAllProducts';
import { phones, samplePhone } from '../../data/phones';
import Pagination from '../../components/Pagination/Pagination';
import { BrandNewModels } from '../../components/BrandNewModels';
import { Loader } from '../../components/Loader';
import { Select } from '../../components/Select';
import { Product } from '../../types/Product';

type ProductWithDetails = Product & {
  detailsLink?: string;
  detailsAvailable?: boolean;
};

const Phones: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [favourites, setFavourites] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState('recent');

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
    return <Loader message="Carregando Phones..." />;
  }

  if (showAll) {
    return (
      <ViewAllProducts
        title="Phones"
        products={phones as Product[]}
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

  /**
   * Lista explícita de produtos que devem apontar para NotFound.
   * Ajuste os ids conforme necessário. Alternativa: adicionar
   * `detailsAvailable: false` ou `detailsLink` no arquivo de dados.
   */
  const NOT_FOUND_IDS = new Set<string>([
    // Exemplo: 'phone-3', 'phone-12'
    // Adicione aqui os ids que obrigatoriamente devem ir para NotFound
  ]);

  // helper para decidir a rota de detalhes (DetailsPage ou NotFound)
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

  // evita renderizar samplePhone com link para product se ele não existir no array phones
  const sampleExistsInPhones = !!(
    samplePhone && phones.some(p => p.id === samplePhone.id)
  );

  return (
    <main className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Phones</h1>

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
        {/* Renderiza samplePhone somente se ele existir no array `phones`.
            Caso contrário, evita criar um link para /product/phone-999 que não existe. */}
        {samplePhone && sampleExistsInPhones && (
          <BrandNewModels
            id={samplePhone.id}
            key={samplePhone.id}
            detailsLink={getDetailsLink(samplePhone)}
            title={samplePhone.title}
            imageSrc={samplePhone.imageSrc}
            imageAlt={samplePhone.title}
            price={samplePhone.price}
            specs={samplePhone.specs}
            onFavouriteClick={() => toggleFavourite(samplePhone.id)}
            isFavourite={!!favourites[samplePhone.id]}
            data-testid={`phone-card-${samplePhone.id}`}
          />
        )}

        {currentItems.map((p: Product) => (
          <BrandNewModels
            key={p.id}
            id={p.id}
            detailsLink={getDetailsLink(p)}
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
