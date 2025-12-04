import React, { useState } from 'react';
import styles from './ProductsList.module.css';
import { Product } from '../../types/Product';
import Pagination from '../Pagination/Pagination';
import { BrandNewModels } from '../BrandNewModels';

interface ProductsListProps {
  title: string;
  products: Product[];
  dataTestIdPrefix: string;
}

const ProductsList: React.FC<ProductsListProps> = ({
  title,
  products,
  dataTestIdPrefix,
}) => {
  const [favourites, setFavourites] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const toggleFavourite = (id: string) => {
    setFavourites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // lógica de paginação
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const currentItems = products.slice(start, end);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{title}</h1>

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
            data-testid={`${dataTestIdPrefix}-card-${p.id}`}
          />
        ))}
      </div>

      <Pagination
        total={products.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
        onPerPageChange={newPerPage => {
          setPerPage(newPerPage);
          setCurrentPage(1); // volta para a primeira página
        }}
      />
    </main>
  );
};

export default ProductsList;
