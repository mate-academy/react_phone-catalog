//react
import { useContext, useState, useEffect } from 'react';

//styles
import styles from './Favourites.module.scss';

//components
import { Loader } from '../../components/Loader';
import { ProductCard } from '../../components/ProductCard';

//types
import { ProductDetailed } from '../../types/product';

//services
import { FavouritesContext } from '../../services/FavouritesContext';
import { getProductsByType } from '../../services/api';

export const Favourites = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductDetailed[]>([]);
  const { favourites } = useContext(FavouritesContext)!;

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const [phones, tablets, accessories] = await Promise.all([
          getProductsByType('phones'),
          getProductsByType('tablets'),
          getProductsByType('accessories'),
        ]);

        setProducts([...phones, ...tablets, ...accessories]);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  const favouriteProducts = favourites
    .map(id => products.find(p => p.id === id))
    .filter(Boolean)
    .filter(product => product !== undefined);

  const productsCount = favouriteProducts.length;

  if (isLoading) {
    return <Loader className={styles.loader} />;
  }

  return (
    <div className={styles.favourites}>
      <h1 className={styles.title}>Favourites</h1>

      <p className={styles.subtitle}>
        {productsCount} item{productsCount !== 1 && 's'}
      </p>

      <div className={styles.list}>
        {favouriteProducts.map(product => {
          return (
            <ProductCard
              product={product}
              key={product.id}
              className={styles.productCard}
            />
          );
        })}
      </div>
    </div>
  );
};
