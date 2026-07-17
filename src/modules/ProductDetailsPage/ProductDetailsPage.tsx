import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getProductDetails } from '../../api/products';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { ProductsSlider } from '../../components/ProductsSlider';
import { useStore } from '../../context/StoreContext';
import type { ProductDetails } from '../../types/ProductDetails';

import styles from './ProductDetailsPage.module.scss';

const categoryTitles = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const colorValues: Record<string, string> = {
  black: '#1f2020',
  blue: '#276787',
  coral: '#ee7762',
  gold: '#f5d5b5',
  graphite: '#5c5b57',
  green: '#5f7170',
  midnight: '#171e27',
  midnightgreen: '#4e5851',
  pink: '#faddd7',
  purple: '#d1cdda',
  red: '#ba0c2f',
  rosegold: '#e6c7c2',
  sierrablue: '#9fb5c9',
  silver: '#e2e3e4',
  skyblue: '#b7d6e8',
  spaceblack: '#2f3033',
  spacegray: '#4c4c4c',
  starlight: '#f6f0e5',
  white: '#f4f4f4',
  yellow: '#f3d060',
};

const getColorValue = (colorName: string) => {
  const normalizedColor = colorName.toLowerCase().replace(/[\s_-]+/g, '');

  return colorValues[normalizedColor] || '#b4bdc3';
};

const getImageSrc = (path: string) => {
  return `${import.meta.env.BASE_URL}${path}`;
};

const getIconSrc = (iconName: string) => {
  return `${import.meta.env.BASE_URL}img/icons/${iconName}`;
};

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();
  const navigate = useNavigate();

  const {
    products,
    isLoading: isProductsLoading,
    cart,
    favorites,
    addToCart,
    toggleFavorite,
  } = useStore();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [variants, setVariants] = useState<ProductDetails[]>([]);
  const [activeImage, setActiveImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestKey, setRequestKey] = useState(0);
  const [isVariantChanging, setIsVariantChanging] = useState(false);
  const hasLoadedProductRef = useRef(false);

  const catalogProduct = useMemo(() => {
    return products.find(item => item.itemId === productId);
  }, [productId, products]);

  useEffect(() => {
    let isRequestActive = true;

    if (isProductsLoading) {
      return () => {
        isRequestActive = false;
      };
    }

    if (!catalogProduct) {
      setProduct(null);
      setVariants([]);
      setActiveImage('');
      setError('');
      setIsLoading(false);
      setIsVariantChanging(false);
      hasLoadedProductRef.current = false;

      return () => {
        isRequestActive = false;
      };
    }

    if (!hasLoadedProductRef.current) {
      setIsLoading(true);
    }

    setError('');

    getProductDetails(catalogProduct.category, productId)
      .then(result => {
        if (!isRequestActive) {
          return;
        }

        setProduct(result.product);
        setVariants(result.variants);
        setActiveImage(result.product?.images[0] || '');
        setIsVariantChanging(false);
        hasLoadedProductRef.current = true;
      })
      .catch(() => {
        if (!isRequestActive) {
          return;
        }

        setProduct(null);
        setVariants([]);
        setActiveImage('');
        setError('Something went wrong while loading the product.');
        setIsVariantChanging(false);
        hasLoadedProductRef.current = false;
      })
      .finally(() => {
        if (isRequestActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isRequestActive = false;
    };
  }, [catalogProduct, isProductsLoading, productId, requestKey]);

  const suggestedProducts = useMemo(() => {
    if (!catalogProduct) {
      return [];
    }

    const availableProducts = products.filter(
      item => item.id !== catalogProduct.id,
    );

    for (let index = availableProducts.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));

      [availableProducts[index], availableProducts[randomIndex]] = [
        availableProducts[randomIndex],
        availableProducts[index],
      ];
    }

    return availableProducts.slice(0, 12);
  }, [catalogProduct, products]);

  const isInCart = catalogProduct ? Boolean(cart[catalogProduct.id]) : false;

  const isFavorite = catalogProduct
    ? favorites.includes(catalogProduct.id)
    : false;

  const findVariant = (capacity: string, color: string) => {
    return variants.find(variant => {
      return variant.capacity === capacity && variant.color === color;
    });
  };

  const handleCapacityChange = (capacity: string) => {
    if (!product) {
      return;
    }

    const variant =
      findVariant(capacity, product.color) ||
      variants.find(item => item.capacity === capacity);

    if (variant) {
      setIsVariantChanging(true);
      navigate(`/product/${variant.id}`);
    }
  };

  const handleColorChange = (color: string) => {
    if (!product) {
      return;
    }

    const variant =
      findVariant(product.capacity, color) ||
      variants.find(item => item.color === color);

    if (variant) {
      setIsVariantChanging(true);
      navigate(`/product/${variant.id}`);
    }
  };

  if (isProductsLoading || isLoading) {
    return (
      <section className={styles.page}>
        <div className={styles.content}>
          <Loader />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.page}>
        <div className={styles.content}>
          <div className={styles.message}>
            <p>{error}</p>

            <button
              type="button"
              className={styles.reloadButton}
              onClick={() => {
                setRequestKey(currentKey => currentKey + 1);
              }}
            >
              Reload
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!product || !catalogProduct) {
    return (
      <section className={styles.page}>
        <div className={styles.content}>
          <div className={styles.notFoundState}>
            <h1 className={styles.notFoundTitle}>Product was not found</h1>

            <img
              src={getImageSrc('img/product-not-found.png')}
              alt="Product was not found"
              className={styles.notFoundImage}
            />

            <p className={styles.notFoundText}>
              We could not find the product you are looking for.
            </p>

            <div className={styles.notFoundActions}>
              <button
                type="button"
                className={styles.notFoundBackButton}
                onClick={() => navigate(-1)}
              >
                <img src={getIconSrc('chevron-arrow-left.svg')} alt="" />
                Back
              </button>

              <Link to="/" className={styles.notFoundHomeLink}>
                Go to home page
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const categoryTitle = categoryTitles[product.category];

  return (
    <section className={styles.page}>
      <div className={styles.content}>
        <Breadcrumbs
          category={{
            title: categoryTitle,
            to: `/${product.category}`,
          }}
          currentPage={product.name}
        />

        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          <img src={getIconSrc('chevron-arrow-left.svg')} alt="" />
          Back
        </button>

        <h1 className={styles.title}>{product.name}</h1>

        <div className={styles.productMain}>
          <div
            className={`${styles.gallery} ${
              isVariantChanging ? styles.variantChanging : ''
            }`}
          >
            <div className={styles.thumbnails}>
              {product.images.map(image => (
                <button
                  key={image}
                  type="button"
                  className={`${styles.thumbnailButton} ${
                    activeImage === image ? styles.thumbnailButtonActive : ''
                  }`}
                  aria-label={`Show ${product.name}`}
                  onClick={() => setActiveImage(image)}
                >
                  <img
                    src={getImageSrc(image)}
                    alt=""
                    className={styles.thumbnail}
                  />
                </button>
              ))}
            </div>

            <div className={styles.mainImageWrapper}>
              <img
                key={activeImage}
                src={getImageSrc(activeImage)}
                alt={product.name}
                className={styles.mainImage}
              />
            </div>
          </div>

          <div
            className={`${styles.configuration} ${
              isVariantChanging ? styles.variantChanging : ''
            }`}
          >
            <fieldset className={styles.optionBlock}>
              <legend className={styles.optionLabel}>Available colors</legend>

              <div className={styles.colors}>
                {product.colorsAvailable.map(color => {
                  const variant =
                    findVariant(product.capacity, color) ||
                    variants.find(item => item.color === color);

                  const isSelected = product.color === color;

                  return (
                    <label
                      key={color}
                      title={color}
                      className={styles.colorOption}
                    >
                      <input
                        type="radio"
                        name="product-color"
                        value={color}
                        className={styles.colorInput}
                        checked={isSelected}
                        disabled={!variant}
                        onChange={() => handleColorChange(color)}
                      />

                      <span
                        className={styles.colorControl}
                        style={
                          {
                            '--product-color': getColorValue(color),
                          } as CSSProperties
                        }
                      />

                      <span className={styles.visuallyHidden}>{color}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className={styles.divider} />

            <fieldset className={styles.optionBlock}>
              <legend className={styles.optionLabel}>Select capacity</legend>

              <div className={styles.capacities}>
                {product.capacityAvailable.map(capacity => {
                  const variant =
                    findVariant(capacity, product.color) ||
                    variants.find(item => item.capacity === capacity);

                  const isSelected = product.capacity === capacity;

                  return (
                    <label key={capacity} className={styles.capacityOption}>
                      <input
                        type="radio"
                        name="product-capacity"
                        value={capacity}
                        className={styles.capacityInput}
                        checked={isSelected}
                        disabled={!variant}
                        onChange={() => handleCapacityChange(capacity)}
                      />

                      <span className={styles.capacityControl}>{capacity}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className={styles.priceBlock}>
              <span className={styles.price}> ${product.priceDiscount}</span>

              <span className={styles.regularPrice}>
                ${product.priceRegular}
              </span>
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={`${styles.addButton} ${
                  isInCart ? styles.addButtonActive : ''
                }`}
                onClick={() => addToCart(catalogProduct.id)}
              >
                {isInCart ? 'Added to cart' : 'Add to cart'}
              </button>

              <button
                type="button"
                className={`${styles.favoriteButton} ${
                  isFavorite ? styles.favoriteButtonActive : ''
                }`}
                aria-label={
                  isFavorite ? 'Remove from favorites' : 'Add to favorites'
                }
                aria-pressed={isFavorite}
                onClick={() => toggleFavorite(catalogProduct.id)}
              >
                <img
                  src={getIconSrc(
                    isFavorite ? 'heart-filled.svg' : 'heart.svg',
                  )}
                  alt=""
                />
              </button>
            </div>

            <dl className={styles.shortSpecs}>
              <div>
                <dt>Screen</dt>
                <dd>{product.screen}</dd>
              </div>

              <div>
                <dt>Resolution</dt>
                <dd>{product.resolution}</dd>
              </div>

              <div>
                <dt>Processor</dt>
                <dd>{product.processor}</dd>
              </div>

              <div>
                <dt>RAM</dt>
                <dd>{product.ram}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className={styles.information}>
          <section className={styles.about}>
            <h2 className={styles.sectionTitle}>About</h2>

            {product.description.map(descriptionSection => (
              <article
                key={descriptionSection.title}
                className={styles.description}
              >
                <h3>{descriptionSection.title}</h3>

                {descriptionSection.text.map(paragraph => (
                  <p key={`${descriptionSection.title}-${paragraph}`}>
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </section>

          <section className={styles.techSpecs}>
            <h2 className={styles.sectionTitle}>Tech specs</h2>

            <dl className={styles.specificationList}>
              <div>
                <dt>Screen</dt>
                <dd>{product.screen}</dd>
              </div>

              <div>
                <dt>Resolution</dt>
                <dd>{product.resolution}</dd>
              </div>

              <div>
                <dt>Processor</dt>
                <dd>{product.processor}</dd>
              </div>

              <div>
                <dt>RAM</dt>
                <dd>{product.ram}</dd>
              </div>

              <div>
                <dt>Built in memory</dt>
                <dd>{product.capacity}</dd>
              </div>

              {product.camera && (
                <div>
                  <dt>Camera</dt>
                  <dd>{product.camera}</dd>
                </div>
              )}

              {product.zoom && (
                <div>
                  <dt>Zoom</dt>
                  <dd>{product.zoom}</dd>
                </div>
              )}

              <div>
                <dt>Cell</dt>
                <dd>{product.cell.join(', ')}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>

      <ProductsSlider title="You may also like" products={suggestedProducts} />
    </section>
  );
};
