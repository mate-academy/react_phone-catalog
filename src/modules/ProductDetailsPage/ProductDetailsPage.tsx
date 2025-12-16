import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from './ProductDetailsPage.module.scss';
import { getPhoneDetails, type PhoneDetails } from '../../api/phones';
import {
  getProducts,
  getSuggestedProducts,
  type Product,
} from '../../api/products';
import { Container } from '../shared/components/Container';
import { ProductCard } from '../shared/components/ProductCard';

import { useFavorites } from '../shared/context/FavoritesContext';

import HeartIcon from '../shared/icons/heart-like.svg?react';
import HeartRedIcon from '../shared/icons/heart-like-red.svg?react';
import { useCart } from '../shared/context/CartContext';
import { ProductDetailsSkeleton } from '../shared/components/Skeleton';
import { withBase } from '../shared/utils/baseUrl';

type RouteParams = {
  productId: string;
};

const buildProductId = (
  namespaceId: string,
  capacity: string,
  color: string,
) => {
  const cap = capacity.toLowerCase();

  return `${namespaceId}-${cap}-${color}`;
};

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<RouteParams>();
  const navigate = useNavigate();

  const { isFavorite, toggleFavorite } = useFavorites();

  const [product, setProduct] = useState<PhoneDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [suggested, setSuggested] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const refreshSuggested = (pool: Product[], excludeId: string) => {
    setSuggested(getSuggestedProducts(pool, excludeId, 4));
  };

  useEffect(() => {
    getProducts()
      .then(all => setAllProducts(all))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!productId || allProducts.length === 0) {
      return;
    }

    refreshSuggested(allProducts, productId);
  }, [productId, allProducts]);

  const { addToCart, cart } = useCart();

  const isInCart = !!productId && cart.some(item => item.id === productId);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);
    setError(null);

    getPhoneDetails(productId)
      .then(data => {
        if (!data) {
          setError('Product was not found');
          setProduct(null);

          return;
        }

        setProduct(data);
        setSelectedColor(data.color);
        setSelectedCapacity(data.capacity);
        setSelectedImageIndex(0);
      })
      .catch(() => setError('Failed to load product'))
      .finally(() => setIsLoading(false));
  }, [productId]);

  const categoryPath = useMemo(() => {
    if (!product) {
      return '/phones';
    }

    return `/${product.category}`;
  }, [product]);

  const categoryName = useMemo(() => {
    if (!product) {
      return 'Phones';
    }

    const name = product.category;

    return name.charAt(0).toUpperCase() + name.slice(1);
  }, [product]);

  if (isLoading) {
    return (
      <Container>
        <ProductDetailsSkeleton />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p className={styles.error}>{error}</p>
      </Container>
    );
  }

  if (!product) {
    return null;
  }

  const currentImage = withBase(product.images[selectedImageIndex]);

  const cardProduct = {
    id: product.id,
    itemId: product.id,
    name: product.name,
    price: product.priceDiscount,
    fullPrice: product.priceRegular,
    screen: product.screen,
    capacity: product.capacity,
    ram: product.ram,
    image: currentImage,
  };

  const active = isFavorite(cardProduct);

  const handleSuggestedPrev = () => {
    if (!productId) {
      return;
    }

    refreshSuggested(allProducts, productId);
  };

  const handleSuggestedNext = () => {
    if (!productId) {
      return;
    }

    refreshSuggested(allProducts, productId);
  };

  return (
    <Container>
      <nav className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumbLink}>
          <img
            src={withBase('img/icons/home.svg')}
            alt="Home"
            className={styles.homeIcon}
          />
        </Link>

        <img
          src={withBase('img/icons/vector.svg')}
          alt=""
          className={styles.separatorIcon}
        />

        <Link to={categoryPath} className={styles.breadcrumbLink}>
          {categoryName}
        </Link>

        <img
          src={withBase('img/icons/vector.svg')}
          alt=""
          className={styles.separatorIcon}
        />

        <span className={styles.current}>{product.name}</span>
      </nav>

      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        <img
          src={withBase('img/icons/vector-left.svg')}
          alt="Back"
          className={styles.backIcon}
        />
        Back
      </button>

      <header className={styles.header}>
        <h1 className={styles.title}>{product.name}</h1>
      </header>

      <section className={styles.mainSection}>
        <div className={styles.imagesBlock}>
          <div className={styles.thumbs}>
            {product.images.map((img, index) => (
              <button
                key={img}
                type="button"
                className={
                  index === selectedImageIndex
                    ? styles.thumbButtonActive
                    : styles.thumbButton
                }
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={withBase(img)}
                  alt={product.name}
                  className={styles.thumbImage}
                />
              </button>
            ))}
          </div>

          <div className={styles.mainImageWrapper}>
            <img
              src={currentImage}
              alt={product.name}
              className={styles.mainImage}
            />
          </div>
        </div>

        <div className={styles.infoBlock}>
          <div className={styles.optionsHeader}>
            <div className={styles.optionGroup}>
              <span className={styles.optionLabel}>Available colors</span>

              <div className={styles.colors}>
                {product.colorsAvailable.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={
                      color === selectedColor
                        ? styles.colorButtonActive
                        : styles.colorButton
                    }
                    onClick={() => {
                      const nextId = buildProductId(
                        product.namespaceId,
                        selectedCapacity,
                        color,
                      );

                      navigate(`/product/${nextId}`);
                    }}
                  >
                    <span
                      className={styles.colorDot}
                      style={{ backgroundColor: color }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <span className={styles.productId}>ID: {product.id}</span>
          </div>

          <div className={styles.optionsBlock}>
            <div className={styles.optionGroup}>
              <span className={styles.optionLabel}>Select capacity</span>

              <div className={styles.capacities}>
                {product.capacityAvailable.map(capacity => (
                  <button
                    key={capacity}
                    type="button"
                    className={
                      capacity === selectedCapacity
                        ? styles.capacityButtonActive
                        : styles.capacityButton
                    }
                    onClick={() => {
                      const nextId = buildProductId(
                        product.namespaceId,
                        capacity,
                        selectedColor,
                      );

                      navigate(`/product/${nextId}`);
                    }}
                  >
                    {capacity}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.priceBlock}>
            <div className={styles.prices}>
              <span className={styles.price}>${product.priceDiscount}</span>
              <span className={styles.fullPrice}>${product.priceRegular}</span>
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.addToCartButton}
                disabled={isInCart}
                onClick={() => {
                  if (!productId || isInCart) {
                    return;
                  }

                  addToCart(productId, cardProduct);
                }}
              >
                {isInCart ? 'Added to cart' : 'Add to cart'}
              </button>

              <button
                type="button"
                className={styles.favouriteButton}
                onClick={() => toggleFavorite(cardProduct)}
                aria-label={
                  active ? 'Remove from favourites' : 'Add to favourites'
                }
              >
                {active ? (
                  <HeartRedIcon
                    className={`${styles.favIcon} ${styles.favIconFilled}`}
                  />
                ) : (
                  <HeartIcon
                    className={`${styles.favIcon} ${styles.favIconOutline}`}
                  />
                )}
              </button>
            </div>
          </div>

          <dl className={styles.specs}>
            <div className={styles.specItem}>
              <dt className={styles.specTitle}>Screen</dt>
              <dd className={styles.specValue}>{product.screen}</dd>
            </div>

            <div className={styles.specItem}>
              <dt className={styles.specTitle}>Resolution</dt>
              <dd className={styles.specValue}>{product.resolution}</dd>
            </div>

            <div className={styles.specItem}>
              <dt className={styles.specTitle}>Processor</dt>
              <dd className={styles.specValue}>{product.processor}</dd>
            </div>

            <div className={styles.specItem}>
              <dt className={styles.specTitle}>RAM</dt>
              <dd className={styles.specValue}>{product.ram}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={styles.bottomSections}>
        <div className={styles.aboutSection}>
          <div className={styles.aboutHeader}>
            <h2 className={styles.sectionTitle}>About</h2>
            <div className={styles.sectionDivider} />
          </div>

          <div className={styles.aboutContent}>
            {product.description.map(item => (
              <article key={item.title} className={styles.aboutItem}>
                <h3 className={styles.aboutItemTitle}>{item.title}</h3>
                <p className={styles.aboutItemText}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.techSection}>
          <div className={styles.techHeader}>
            <h2 className={styles.sectionTitle}>Tech specs</h2>
            <div className={styles.sectionDivider} />
          </div>

          <dl className={styles.techSpecs}>
            <div className={styles.specItem}>
              <dt className={styles.specTitle}>Screen</dt>
              <dd className={styles.specValue}>{product.screen}</dd>
            </div>

            <div className={styles.specItem}>
              <dt className={styles.specTitle}>Resolution</dt>
              <dd className={styles.specValue}>{product.resolution}</dd>
            </div>

            <div className={styles.specItem}>
              <dt className={styles.specTitle}>Processor</dt>
              <dd className={styles.specValue}>{product.processor}</dd>
            </div>

            <div className={styles.specItem}>
              <dt className={styles.specTitle}>RAM</dt>
              <dd className={styles.specValue}>{product.ram}</dd>
            </div>

            <div className={styles.specItem}>
              <dt className={styles.specTitle}>Camera</dt>
              <dd className={styles.specValue}>{product.camera}</dd>
            </div>

            <div className={styles.specItem}>
              <dt className={styles.specTitle}>Zoom</dt>
              <dd className={styles.specValue}>{product.zoom}</dd>
            </div>

            <div className={styles.specItem}>
              <dt className={styles.specTitle}>Cell</dt>
              <dd className={styles.specValue}>{product.cell.join(', ')}</dd>
            </div>
          </dl>
        </div>
      </section>

      {suggested.length > 0 && (
        <section className={styles.suggestedSection}>
          <div className={styles.suggestedHeader}>
            <h2 className={styles.suggestedTitle}>You may also like</h2>

            <div className={styles.suggestedControls}>
              <button
                type="button"
                className={styles.suggestedArrow}
                onClick={handleSuggestedPrev}
                aria-label="Previous"
                disabled={allProducts.length === 0}
              >
                ‹
              </button>

              <button
                type="button"
                className={styles.suggestedArrow}
                onClick={handleSuggestedNext}
                aria-label="Next"
                disabled={allProducts.length === 0}
              >
                ›
              </button>
            </div>
          </div>

          <div className={styles.sectionDividerTop} />

          <div className={styles.suggestedGrid}>
            {suggested.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
};
