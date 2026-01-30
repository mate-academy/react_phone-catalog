import styles from './ProductsCards.module.scss';

import arrowLeft from './../../img/icons/Chevron Arrow Left.svg';
import arrowLeftDisabled from './../../img/icons/Chevron Arrow Left dis.svg';
import arrowRight from './../../img/icons/Chevron Arrow Right.svg';
import arrowRightDisabled from './../../img/icons/Chevron Arrow Right dis.svg';

import { useEffect, useRef, useState } from 'react';
import { useFavorites } from '../../FavoriteContext';
import { ProductCard } from '../ProductCard/ProductCard';

type RawProduct = {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  fullPrice?: number;
  screen?: string;
  capacity?: string;
  ram?: string;
  year?: number;
  imageSrc?: string;
  category?: string;
};

type PriceMode = 'full' | 'discount';

type ProductsCardsProps = {
  title: string;
  priceMode: PriceMode;
  filter?: (product: Product) => boolean;
};

export const ProductsCards: React.FC<ProductsCardsProps> = ({
  title,
  priceMode = 'full',
  filter,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const getItemsPerPage = () => {
    if (window.innerWidth >= 1200) {
      return 4;
    }

    if (window.innerWidth >= 701) {
      return 3;
    }

    if (window.innerWidth >= 650) {
      return 2;
    }

    return 1;
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setPage(0);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const preparedProducts = filter ? products.filter(filter) : products;
  const maxPage = Math.floor((preparedProducts.length - 1) / itemsPerPage);
  const startIndex = page * itemsPerPage;
  const visibleProducts = preparedProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleNext = () => setPage(prev => (prev < maxPage ? prev + 1 : prev));
  const handlePrev = () => setPage(prev => (prev > 0 ? prev - 1 : prev));

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    const basePath = import.meta.env.BASE_URL || '/';

    fetch(`${basePath}api/products.json`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Network ${res.status}`);
        }

        return res.json();
      })
      .then((data: RawProduct[]) => {
        if (cancelled) {
          return;
        }

        const mapped: Product[] = data.map(r => ({
          id: r.itemId,
          name: r.name,
          price: r.price ?? r.fullPrice ?? 0,
          fullPrice: r.fullPrice,
          screen: r.screen,
          capacity: r.capacity,
          ram: r.ram,
          year: r.year,
          category: r.category,
          imageSrc: r.image ? `/${r.image.replace(/^\/+/, '')}` : undefined,
        }));

        setProducts(mapped);
      })
      .catch(err => {
        console.error(err); // eslint-disable-line no-console
        if (!cancelled) {
          setError('Failed to load products');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const isFavoriteByItemId = (itemId: string, mode: PriceMode) =>
    favorites.some(f => f.itemId === itemId && f.id === `${itemId}-${mode}`);

  if (loading) {
    return (
      <section className={styles.productsCards}>
        <div className="container">
          <h2 className={styles.productsCardsTitle}>{title}</h2>
          <div className={styles.loader}>Loading…</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.productsCards}>
        <div className="container">
          <h2 className={styles.productsCardsTitle}>{title}</h2>
          <div className={styles.error}>
            <p>Something went wrong: {error}</p>
            <button onClick={() => window.location.reload()}>Reload</button>
          </div>
        </div>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className={styles.productsCards}>
        <div className="container">
          <h2 className={styles.productsCardsTitle}>{title}</h2>
          <p className={styles.empty}>There are no products yet</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.productsCards}>
      <div className="container">
        <h2 className={styles.productsCardsTitle}>{title}</h2>

        <div className={styles.productsCardsArrow}>
          <button
            type="button"
            aria-label="Scroll left"
            className={styles.arrowSize}
            onClick={handlePrev}
            disabled={page === 0}
          >
            <img
              src={page === 0 ? arrowLeftDisabled : arrowLeft}
              alt="arrow"
              className={styles.arrowImg}
            />
          </button>

          <button
            type="button"
            aria-label="Scroll right"
            className={styles.arrowSize}
            onClick={handleNext}
            disabled={page === maxPage}
          >
            <img
              src={page === maxPage ? arrowRightDisabled : arrowRight}
              alt="arrow"
              className={styles.arrowImg}
            />
          </button>
        </div>

        <div className={styles.cards} ref={containerRef}>
          {visibleProducts.map(product => {
            const categoryPath: 'phones' | 'tablets' | 'accessories' =
              product.category === 'phones'
                ? 'phones'
                : product.category === 'tablets'
                  ? 'tablets'
                  : product.category === 'accessories'
                    ? 'accessories'
                    : 'phones'; // fallback

            const favoriteItem = {
              id: `${product.id}-${priceMode}`,
              itemId: product.id,
              category: categoryPath,
              name: product.name,
              price:
                priceMode === 'full'
                  ? (product.fullPrice ?? product.price)
                  : product.price,
              fullPrice:
                priceMode === 'discount' ? product.fullPrice : undefined,
              screen: product.screen ?? '—',
              capacity: product.capacity ?? '—',
              ram: product.ram ?? '—',
              year: product.year ?? 0,
              image: product.imageSrc ?? '',
            };

            return (
              <ProductCard
                key={favoriteItem.id}
                category={favoriteItem.category}
                id={favoriteItem.id}
                itemId={favoriteItem.itemId}
                name={favoriteItem.name}
                image={favoriteItem.image}
                price={favoriteItem.price}
                fullPrice={favoriteItem.fullPrice}
                screen={favoriteItem.screen}
                capacity={favoriteItem.capacity}
                ram={favoriteItem.ram}
                isFavorite={isFavoriteByItemId(product.id, priceMode)}
                onToggleFavorite={() => {
                  if (isFavoriteByItemId(product.id, priceMode)) {
                    removeFavorite(favoriteItem.id);
                  } else {
                    addFavorite(favoriteItem);
                  }
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
