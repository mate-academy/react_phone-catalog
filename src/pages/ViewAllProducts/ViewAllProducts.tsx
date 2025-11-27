import React, { useState, useEffect } from 'react';
import styles from './ViewAllProducts.module.css';
import Button from '../../components/Button/Button';
import { BrandNewModels } from '../../components/BrandNewModels';
import { Loader } from '../../components/Loader';

interface ViewAllProductsProps {
  title: string;
  products: {
    id: string;
    sku?: string;
    title: string;
    price: string;
    imageSrc: string;
    specs: {
      screen?: string;
      capacity?: string;
      ram?: string;
    };
  }[];
  onBackClick: () => void;
  dataTestIdPrefix: string;
}

const ViewAllProducts: React.FC<ViewAllProductsProps> = ({
  title,
  products,
  onBackClick,
  dataTestIdPrefix,
}) => {
  const [favourites, setFavourites] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true); // 👈 loader state

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
    return <Loader message={`Carregando lista de ${title}...`} />;
  }

  return (
    <main className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>{title}</h1>
        <a
          className={styles.backLink}
          onClick={onBackClick}
          data-testid={`${dataTestIdPrefix}-back-link`}
          aria-label="Voltar à página anterior"
        >
          Voltar à página anterior
        </a>
      </div>

      <div className={styles.grid}>
        {products.map(p => (
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

      <div className={styles.buttonRow}>
        <Button
          onClick={onBackClick}
          variant="primary"
          size="md"
          className={styles.backButton}
          data-testid={`${dataTestIdPrefix}-back-button`}
          ariaLabel="Voltar à página anterior"
        >
          Voltar
        </Button>
      </div>
    </main>
  );
};

export default ViewAllProducts;
