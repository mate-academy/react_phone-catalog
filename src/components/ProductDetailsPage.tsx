import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductDetails.scss';

import { ProductCard } from './ProductCard';
import { Product } from '../types/Product';
import { normalizeProduct } from '../utils/normalizeProduct';
import { useCartContext } from '../context/CartContext';

/* ---------- Types ---------- */
type ProductDetails = ReturnType<typeof normalizeProduct>;

type DescriptionBlock = {
  title?: string;
  text?: string[];
};

const FAV_KEY = 'nice_gadgets_favorites';
const loadFav = (): string[] =>
  JSON.parse(localStorage.getItem(FAV_KEY) || '[]');

const saveFav = (v: string[]) =>
  localStorage.setItem(FAV_KEY, JSON.stringify(v));

/* ---------- Component ---------- */
export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement>(null);

  const { cartItems, setCartItems } = useCartContext();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [baseproduct, setBaseProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [activeImage, setActiveImage] = useState(0);
  const [activeCapacity, setActiveCapacity] = useState('');
  const [activeColor, setActiveColor] = useState('');

  const [favorites, setFavorites] = useState<string[]>(loadFav());

  /* ---------- Load data ---------- */
  useEffect(() => {
    if (!productId) {
      return;
    }

    setLoading(true);
    setError(false);

    fetch('/api/products.json')
      .then(r => r.json())
      .then((products: Product[]) => {
        const base = products.find(p => p.itemId === productId);

        if (!base) {
          setError(true);

          return;
        }

        setBaseProduct(base);

        setAllProducts(products);

        let detailsFile = '';

        if (base.category === 'phones') {
          detailsFile = '/api/phones.json';
        }

        if (base.category === 'tablets') {
          detailsFile = '/api/tablets.json';
        }

        if (base.category === 'accessories') {
          detailsFile = '/api/accessories.json';
        }

        return fetch(detailsFile)
          .then(r => r.json())
          .then((list: ProductDetails[]) => {
            const details = list.find(p => p.id === productId);

            if (!details) {
              setError(true);

              return;
            }

            const normalized = normalizeProduct(details);

            setProduct(normalized);
            setActiveCapacity(normalized.capacityAvailable[0]);
            setActiveColor(normalized.colorsAvailable[0]);
          });
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [productId]);

  /* ---------- Favorites ---------- */
  const isInFavorites = product ? favorites.includes(product.id) : false;

  const handleFavorite = () => {
    if (!product) {
      return;
    }

    const updated = isInFavorites
      ? favorites.filter(id => id !== product.id)
      : [...favorites, product.id];

    setFavorites(updated);
    saveFav(updated);
  };

  /* ---------- Cart ---------- */
  const isInCart = useMemo(() => {
    if (!product) {
      return false;
    }

    return cartItems.some(
      item =>
        item.id === product.id &&
        item.capacity === activeCapacity &&
        item.color === activeColor,
    );
  }, [cartItems, product, activeCapacity, activeColor]);

  const handleCart = () => {
    if (!product) {
      return;
    }

    const updated = [...cartItems];
    const index = updated.findIndex(
      it =>
        it.id === product.id &&
        it.capacity === activeCapacity &&
        it.color === activeColor,
    );

    if (index >= 0) {
      updated[index].quantity += 1;
    } else {
      updated.push({
        id: product.id,
        name: product.name,
        image: product.images[0],
        price: product.price || product.fullPrice,
        capacity: activeCapacity,
        color: activeColor,
        quantity: 1,
      });
    }

    setCartItems(updated);
  };

  /* ---------- Suggested ---------- */
  const suggested = useMemo(() => {
    if (!product || !allProducts.length) {
      return [];
    }

    return allProducts
      .filter(p => p.id !== product.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
  }, [allProducts, product]);

  /* ---------- Scroll ---------- */
  const handleScroll = (dir: 'left' | 'right') => {
    if (!trackRef.current) {
      return;
    }

    const step = 272 + 16;

    trackRef.current.scrollBy({
      left: dir === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  /* ---------- States ---------- */
  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error || !product) {
    return (
      <div className="container">
        <p className="product-details__error">Product not found</p>
      </div>
    );
  }

  const {
    name,
    price,
    fullPrice,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
    description,
    images,
    capacityAvailable,
    colorsAvailable,
  } = product;

  return (
    <section className="product-details">
      <div className="container">
        <div className="breadcrumbs">
          <img
            src="/img/icons/home.svg"
            alt="Home"
            className="breadcrumbs__home"
            onClick={() => navigate('/')}
          />
          <img
            src="/img/icons/right.svg"
            alt=">"
            className="breadcrumbs__sep"
          />
          <span
            className="breadcrumbs__category"
            onClick={() => navigate(`/${product.category}`)}
          >
            {product.category}
          </span>
          <img
            src="/img/icons/right.svg"
            alt=">"
            className="breadcrumbs__sep"
          />
          <span className="breadcrumbs__current">{product.name}</span>
        </div>
        <button className="product-details__back" onClick={() => navigate(-1)}>
          <img src="/img/icons/left.svg" alt="Back" />
          Back
        </button>

        <h1 className="product-details__title">{name}</h1>

        {/* ------- TOP GRID ------- */}
        <div className="product-details__top">
          {/* IMAGES */}
          <div className="product-details__gallery">
            <div className="pd-gallery">
              <div
                className={`pd-gallery__thumbs ${images.length <= 4 ? 'pd-gallery__thumbs--stretch' : ''}`}
              >
                {images.map((src: string, i: number) => (
                  <button
                    key={src}
                    className={`pd-gallery__thumb ${
                      i === activeImage ? 'pd-gallery__thumb--active' : ''
                    }`}
                    onClick={() => setActiveImage(i)}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>

              <div className="pd-gallery__main">
                <img src={images[activeImage]} alt="" />
              </div>
            </div>
          </div>

          {/* INFO COLUMN */}
          <div className="product-details__info">
            {/* COLORS */}
            <div className="pd-selector">
              <span className="pd-selector__label">Available colors</span>
              <div className="pd-selector__row">
                {colorsAvailable.map((color: string) => (
                  <button
                    key={color}
                    className={`pd-color ${
                      activeColor === color ? 'pd-color--active' : ''
                    }`}
                    onClick={() => setActiveColor(color)}
                  >
                    <span
                      className="pd-color__dot"
                      style={{ backgroundColor: color }}
                    />
                  </button>
                ))}
              </div>
              <div className="pd-selector__divider" />
            </div>
            {/* CAPACITY */}
            <div className="pd-selector">
              <div className="pd-selector__header">
                <span className="pd-selector__label">Select capacity</span>
                <span className="pd-selector__id">ID: {baseproduct?.id}</span>
              </div>
              <div className="pd-selector__row">
                {capacityAvailable.map((cap: string) => (
                  <button
                    key={cap}
                    className={`pd-capacity ${
                      activeCapacity === cap ? 'pd-capacity--active' : ''
                    }`}
                    onClick={() => setActiveCapacity(cap)}
                  >
                    {cap}
                  </button>
                ))}
              </div>
              <div className="pd-selector__divider" />
            </div>
            {/* PRICE */}
            <div className="product-details__price-row">
              <span className="product-details__price">${price}</span>
              {fullPrice !== price && (
                <span className="product-details__price-old">${fullPrice}</span>
              )}
            </div>
            {/* BUTTONS */}
            <div className="product-details__buttons">
              <button
                className={`product-details__btn-cart ${
                  isInCart ? 'product-details__btn-cart--in' : ''
                }`}
                disabled={!product || isInCart}
                onClick={handleCart}
              >
                {isInCart ? 'Added one more' : 'Add to cart'}
              </button>
              <button
                onClick={handleFavorite}
                className={`product-details__btn-fav ${
                  isInFavorites ? 'product-details__btn-fav--active' : ''
                }`}
              >
                <img
                  src={
                    isInFavorites
                      ? '/img/icons/red.svg'
                      : '/img/icons/favourites.svg'
                  }
                  alt="Add to favorites"
                />
              </button>
            </div>
            {/* Short specs */}
            <ul className="product-details__short-specs">
              <li>
                <span className="product-details__specs-name">Screen</span>
                <span className="product-details__spec-value">{screen}</span>
              </li>
              {resolution && (
                <li>
                  <span className="product-details__specs-name">
                    Resolution
                  </span>
                  <span className="product-details__spec-value">
                    {resolution}
                  </span>
                </li>
              )}
              {processor && (
                <li>
                  <span className="product-details__specs-name">Processor</span>
                  <span className="product-details__spec-value">
                    {processor}
                  </span>
                </li>
              )}
              <li>
                <span className="product-details__specs-name">RAM</span>
                <span className="product-details__spec-value">{ram}</span>
              </li>
            </ul>
          </div>
        </div>
        {/* ABOUT */}
        <div className="product-details__bottom">
          <div className="product-details__about">
            <h2 className="product-details__specs-title">About</h2>
            <div className="pd-selector__divider" />
            <div className="product-details__text-block">
              {Array.isArray(description) ? (
                (description as DescriptionBlock[]).map((block, i) => (
                  <div key={i}>
                    {block.title && (
                      <h3 className="product-details__specs-title1">
                        {block.title}
                      </h3>
                    )}
                    {Array.isArray(block.text) &&
                      block.text.map((line: string, j: number) => (
                        <p key={j}>{line}</p>
                      ))}
                  </div>
                ))
              ) : (
                <p>No description available.</p>
              )}
            </div>
          </div>
          {/* TECH SPECS */}
          <div className="product-details__specs">
            <h2 className="product-details__specs-title">Tech specs</h2>
            <div className="pd-selector__divider" />
            <dl className="product-details__specs-list">
              <div>
                <dt>Screen</dt>
                <dd>{screen}</dd>
              </div>
              {resolution && (
                <div>
                  <dt>Resolution</dt>
                  <dd>{resolution}</dd>
                </div>
              )}
              {processor && (
                <div>
                  <dt>Processor</dt>
                  <dd>{processor}</dd>
                </div>
              )}
              <div>
                <dt>RAM</dt>
                <dd>{ram}</dd>
              </div>
              {camera && (
                <div>
                  <dt>Camera</dt>
                  <dd>{camera}</dd>
                </div>
              )}
              {zoom && (
                <div>
                  <dt>Zoom</dt>
                  <dd>{zoom}</dd>
                </div>
              )}
              {cell?.length > 0 && (
                <div>
                  <dt>Cell</dt>
                  <dd>{cell.join(', ')}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
        {/* SUGGESTED */}
        {suggested.length > 0 && (
          <section className="product-details__suggested">
            <div className="product-details__grid">
              <h2 className="product-details__title">You may also like</h2>
              <div className="product-list__arrow">
                <button
                  className="product-list__arrow product-list__arrow-left"
                  onClick={() => handleScroll('left')}
                >
                  <img src="/img/icons/left.svg" alt="Prev" />
                </button>
                <button
                  className="product-list__arrow product-list__arrow-right"
                  onClick={() => handleScroll('right')}
                >
                  <img src="/img/icons/right.svg" alt="Next" />
                </button>
              </div>
            </div>
            <div className="product-list product-list--slider">
              <div
                className="product-list__track product-list__track--slider"
                ref={trackRef}
              >
                {suggested.map(item => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </section>
  );
};
