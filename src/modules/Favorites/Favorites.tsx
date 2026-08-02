import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumb } from '../shared/components/Breadcrumb';
import { ProductCard } from '../shared/components/ProductCard';
import { getPublicPath } from '../shared/utils/getPublicPath';
import {
    useAccessories,
    usePhones,
    useShopState,
    useTablets,
    type Device,
} from '../shared/hooks';
import styles from './Favorites.module.scss';

export const Favorites = () => {
    const [searchParams] = useSearchParams();
    const { phones, isLoading: isPhonesLoading } = usePhones();
    const { tablets, isLoading: isTabletsLoading } = useTablets();
    const { accessories, isLoading: isAccessoriesLoading } = useAccessories();
    const { favoriteIds, isInCart, toggleFavorite, addToCart } = useShopState();
    const queryParam = searchParams.get('query')?.trim().toLowerCase() ?? '';
    const products = useMemo<Device[]>(
        () => [...phones, ...tablets, ...accessories],
        [phones, tablets, accessories],
    );
    const isLoading =
        isPhonesLoading || isTabletsLoading || isAccessoriesLoading;

    const favoriteProducts = useMemo(
        () =>
            favoriteIds
                .map(favoriteId =>
                    products.find(product => product.id === favoriteId),
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
                            key={product.id}
                            id={product.id}
                            detailsPath={`/product/${product.id}`}
                            image={getPublicPath(product.images[0])}
                            title={product.name}
                            price={product.priceDiscount}
                            fullPrice={product.priceRegular}
                            screen={product.screen}
                            capacity={product.capacity}
                            ram={product.ram}
                            isFavorite={favoriteIds.includes(product.id)}
                            onFavoriteToggle={toggleFavorite}
                            isInCart={isInCart(product.id)}
                            onAddToCart={addToCart}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};
