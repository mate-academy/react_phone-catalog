import { useEffect, useState } from 'react';

import { getProducts } from '../../shared/api';
import { useShop } from '../../shared/context/ShopContext';

import type { Product } from '../../shared/types';

import Breadcrumbs from '../../components/Breadcrumbs';
import EmptyState from '../../components/EmptyState';
import Loader from '../../components/Loader';
import ProductsList from '../../components/ProductsList';

import styles from './FavoritesPage.module.scss';

type Props = {
  query: string;
  navigate: (to: string) => void;
};

export default function FavoritesPage({ query, navigate }: Props) {
  const { favorites } = useShop();

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  const items = products
    .filter(product => favorites.includes(product.id))
    .filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );

  return (
    <section className={styles.page}>
      <Breadcrumbs
        items={[
          {
            label: 'Home',
            onClick: () => navigate('/'),
          },
          {
            label: 'Favorites',
          },
        ]}
      />

      <div className={styles.heading}>
        <h1>Favorites</h1>
        <p>{items.length} products</p>
      </div>

      {!items.length ? (
        <EmptyState
          text={
            query
              ? 'There are no products matching the query'
              : 'Your favorites are empty'
          }
          action="Find products"
          onAction={() => navigate('/')}
        />
      ) : (
        <ProductsList products={items} navigate={navigate} />
      )}
    </section>
  );
}
