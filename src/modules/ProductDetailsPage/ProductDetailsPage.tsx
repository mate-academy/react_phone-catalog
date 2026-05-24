/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import classNames from 'classnames';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackButton } from '../../components/BackButton';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Loader } from '../../components/Loader';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import {
  getProductDetails,
  getProducts,
  getSuggestedProducts,
} from '../../utils/api';
import styles from './ProductDetailsPage.module.scss';

const CATEGORY_TITLES: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const COLOR_HEX: Record<string, string> = {
  black: '#1F2020',
  white: '#F9F6EF',
  red: '#BA0C2E',
  blue: '#215E7C',
  green: '#ADE1CD',
  yellow: '#FFE681',
  purple: '#D1CDDA',
  pink: '#FAE0D8',
  orange: '#F0D4B0',
  gold: '#FCDBC1',
  silver: '#F5F5F0',
  coral: '#EE7762',
  midnight: '#171E27',
  starlight: '#FAF6F2',
  rosegold: '#E6C7C2',
  'rose gold': '#E6C7C2',
  graphite: '#41424C',
  sierrablue: '#69ABCE',
  spaceblack: '#403E3D',
  spacegray: '#535150',
  'space gray': '#535150',
  'space black': '#403E3D',
  midnightgreen: '#4E5851',
  'sky blue': '#276787',
};

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();
  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { toggleCartItem, addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    setIsLoading(true);
    setSelectedImage(0);

    Promise.all([
      getProductDetails(productId),
      getProducts(),
      getSuggestedProducts(),
    ])
      .then(([det, allProducts, sug]) => {
        setDetails(det);

        const found = allProducts.find(p => p.itemId === productId) || null;

        setProduct(found);
        setSuggested(sug.slice(0, 12));
      })
      .finally(() => setIsLoading(false));
  }, [productId]);

  if (isLoading) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }

  if (!details || !product) {
    return (
      <div className="container">
        <h1 className="page__title">Product was not found</h1>
      </div>
    );
  }

  const {
    name,
    images,
    colorsAvailable,
    color,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    screen,
    resolution,
    processor,
    ram,
    description,
    camera,
    zoom,
    cell,
    namespaceId,
    category,
  } = details;

  const inCart = isInCart(product.id);
  const favorited = isFavorite(product.id);

  const buildLink = (newColor?: string, newCapacity?: string) => {
    const c = (newColor || color).toLowerCase().replace(/\s+/g, '-');
    const cap = (newCapacity || capacity).toLowerCase().replace(/\s+/g, '-');

    return `/product/${namespaceId}-${cap}-${c}`;
  };

  const categoryTitle = CATEGORY_TITLES[category] || category;

  return (
    <div className="container">
      <Breadcrumbs
        items={[{ label: categoryTitle, to: `/${category}` }, { label: name }]}
      />

      <BackButton />

      <h2 className={styles.details__title}>{name}</h2>

      <div className={styles.details__main}>
        {/* ---- Image gallery ---- */}
        <div className={styles.details__gallery}>
          <div className={styles.details__mainImage}>
            <img
              src={images[selectedImage]}
              alt={name}
              className={styles.details__mainImg}
            />
          </div>

          <div className={styles.details__thumbs}>
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                className={classNames(styles.details__thumb, {
                  [styles['details__thumb--active']]: i === selectedImage,
                })}
                onClick={() => setSelectedImage(i)}
              >
                <img src={img} alt={`${name} photo ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* ---- Controls ---- */}
        <div className={styles.details__controls}>
          {/* Colors */}
          <div className={styles.details__section}>
            <p className={styles.details__sectionLabel}>Available colors</p>
            <div className={styles.details__colors}>
              {colorsAvailable.map(c => (
                <Link
                  key={c}
                  to={buildLink(c)}
                  className={classNames(styles.details__colorCircle, {
                    [styles['details__colorCircle--active']]:
                      c.toLowerCase() === color.toLowerCase(),
                  })}
                  style={{
                    backgroundColor:
                      COLOR_HEX[c.toLowerCase()] || c.replace(/\s/g, ''),
                  }}
                />
              ))}
            </div>
          </div>

          <div className={styles.details__divider} />

          {/* Capacity */}
          <div className={styles.details__section}>
            <p className={styles.details__sectionLabel}>Select capacity</p>
            <div className={styles.details__capacities}>
              {capacityAvailable.map(cap => (
                <Link
                  key={cap}
                  to={buildLink(undefined, cap)}
                  className={classNames(styles.details__capButton, {
                    [styles['details__capButton--active']]: cap === capacity,
                  })}
                >
                  {cap}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.details__divider} />

          {/* Price */}
          <div className={styles.details__priceRow}>
            <span className={styles.details__price}>${priceDiscount}</span>
            {priceRegular > priceDiscount && (
              <span className={styles.details__fullPrice}>${priceRegular}</span>
            )}
          </div>

          {/* Action buttons */}
          <div className={styles.details__actions}>
            <button
              type="button"
              className={classNames(styles.details__addToCart, {
                [styles['details__addToCart--active']]: inCart,
              })}
              onClick={() => toggleCartItem(product)}
            >
              {inCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              type="button"
              className={classNames(styles.details__favButton, {
                [styles['details__favButton--active']]: favorited,
              })}
              onClick={() => toggleFavorite(product)}
              aria-label="Toggle favourites"
            >
              <img
                src={
                  favorited
                    ? 'img/icons/favourites-filled.svg'
                    : 'img/icons/favourites.svg'
                }
                alt="Favourites"
                data-no-invert={favorited || undefined}
              />
            </button>
          </div>

          {/* Short specs */}
          <div className={styles.details__shortSpecs}>
            <div className={styles.details__specRow}>
              <span className={styles.details__specLabel}>Screen</span>
              <span className={styles.details__specValue}>{screen}</span>
            </div>
            <div className={styles.details__specRow}>
              <span className={styles.details__specLabel}>Resolution</span>
              <span className={styles.details__specValue}>{resolution}</span>
            </div>
            <div className={styles.details__specRow}>
              <span className={styles.details__specLabel}>Processor</span>
              <span className={styles.details__specValue}>{processor}</span>
            </div>
            <div className={styles.details__specRow}>
              <span className={styles.details__specLabel}>RAM</span>
              <span className={styles.details__specValue}>{ram}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---- About + Tech specs ---- */}
      <div className={styles.details__info}>
        <div className={styles.details__about} data-cy="productDescription">
          <h3 className={styles.details__infoTitle}>About</h3>
          <div className={styles.details__infoDivider} />

          {description.map(section => (
            <div key={section.title} className={styles.details__aboutSection}>
              <h4 className={styles.details__aboutSubtitle}>{section.title}</h4>
              {section.text.map(paragraph => (
                <p key={paragraph} className={styles.details__aboutText}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.details__techSpecs}>
          <h3 className={styles.details__infoTitle}>Tech specs</h3>
          <div className={styles.details__infoDivider} />

          <div className={styles.details__techList}>
            <div className={styles.details__specRow}>
              <span className={styles.details__specLabel}>Screen</span>
              <span className={styles.details__specValue}>{screen}</span>
            </div>
            <div className={styles.details__specRow}>
              <span className={styles.details__specLabel}>Resolution</span>
              <span className={styles.details__specValue}>{resolution}</span>
            </div>
            <div className={styles.details__specRow}>
              <span className={styles.details__specLabel}>Processor</span>
              <span className={styles.details__specValue}>{processor}</span>
            </div>
            <div className={styles.details__specRow}>
              <span className={styles.details__specLabel}>RAM</span>
              <span className={styles.details__specValue}>{ram}</span>
            </div>
            <div className={styles.details__specRow}>
              <span className={styles.details__specLabel}>Built in memory</span>
              <span className={styles.details__specValue}>{capacity}</span>
            </div>
            {camera && (
              <div className={styles.details__specRow}>
                <span className={styles.details__specLabel}>Camera</span>
                <span className={styles.details__specValue}>{camera}</span>
              </div>
            )}
            {zoom && (
              <div className={styles.details__specRow}>
                <span className={styles.details__specLabel}>Zoom</span>
                <span className={styles.details__specValue}>{zoom}</span>
              </div>
            )}
            <div className={styles.details__specRow}>
              <span className={styles.details__specLabel}>Cell</span>
              <span className={styles.details__specValue}>
                {cell.join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---- You may also like ---- */}
      <section className={styles.details__suggested}>
        <ProductsSlider title="You may also like" products={suggested} />
      </section>
    </div>
  );
};
