import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../../api';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Container } from '../../components/Container';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { useFavorites } from '../../context';
import { useRequest } from '../../hooks';
import { filterByQuery } from '../../utils';
import { StatusMessage } from '../shared';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const [searchParams] = useSearchParams();
  const { favoriteIds } = useFavorites();
  const {
    data: products,
    isLoading,
    hasError,
    reload,
  } = useRequest(fetchProducts);

  const query = searchParams.get('query') ?? '';

  const favoriteProducts = useMemo(
    () => (products ?? []).filter(product => favoriteIds.includes(product.id)),
    [products, favoriteIds],
  );
  const visibleProducts = useMemo(
    () => filterByQuery(favoriteProducts, query),
    [favoriteProducts, query],
  );

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (hasError) {
      return <ErrorMessage onReload={reload} />;
    }

    if (!favoriteProducts.length) {
      return <StatusMessage text="There are no favorite products yet" />;
    }

    if (!visibleProducts.length) {
      return <StatusMessage text="There are no products matching the query" />;
    }

    return <ProductsList products={visibleProducts} />;
  };

  return (
    <Container>
      <Breadcrumbs items={[{ label: 'Favorites' }]} />

      <h1 className={styles['favorites-page__title']}>Favorites</h1>
      <p className={styles['favorites-page__count']}>
        {favoriteIds.length} items
      </p>

      {renderContent()}
    </Container>
  );
};
