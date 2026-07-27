import { useEffect, useRef, useState } from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';
import { useShopState, type Product } from '../../hooks';
import styles from './ProductGallery.module.scss';
import { ProductCard } from '../ProductCard';

export interface ProductGalleryProps {
    title: string;
    products: Product[];
    showFullPrice?: boolean;
}

export const ProductGallery = ({
    title,
    products,
    showFullPrice = true,
}: ProductGalleryProps) => {
    const [canScrollPrevious, setCanScrollPrevious] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const viewportRef = useRef<HTMLDivElement>(null);
    const { favoriteIds, cartIds, toggleFavorite, addToCart } = useShopState();

    const updateNavigationState = () => {
        const viewport = viewportRef.current;

        if (!viewport) {
            return;
        }

        const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;

        setCanScrollPrevious(viewport.scrollLeft > 0);
        setCanScrollNext(viewport.scrollLeft < maxScrollLeft - 1);
    };

    const getScrollStep = () => {
        const viewport = viewportRef.current;
        const firstItem = viewport?.querySelector(
            `.${styles.productGallery__item}`,
        ) as HTMLElement | null;
        const track = viewport?.querySelector(
            `.${styles.productGallery__track}`,
        ) as HTMLElement | null;

        if (!viewport || !firstItem || !track) {
            return 0;
        }

        const trackStyles = window.getComputedStyle(track);
        const gap = Number.parseFloat(trackStyles.gap || '0');

        return firstItem.offsetWidth + gap;
    };

    const onPrevious = () => {
        const viewport = viewportRef.current;
        const scrollStep = getScrollStep();

        if (!viewport || scrollStep === 0) {
            return;
        }

        viewport.scrollBy({
            left: -scrollStep,
            behavior: 'smooth',
        });
    };

    const onNext = () => {
        const viewport = viewportRef.current;
        const scrollStep = getScrollStep();

        if (!viewport || scrollStep === 0) {
            return;
        }

        viewport.scrollBy({
            left: scrollStep,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const viewport = viewportRef.current;

        if (!viewport) {
            return undefined;
        }

        updateNavigationState();

        viewport.addEventListener('scroll', updateNavigationState);
        window.addEventListener('resize', updateNavigationState);

        return () => {
            viewport.removeEventListener('scroll', updateNavigationState);
            window.removeEventListener('resize', updateNavigationState);
        };
    }, [products.length]);

    return (
        <section className={styles.productGallery}>
            <SectionHeader
                title={title}
                onPrevious={onPrevious}
                onNext={onNext}
                previousDisabled={!canScrollPrevious}
                nextDisabled={!canScrollNext}
            />

            <div ref={viewportRef} className={styles.productGallery__viewport}>
                <div className={styles.productGallery__track}>
                    {products.map(product => (
                        <div
                            key={product.id}
                            className={styles.productGallery__item}
                        >
                            <ProductCard
                                id={product.id}
                                image={product.image}
                                title={product.name}
                                price={product.price}
                                fullPrice={
                                    showFullPrice
                                        ? product.fullPrice
                                        : undefined
                                }
                                screen={product.screen}
                                capacity={product.capacity}
                                ram={product.ram}
                                isFavorite={favoriteIds.includes(product.id)}
                                onFavoriteToggle={toggleFavorite}
                                isInCart={cartIds.includes(product.id)}
                                onAddToCart={addToCart}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
