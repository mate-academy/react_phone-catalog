//------------------------------
// IMPORTS
//------------------------------
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './Favorites.module.css';
import { BrandNewModels } from '../../components/BrandNewModels';
import { Loader } from '../../components/Loader';
import Pagination from '../../components/Pagination/Pagination';
import { Select } from '../../components/Select';
import { useFavorites } from './FavoritesContext';

//------------------------------
// 2. INTERFACE
//------------------------------
export interface FavoritesProps {
  // título da página (ex.: "Favoritos")
  title?: string;

  // quantidade de itens por página (para paginação)
  perPage?: number;

  // data-testid prefixo para testes
  dataTestIdPrefix?: string;
}

//------------------------------
// 3. ESTADOS
//------------------------------
const Favorites: React.FC<FavoritesProps> = ({
  title = 'Favoritos',
  perPage = 5,
  dataTestIdPrefix = 'favorites',
}) => {
  // paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(perPage);

  // ordenação (opções: 'recent', 'alphabetical', 'cheap')
  const [order, setOrder] = useState('recent');

  // carregamento inicial
  const [isLoading, setIsLoading] = useState(true);

  // favoritos vêm do contexto
  const { favorites } = useFavorites();

  // simula carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 segundo só para feedback

    return () => clearTimeout(timer);
  }, []);

  // aplica ordenação
  const orderedItems = useMemo(() => {
    const items = [...favorites];

    if (order === 'alphabetical') {
      items.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === 'cheap') {
      items.sort(
        (a, b) =>
          parseFloat((a.price ?? '0').replace(/[^\d.-]/g, '')) -
          parseFloat((b.price ?? '0').replace(/[^\d.-]/g, '')),
      );
    }

    return items;
  }, [favorites, order]);

  // lógica de paginação
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = orderedItems.slice(start, end);

  // loader
  if (isLoading) {
    return <Loader message="Carregando favoritos..." />;
  }

  // caso não haja favoritos
  if (favorites.length === 0) {
    return (
      <main
        className={styles.container}
        data-testid={`${dataTestIdPrefix}-empty`}
      >
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.emptyText}>
          Você ainda não adicionou nenhum favorito.
        </p>
        <Link to="/" className={styles.backLink}>
          Voltar para a loja
        </Link>
      </main>
    );
  }

  //------------------------------
  // 4. RENDERIZAÇÃO
  //------------------------------
  return (
    <main className={styles.container} data-testid={`${dataTestIdPrefix}-page`}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>{title}</h1>

        {/* Select para ordenação */}
        <div className={styles.actionsRow}>
          <Select value={order} onChange={setOrder} />
        </div>
      </div>

      <div className={styles.grid}>
        {currentItems.map(p => (
          <Link
            to={`/product/${p.id}`}
            key={p.id}
            className={styles.cardLink}
            data-testid={`${dataTestIdPrefix}-link-${p.id}`}
          >
            <BrandNewModels
              id={p.id}
              title={p.title}
              imageSrc={p.imageSrc}
              imageAlt={p.title}
              price={p.price}
              specs={p.specs}
              data-testid={`${dataTestIdPrefix}-card-${p.id}`}
            />
          </Link>
        ))}
      </div>

      {/* paginação */}
      <Pagination
        total={favorites.length}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
        onPerPageChange={newPerPage => {
          setItemsPerPage(newPerPage);
          setCurrentPage(1);
        }}
      />
    </main>
  );
};

//---------------------------------------
// 5. EXPORTS
//---------------------------------------
export default Favorites;
export { Favorites };
