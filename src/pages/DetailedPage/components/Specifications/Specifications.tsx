/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from './Specifications.module.scss';
import { Product } from '../../../../../public/api/types/ProductCard';
import { Good } from '../../../../../public/api/types/Good';
import { Theme } from '../../../../../public/api/types/theme';
import { useShop } from '../../../../components/ShopContext';

type Props = {
  product: Good;
  selected: string | null;
  onPickColor: (color: string) => void;
  selectedColor: string | null;
  onPickCapacity: (capacity: string) => void;
  selectedCapacity: string | null;
  setSelected: (img: string) => void;
  priceMode?: 'both' | 'full';
  theme: string;
};

export const Specifications: React.FC<Props> = ({
  product,
  selected,
  onPickColor,
  selectedColor,
  onPickCapacity,
  selectedCapacity,
  setSelected,
  priceMode = 'both',
  theme,
}) => {
  const discount =
    product.fullPrice > 0
      ? (product.fullPrice - product.price) / product.fullPrice
      : 0;

  const showBoth = priceMode === 'both' && discount >= 0.05;
  const { state, addToCart, toggleLike } = useShop();

  const fromCatalog: Product | undefined = (state as any)?.productsByItemId?.[
    product.id
  ];

  const asProduct: Product = fromCatalog ?? {
    id: Number(product.id),
    category: product.namespaceId,
    itemId: product.id,
    name: product.name,
    fullPrice: product.fullPrice,
    price: discount >= 0.05 ? product.price : product.fullPrice,
    screen: product.screen,
    capacity: product.capacity,
    color: product.color,
    ram: product.ram,
    year: new Date().getFullYear(),
    image: `/${product.images[0]}`,
  };

  const imgs = product.images ?? [];
  const currentIndex = Math.max(0, imgs.indexOf(selected ?? imgs[0]));

  const prevImg = () => {
    if (!imgs.length) {
      return;
    }

    const i = (currentIndex - 1 + imgs.length) % imgs.length;

    setSelected(imgs[i]);
  };

  const nextImg = () => {
    if (!imgs.length) {
      return;
    }

    const i = (currentIndex + 1) % imgs.length;

    setSelected(imgs[i]);
  };

  const handleAdd = () => addToCart(asProduct);
  const handleLike = () => toggleLike(asProduct);

  const isInCart = Boolean((state as any).cart?.[product.id]);
  const isLiked = Boolean(state.favorites?.[product.id]);

  const norm = (s: string) => s.toLowerCase().replace(/[\s-]/g, '');

  const COLOR_HEX: Record<string, string> = {
    spacegray: '#4a4a4a',
    midnightgreen: '#004953',
    gold: '#f4d85bff',
    silver: '#c0c0c0',
    black: '#000000',
    midnight: '#33334d',
    white: '#ffffff',
    blue: '#044595',
    green: '#4dff88',
    yellow: '#ffff00',
    purple: '#d580ff',
    red: '#cc0000',
    rosegold: '#ffb3b3',
    coral: '#ff704d',
    pink: '#ff99bb',
    graphite: '#525360',
    sierrablue: '#b3e6ff',
  };

  const swatch = (c: string) =>
    c.trim().startsWith('#') ? c : (COLOR_HEX[norm(c)] ?? c);

  return (
    <>
      <h1
        className={[
          styles.name,
          theme === Theme.LIGHT ? styles['name--light'] : '',
        ].join(' ')}
      >
        {product.name}
      </h1>
      <div
        className={[
          styles.specifications,
          theme === Theme.LIGHT ? styles['specifications--light'] : '',
        ].join(' ')}
      >
        <div
          className={[
            styles.gallery,
            theme === Theme.LIGHT ? styles['gallery--light'] : '',
          ].join(' ')}
        >
          <div className={styles.gallery__thumbs}>
            {product.images.map((img: string, i: number) => {
              const isActive = (selected ?? product.images[0]) === img;

              return (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelected(img)}
                  className={`${styles.gallery__thumb} ${isActive ? styles['gallery__thumb--active'] : ''}`}
                  aria-label={`Image ${i + 1}`}
                >
                  <img
                    src={`${img}`}
                    alt={`${product.name} ${i + 1}`}
                    className={styles.gallery__thumbImg}
                  />
                </button>
              );
            })}
          </div>

          <div className={styles.gallery__main}>
            {product.images.length > 1 && (
              <>
                <button
                  type="button"
                  className={`${styles.gallery__nav} ${styles['gallery__nav--prev']}`}
                  onClick={prevImg}
                  aria-label="Previous image"
                >
                  ❮
                </button>

                <img
                  src={`${selected ?? product.images[0]}`}
                  alt={product.name}
                  className={styles.gallery__mainImg}
                />

                <button
                  type="button"
                  className={`${styles.gallery__nav} ${styles['gallery__nav--next']}`}
                  onClick={nextImg}
                  aria-label="Next image"
                >
                  ❯
                </button>
              </>
            )}
          </div>
        </div>

        <div className={styles.specifications__details}>
          <div
            className={[
              styles.colors,
              theme === Theme.LIGHT ? styles['colors--light'] : '',
            ].join(' ')}
          >
            <p className={styles.colors__label}>Available colors</p>
            <span className={styles.colors__id}>ID: 80915</span>
            <div className={styles.colors__list}>
              {product.colorsAvailable.map((color: string) => {
                const isActive = color === selectedColor;

                return (
                  <div
                    key={color}
                    className={`${styles.colors__item} ${isActive ? styles['colors__item--active'] : ''}`}
                    style={{ backgroundColor: swatch(color) }}
                    onClick={() => onPickColor(color)}
                    aria-label={color}
                  />
                );
              })}
            </div>
          </div>

          <div
            className={[
              styles.capacity,
              theme === Theme.LIGHT ? styles['capacity--light'] : '',
            ].join(' ')}
          >
            <p className={styles.capacity__label}>Select capacity</p>

            <div className={styles.capacity__list}>
              {product.capacityAvailable.map((cap: string) => {
                const isActive = cap === selectedCapacity;

                return (
                  <div
                    key={cap}
                    className={`${styles.capacity__item} ${isActive ? styles['capacity__item--active'] : ''}`}
                    onClick={() => onPickCapacity(cap)}
                    aria-pressed={isActive}
                  >
                    {cap}
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={[
              styles.product,
              theme === Theme.LIGHT ? styles['product--light'] : '',
            ].join(' ')}
          >
            <div className={styles.product__priceBlock}>
              {showBoth ? (
                <>
                  <h3 className={styles.product__price}>${product.price}</h3>
                  <h3
                    className={`${styles.product__fullPrice} ${styles['product__fullPrice--old']}`}
                  >
                    ${product.fullPrice}
                  </h3>
                </>
              ) : (
                <h3 className={styles.product__price}>${product.fullPrice}</h3>
              )}
            </div>

            <div className={styles.product__actions}>
              <button
                className={styles.product__button}
                onClick={handleAdd}
                disabled={isInCart}
                aria-disabled={isInCart}
              >
                {isInCart ? 'Added' : 'Add to cart'}
              </button>
              <button
                className={styles.product__like__button}
                onClick={handleLike}
                aria-pressed={isLiked}
              >
                <span className={styles.product__butImg} aria-hidden="true" />
              </button>
            </div>

            <dl className={styles.product__specs}>
              <div className={styles.product__specItem}>
                <dt className={styles.product__specs__dt}>Screen</dt>
                <dd className={styles.product__specs__dd}>{product.screen}</dd>
              </div>
              <div className={styles.product__specItem}>
                <dt className={styles.product__specs__dt}>Capacity</dt>
                <dd className={styles.product__specs__dd}>
                  {product.capacity}
                </dd>
              </div>
              <div className={styles.product__specItem}>
                <dt className={styles.product__specs__dt}>Processor</dt>
                <dd className={styles.product__specs__dd}>
                  {product.processor}
                </dd>
              </div>
              <div className={styles.product__specItem}>
                <dt className={styles.product__specs__dt}>RAM</dt>
                <dd className={styles.product__specs__dd}>{product.ram}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};
