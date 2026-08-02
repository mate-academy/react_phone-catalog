import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumb } from '../shared/components/Breadcrumb';
import { ProductCard } from '../shared/components/ProductCard';
import { useProducts, useShopState } from '../shared/hooks';
import styles from './Favorites.module.scss';

export const Favorites = () => {
    const [searchParams] = useSearchParams();
    const { products, isLoading } = useProducts();
    const { favoriteIds, isInCart, toggleFavorite, addToCart } = useShopState();
    const queryParam = searchParams.get('query')?.trim().toLowerCase() ?? '';

    const favoriteProducts = useMemo(
        () =>
            favoriteIds
                .map(favoriteId =>
                    products.find(product => product.itemId === favoriteId),
                )
                .filter(product => product !== undefined),
        [favoriteIds, products],
    );
    const visibleProducts = useMemo(
        () =>
            favoriteProducts.filter(product =>
                product.name.toLowerCase().includes(queryParam),
            ),
        [favoriteProducts, queryParam],
    );

    return (
        <section className={styles.favorites}>
            <Breadcrumb />

            <h1 className={styles.favorites__title}>Favorites</h1>
            <p className={styles.favorites__count}>
                {visibleProducts.length} item
                {visibleProducts.length === 1 ? '' : 's'}
            </p>

            {!isLoading && favoriteProducts.length === 0 ? (
                <p className={styles.favorites__empty}>No favorites yet</p>
            ) : !isLoading && visibleProducts.length === 0 ? (
                <p className={styles.favorites__empty}>
                    There are no products matching the query
                </p>
            ) : (
                <div className={styles.favorites__grid}>
                    {visibleProducts.map(product => (
                        <ProductCard
                            key={product.itemId}
                            id={product.itemId}
                            detailsPath={`/product/${product.itemId}`}
                            image={`/${product.image}`}
                            title={product.name}
                            price={product.price}
                            fullPrice={product.fullPrice}
                            screen={product.screen}
                            capacity={product.capacity}
                            ram={product.ram}
                            isFavorite={favoriteIds.includes(product.itemId)}
                            onFavoriteToggle={toggleFavorite}
                            isInCart={isInCart(product.itemId)}
                            onAddToCart={addToCart}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};
