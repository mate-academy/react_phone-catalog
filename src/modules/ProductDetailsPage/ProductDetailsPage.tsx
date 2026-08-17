import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';

import HomeIcon from '../../assets/images/homeIcon.svg';
import ArrowRight from '../../assets/images/arrow-top.svg';
import FavoriteIcon from '../../assets/images/Favourites.svg';
import FavoriteIconFilled from '../../assets/images/favoritesFiled.svg';

import { ProductDetails } from '../shared/types/ProductDetails';
import { Product } from '../shared/types/Product';
import {
  getProductById,
  getProductDetails,
  getSuggestedProducts,
} from '../shared/api/products';
import { ProductCard } from '../shared/components/ProductCard';

// eslint-disable-next-line max-len
import { ProductDetailsSkeleton } from '../shared/components/Skeletons/ProductDetailsSkeleton';
import { useFavorites } from '../shared/context/FavoriteContext';
import { useCart } from '../shared/context/CartContext';
import classNames from 'classnames';

const COLOR_MAP: Record<string, string> = {
  gold: '#FCDBC1',
  midnightgreen: '#5F675D',
  spacegray: '#4C4C4C',
  silver: '#F0F0F0',
  black: '#1F2020',
  green: '#AEE1CD',
  yellow: '#FFE681',
  white: '#F9F6EF',
  purple: '#E5D9F2',
  red: '#BA0C2E',
};

export const ProductDetailsPage = () => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const navigate = useNavigate();
  const { category, itemId } = useParams<{
    category: string;
    itemId: string;
  }>();

  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart, removeFromCart, isInCart } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!itemId) {
      return;
    }

    setIsLoading(true);

    Promise.all([
      getProductDetails(itemId),
      getProductById(itemId),
      getSuggestedProducts(),
    ])
      .then(([detailsData, productData, suggestedData]) => {
        setDetails(detailsData);
        setProduct(productData);
        setSelectedImage(detailsData.images[0] || '');
        setSuggested(suggestedData);
      })
      .catch(error => {
        throw error;
      })
      .finally(() => setIsLoading(false));
  }, [itemId]);

  if (isLoading && !details) {
    return <ProductDetailsSkeleton />;
  }

  if (!details) {
    return <div className={styles.notFound}>Product not found</div>;
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
    camera,
    zoom,
    cell,
    description,
    namespaceId,
  } = details;

  const favorite = itemId ? isFavorite(itemId) : false;

  const inCart = itemId ? isInCart(itemId) : false;

  const handleClickCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!itemId) {
      return;
    }

    if (inCart) {
      removeFromCart(itemId);
    } else if (product) {
      addToCart(product);
    }
  };

  const handleClickFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!itemId) {
      return;
    }

    if (favorite) {
      removeFromFavorites(itemId);
    } else if (product) {
      addToFavorites(product);
    }
  };

  const handleColorChange = (newColor: string) => {
    const newSlug = `${namespaceId}-${capacity.toLowerCase()}-${newColor}`;

    navigate(`/${category || 'phones'}/${newSlug}`);
  };

  const handleCapacityChange = (newCapacity: string) => {
    const newSlug = `${namespaceId}-${newCapacity.toLowerCase()}-${color}`;

    navigate(`/${category || 'phones'}/${newSlug}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.itemCard}>
        <nav className={styles.itemCard__breadcrumbs} aria-label="Breadcrumbs">
          <Link to="/" className={styles.itemCard__breadcrumbLink}>
            <img src={HomeIcon} alt="Home" />
          </Link>
          <img
            src={ArrowRight}
            alt="arrow"
            className={styles.itemCard__arrow}
          />
          <Link
            to={`/${category || 'phones'}`}
            className={styles.itemCard__breadcrumbCategory}
          >
            {category
              ? category.charAt(0).toUpperCase() + category.slice(1)
              : 'Phones'}
          </Link>
          <img
            src={ArrowRight}
            alt="arrow"
            className={styles.itemCard__arrow}
          />
          <span className={styles.itemCard__breadcrumbCurrent}>{name}</span>
        </nav>

        <button
          onClick={() => navigate(`/${category || 'phones'}`)}
          className={styles.itemCard__backBtn}
        >
          <img
            src={ArrowRight}
            alt="back"
            className={styles.itemCard__backIcon}
          />
          Back
        </button>

        <h1 className={styles.itemCard__title}>{name}</h1>

        <div className={styles.itemCard__main}>
          <div className={styles.itemCard__gallery}>
            <div className={styles.itemCard__thumbnails}>
              {images.map(img => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`${styles.itemCard__thumb} ${
                    selectedImage === img
                      ? styles['itemCard__thumb--active']
                      : ''
                  }`}
                >
                  <img src={img} alt="thumbnail" />
                </button>
              ))}
            </div>

            <div className={styles.itemCard__mainImage}>
              <img src={selectedImage} alt={name} />
            </div>
          </div>

          <div className={styles.itemCard__actions}>
            <div className={styles.itemCard__sectionHeader}>
              <span className={styles.itemCard__label}>Available colors</span>
              <span className={styles.itemCard__id}>ID: {namespaceId}</span>
            </div>

            <div className={styles.itemCard__colors}>
              {colorsAvailable.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleColorChange(c)}
                  className={`${styles.itemCard__colorBtn} ${
                    color === c ? styles['itemCard__colorBtn--active'] : ''
                  }`}
                >
                  <span
                    className={styles.itemCard__colorCircle}
                    style={{ backgroundColor: COLOR_MAP[c] || c }}
                  />
                </button>
              ))}
            </div>

            <div className={styles.itemCard__divider} />

            <div className={styles.itemCard__sectionHeader}>
              <span className={styles.itemCard__label}>Select capacity</span>
            </div>

            <div className={styles.itemCard__capacities}>
              {capacityAvailable.map(cap => (
                <button
                  key={cap}
                  type="button"
                  onClick={() => handleCapacityChange(cap)}
                  className={`${styles.itemCard__capacityBtn} ${
                    capacity === cap
                      ? styles['itemCard__capacityBtn--active']
                      : ''
                  }`}
                >
                  {cap}
                </button>
              ))}
            </div>

            <div className={styles.itemCard__divider} />

            <div className={styles.itemCard__priceBlock}>
              <span className={styles.itemCard__price}>${priceDiscount}</span>
              {priceRegular > priceDiscount && (
                <span className={styles.itemCard__fullPrice}>
                  ${priceRegular}
                </span>
              )}
            </div>

            <div className={styles.itemCard__buttons}>
              <button
                type="button"
                className={classNames(styles.itemCard__btnCart, {
                  [styles['itemCard__btnCart--inCart']]: inCart,
                })}
                onClick={e => handleClickCart(e)}
              >
                {inCart ? 'Added to cart' : 'Add to cart'}
              </button>
              <button
                type="button"
                className={styles.itemCard__btnFav}
                aria-label="Favorites"
                onClick={e => handleClickFavorite(e)}
              >
                <img
                  src={favorite ? FavoriteIconFilled : FavoriteIcon}
                  alt="Favorites"
                />
              </button>
            </div>

            <div className={styles.itemCard__shortSpecs}>
              <div className={styles.itemCard__specRow}>
                <span>Screen</span>
                <span>{screen}</span>
              </div>
              <div className={styles.itemCard__specRow}>
                <span>Resolution</span>
                <span>{resolution}</span>
              </div>
              <div className={styles.itemCard__specRow}>
                <span>Processor</span>
                <span>{processor}</span>
              </div>
              <div className={styles.itemCard__specRow}>
                <span>RAM</span>
                <span>{ram}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.itemCard__details}>
          <section className={styles.itemCard__about}>
            <h2>About</h2>
            {description.map(item => (
              <article
                key={item.title}
                className={styles.itemCard__aboutArticle}
              >
                <h3>{item.title}</h3>
                {item.text.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </article>
            ))}
          </section>

          <section className={styles.itemCard__specs}>
            <h2>Tech specs</h2>
            <div className={styles.itemCard__techSpecsList}>
              <div className={styles.itemCard__specRow}>
                <span>Screen</span>
                <span>{screen}</span>
              </div>
              <div className={styles.itemCard__specRow}>
                <span>Resolution</span>
                <span>{resolution}</span>
              </div>
              <div className={styles.itemCard__specRow}>
                <span>Processor</span>
                <span>{processor}</span>
              </div>
              <div className={styles.itemCard__specRow}>
                <span>RAM</span>
                <span>{ram}</span>
              </div>
              <div className={styles.itemCard__specRow}>
                <span>Built in memory</span>
                <span>{capacity}</span>
              </div>
              {camera && (
                <div className={styles.itemCard__specRow}>
                  <span>Camera</span>
                  <span>{camera}</span>
                </div>
              )}
              {zoom && (
                <div className={styles.itemCard__specRow}>
                  <span>Zoom</span>
                  <span>{zoom}</span>
                </div>
              )}
              <div className={styles.itemCard__specRow}>
                <span>Cell</span>
                <span>{cell.join(', ')}</span>
              </div>
            </div>
          </section>
        </div>

        {suggested.length > 0 && (
          <section className={styles.itemCard__recommended}>
            <h2>You may also like</h2>
            <div className={styles.itemCard__recommendedGrid}>
              {suggested.slice(0, 4).map(productItem => (
                <ProductCard key={productItem.id} product={productItem} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
