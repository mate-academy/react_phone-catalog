import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';

import iconRight from '../../../public/icons/Chevron (Arrow Right).svg';
import iconHome from '../../../public/icons/Home.svg';
import iconBack from '../../../public/icons/Vector (Stroke).svg';
import defaultImage from '../../../public/icons/Favourites-(Heart-Like).svg';
import favImage from '../../../public/icons/Favourites-Filled-(Heart-Like).svg';

import { YouMayAlsoLikeSlider } from './YouMayLike/YouMayAlsoLike';
import { useCart } from '../../context/CartContext';

type DescriptionSection = {
  title: string;
  text: string[];
};

type Product = {
  id: string;
  category?: string;
  namespaceId?: string;
  name: string;
  images?: string[];
  colorsAvailable?: string[];
  capacityAvailable?: string[];
  capacity?: string;
  color?: string;
  priceRegular?: number;
  priceDiscount?: number;
  description?: DescriptionSection[] | string;
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
  [k: string]: any;
};

export function ProductDetailsPage(): JSX.Element {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [mainImage, setMainImage] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [selectedCapacity, setSelectedCapacity] = useState<string>();
  const [isFav, setIsFav] = useState(false);

  const { addToCart, addToFavourites, favourites, cartItems } = useCart();

  useEffect(() => {
    if (!product?.images?.length) {
      setMainImage(undefined);

      return;
    }

    const raw = product.images[0];
    const normalized = raw.startsWith('/') ? raw : `/${raw}`;

    setMainImage(normalized);

    console.log('product loaded, set mainImage ->', normalized);
  }, [product]);

  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    setError(null);

    Promise.all([
      fetch('/api/phones.json').then(r => (r.ok ? r.json() : [])),
      fetch('/api/tablets.json').then(r => (r.ok ? r.json() : [])),
      fetch('/api/accessories.json').then(r => (r.ok ? r.json() : [])),
    ])
      .then(([phones, tablets, accessories]) => {
        const all = [
          ...(phones || []),
          ...(tablets || []),
          ...(accessories || []),
        ] as Product[];
        setAllProducts(all);

        const found = all.find(p => String(p.id) === String(productId));

        if (!found) {
          setError('Product not found');
          setProduct(null);
          return;
        }

        setSelectedColor(found.color ?? found.colorsAvailable?.[0]);
        setSelectedCapacity(found.capacity ?? found.capacityAvailable?.[0]);
        setProduct(found);
        if (found.images?.length) {
          const m = found.images[0].startsWith('/')
            ? found.images[0]
            : `/${found.images[0]}`;

          setMainImage(m);
          console.log('initial mainImage set from fetch ->', m);
        }

        try {
          const favs = JSON.parse(localStorage.getItem('favs') || '[]');
          setIsFav(favs.includes(found.id));
        } catch {
          setIsFav(false);
        }
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load data');
      })
      .finally(() => setLoading(false));
  }, [productId]);

  // update product variant when color or capacity changes
  useEffect(() => {
    if (!product || !selectedColor || !selectedCapacity) return;

    const variant = allProducts.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.color === selectedColor &&
        p.capacity === selectedCapacity,
    );

    if (variant) {
      setProduct(variant);

      if (variant.images?.length) {
        const m = variant.images[0].startsWith('/')
          ? variant.images[0]
          : `/${variant.images[0]}`;

        setMainImage(m);
        console.log('variant selected, set mainImage ->', m);
      }
    }
  }, [selectedColor, selectedCapacity, allProducts]);

  const handleAddToCart = () => {
    if (!product || !selectedColor || !selectedCapacity) {
      return alert('Please select color and capacity');
    }

    const itemToAdd = {
      ...product,
      color: selectedColor,
      capacity: selectedCapacity,
    };

    addToCart(itemToAdd);
  };

  const isFavourite = product
    ? favourites.some(item => String(item.id) === String(product.id))
    : false;

  const isAddedToCart = product
    ? cartItems.some(
        ci =>
          String(ci.id) === String(product.id) &&
          (ci.color ?? product.color ?? selectedColor) ===
            (product.color ?? selectedColor) &&
          (ci.capacity ?? product.capacity ?? selectedCapacity) ===
            (product.capacity ?? selectedCapacity),
      )
    : false;

  const handleToggleFav = () => {
    if (!product) return;
    addToFavourites(product);
  };

  const renderDescription = () => {
    if (!product?.description) return null;

    if (typeof product.description === 'string')
      return <p>{product.description}</p>;

    return product.description.map((section, idx) => (
      <div key={idx} className={styles.descSection}>
        {section.title && <h4>{section.title}</h4>}
        {Array.isArray(section.text) ? (
          section.text.map((t, j) => <p key={j}>{t}</p>)
        ) : (
          <p>{String(section.text)}</p>
        )}
      </div>
    ));
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <p className={styles.loading}>Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <p className={styles.error}>{error}</p>
        <p>
          <Link to="/">Go back home</Link>
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.page}>
        <h2>Product not found</h2>
        <p>
          <Link to="/">Back to home</Link>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <nav className={styles.container}>
        <Link to="/">
          <img src={iconHome} alt="home" className={styles.icon__home} />
        </Link>
        <img src={iconRight} alt="right" className={styles.icon__right} />
        <div className={styles.navText}>{product.name}</div>
      </nav>

      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <img src={iconBack} alt="icon__back" className={styles.icon__back} />
        <div className={styles.navText__1}>Back</div>
      </button>

      <h1 className={styles.product__name}>{product.name}</h1>
      <div className={styles.content}>
        <div className={styles.images}>
          <div className={styles.thumbnails}>
            {product.images?.map((img, i) => {
              const src = img.startsWith('/') ? img : `/${img}`;

              return (
                <img
                  key={i}
                  src={src}
                  alt={product.name}
                  className={`${styles.thumb} ${mainImage === src ? styles.active : ''}`}
                  onClick={() => setMainImage(src)}
                />
              );
            })}
          </div>
          <div className={styles.mainImage}>
            {mainImage ? (
              <img src={mainImage} alt={product.name} />
            ) : (
              <div className={styles.placeholder}>No image</div>
            )}
          </div>
        </div>

        <aside className={styles.detailsCard}>
          {product.colorsAvailable?.length > 0 && (
            <div className={styles.block}>
              <div className={styles.blockTitle}>Available colors</div>
              <div className={styles.colorList}>
                {product.colorsAvailable.map(c => (
                  <button
                    key={c}
                    type="button"
                    className={`${styles.colorDot} ${selectedColor === c ? styles.colorActive : ''}`}
                    style={{ backgroundColor: c } as React.CSSProperties}
                    onClick={() => setSelectedColor(c)}
                  />
                ))}
              </div>
            </div>
          )}

          {product.capacityAvailable?.length > 0 && (
            <div className={styles.block}>
              <div className={styles.blockTitle}>Select capacity</div>
              <div className={styles.capacityList}>
                {product.capacityAvailable.map(cap => (
                  <button
                    key={cap}
                    type="button"
                    className={`${styles.capacityBtn} ${selectedCapacity === cap ? styles.capacityActive : ''}`}
                    onClick={() => setSelectedCapacity(cap)}
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.priceRow}>
            <div className={styles.priceMain}>
              <span className={styles.priceNow}>
                ${product.priceDiscount ?? product.priceRegular}
              </span>
              {product.priceDiscount && (
                <span className={styles.priceOld}>${product.priceRegular}</span>
              )}
            </div>
            <div className={styles.actionsRow}>
              <button
                className={
                  isAddedToCart ? styles.addedToCart : styles.addToCart
                }
                onClick={handleAddToCart}
              >
                {isAddedToCart ? 'Added' : 'Add to cart'}
              </button>
              <button
                className={styles.addToFavourites}
                onClick={handleToggleFav}
                aria-pressed={isFav}
              >
                <img
                  className={
                    isFavourite ? styles.favImageActive : styles.favImageDefault
                  }
                  src={isFavourite ? favImage : defaultImage}
                  alt="fav"
                />
              </button>
            </div>
          </div>

          <div className={styles.block}>
            <ul className={styles.specList}>
              {product.screen && (
                <li>
                  <span>Screen</span>
                  <span>{product.screen}</span>
                </li>
              )}
              {product.resolution && (
                <li>
                  <span>Resolution</span>
                  <span>{product.resolution}</span>
                </li>
              )}
              {product.processor && (
                <li>
                  <span>Processor</span>
                  <span>{product.processor}</span>
                </li>
              )}
              {product.ram && (
                <li>
                  <span>RAM</span>
                  <span>{product.ram}</span>
                </li>
              )}
            </ul>
          </div>
        </aside>
      </div>

      <div className={styles.other}>
        <div className={styles.about}>
          <h3>About</h3>
          <div className={styles.poloska}></div>
          <div className={styles.info}>{renderDescription()}</div>
        </div>
        <div className={styles.tech}>
          <h3>Tech specs</h3>
          <div className={styles.poloska}></div>
          <ul>
            <li>
              <p>Screen</p>
              <span>{product.screen}</span>
            </li>
            <li>
              <p>Resolution</p>
              <span>{product.resolution}</span>
            </li>
            <li>
              <p>Processor</p>
              <span>{product.processor}</span>
            </li>
            <li>
              <p>RAM</p>
              <span>{product.ram}</span>
            </li>
            <li>
              <p>Camera</p>
              <span>{product.camera}</span>
            </li>
            <li>
              <p>Zoom</p>
              <span>{product.zoom}</span>
            </li>
            <li>
              <p>Cell</p>
              <span>{product.cell?.join(', ')}</span>
            </li>
          </ul>
        </div>
      </div>
      <YouMayAlsoLikeSlider />
    </div>
  );
}
