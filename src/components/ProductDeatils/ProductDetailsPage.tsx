import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductDetails';
import {
  getAllProducts,
  getProductById,
  getProductVariants,
  getSuggestedProducts,
} from '../../api';
import styles from './ProductDetails.module.scss';
import homeIcon from '../ProductCard/components/img/Home.png';
// eslint-disable-next-line max-len
import arrowRight from '../CatalogPage/components/img/arrow-right.png';
import arrowRight__slider from './components/img/arrow-right-slider.png';
// eslint-disable-next-line max-len
import arrowLeft from './components/img/arrow-left.png';
import favouritesIcon from '../Header/components/img/favourites.png';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
// eslint-disable-next-line max-len
import favoritedActive from '../ProductCard/components/img/favorited-active.png';
import { Loader } from '../Loader/Loader';
import { getAssetUrl } from '../../utils/getAssetUrl';

const colorMap: Record<string, string> = {
  black: '#111111',
  blue: '#4f6d8a',
  coral: '#ff7f50',
  gold: '#f1dac4',
  graphite: '#4f4f57',
  green: '#7d9d8b',
  midnight: '#1f2433',
  midnightgreen: '#56645a',
  pink: '#f3c7cf',
  purple: '#b39ddb',
  red: '#c62828',
  rosegold: '#d9a6a0',
  sierrablue: '#9db7d5',
  silver: '#f1f2f6',
  spaceblack: '#232323',
  spacegray: '#535150',
  white: '#fafafa',
  yellow: '#f3d250',
};

const categoryLabels: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const normalizeColorName = (color: string) =>
  color.charAt(0).toUpperCase() + color.slice(1).replace(/([A-Z])/g, ' $1');

export const ProductDetailsPage = () => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [productVariants, setProductVariants] = useState<ProductDetails[]>([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const updateScrollButtons = () => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    setCanScrollLeft(slider.scrollLeft > 0);
    setCanScrollRight(
      slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 1,
    );
  };

  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: 'left' | 'right') => {
    const slider = sliderRef.current;
    const track = slider?.querySelector<HTMLElement>(`.${styles.track}`);
    const card = track?.firstElementChild as HTMLElement | null;
    const gap = track ? parseInt(getComputedStyle(track).gap, 10) : 16;
    const scrollAmount = (card?.offsetWidth || 212) + gap;

    slider?.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });

    setTimeout(updateScrollButtons, 300);
  };

  useEffect(() => {
    updateScrollButtons();
  }, [recommendedProducts]);

  const { productId } = useParams();

  useEffect(() => {
    if (!product) {
      return;
    }

    getAllProducts().then(products => {
      const current = products.find(item => item.itemId === product.id) || null;

      setCurrentProduct(current);
    });

    getSuggestedProducts(product.id).then(suggestedProducts => {
      setRecommendedProducts(suggestedProducts);
    });
  }, [product]);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setProduct(null);
    setIsLoading(true);
    setHasError(false);

    getProductById(productId)
      .then(data => {
        if (!data) {
          setProduct(null);

          return;
        }

        setProduct(data);
        setSelectedImage(data.images[0] || '');

        getProductVariants(data.category, data.namespaceId)
          .then(variants => {
            setProductVariants(variants);
          })
          .catch(() => {
            setProductVariants([]);
          });
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <>
        <p>Something went wrong...</p>

        <button type="button" onClick={() => window.location.reload()}>
          Reload
        </button>
      </>
    );
  }

  if (!product) {
    return <p>Product was not found</p>;
  }

  const currentImage = selectedImage || product.images[0];
  const productCode = product.id.slice(-6).toUpperCase();

  const getVariantByOptions = (color: string, capacity: string) =>
    productVariants.find(
      variant => variant.color === color && variant.capacity === capacity,
    );

  const isProductInCart = currentProduct
    ? isInCart(currentProduct.itemId)
    : false;

  const isProductFavorite = currentProduct
    ? isFavorite(currentProduct.itemId)
    : false;

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link to="/" className={styles.breadcrumbHome} aria-label="Home">
          <img className={styles.breadcrumbIcon} src={homeIcon} alt="Home" />
        </Link>

        <img
          className={styles.breadcrumbSeparator}
          src={arrowRight}
          alt="arrowRight"
        />

        <Link to={`/${product.category}`} className={styles.breadcrumbLink}>
          {categoryLabels[product.category] || product.category}
        </Link>

        <img
          className={styles.breadcrumbSeparator}
          src={arrowRight}
          alt="arrowRight"
        />

        <span className={styles.breadcrumbCurrent} title={product.name}>
          {product.name}
        </span>
      </nav>

      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.backButton}
      >
        <img
          src={arrowLeft}
          className={styles.backButton__icon}
          alt="arrowLeft"
        />
        Back
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      <section className={styles.phoneCard}>
        <div className={styles.gallery}>
          <div className={styles.mainImageWrap}>
            <img
              src={getAssetUrl(currentImage)}
              alt={product.name}
              className={styles.mainImage}
            />
          </div>

          <div className={styles.thumbnails}>
            {product.images.map(image => (
              <button
                key={image}
                type="button"
                className={`${styles.thumbnailButton} ${currentImage === image ? styles.thumbnailButtonActive : ''}`}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={getAssetUrl(image)}
                  alt={product.name}
                  className={styles.thumbnailImage}
                />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.productInfo}>
          <div className={styles.optionsRow}>
            <div>
              <p className={styles.optionLabel}>Available colors</p>
              <div className={styles.colors}>
                {product.colorsAvailable.map(color => {
                  const colorVariant = getVariantByOptions(
                    color,
                    product.capacity,
                  );

                  if (!colorVariant) {
                    return null;
                  }

                  return (
                    <label key={color} className={styles.colorLabel}>
                      <input
                        className={styles.radioInput}
                        type="radio"
                        name="color"
                        value={color}
                        checked={product.color === color}
                        onChange={() => navigate(`/product/${colorVariant.id}`)}
                        aria-label={normalizeColorName(color)}
                      />

                      <span
                        className={`${styles.colorButton} ${
                          product.color === color
                            ? styles.colorButtonActive
                            : ''
                        }`}
                        style={
                          {
                            '--swatch-color': colorMap[color] || color,
                          } as CSSProperties
                        }
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <p className={styles.productId}>ID: {productCode}</p>
          </div>
          <div className={styles.divider} />
          <div>
            <p className={styles.optionLabel}>Select capacity</p>
            <div className={styles.capacities}>
              {product.capacityAvailable.map(capacity => {
                const capacityVariant = getVariantByOptions(
                  product.color,
                  capacity,
                );

                if (!capacityVariant) {
                  return null;
                }

                return (
                  <label key={capacity} className={styles.capacityLabel}>
                    <input
                      className={styles.radioInput}
                      type="radio"
                      name="capacity"
                      value={capacity}
                      checked={product.capacity === capacity}
                      onChange={() =>
                        navigate(`/product/${capacityVariant.id}`)
                      }
                    />

                    <span
                      className={`${styles.capacityButton} ${
                        product.capacity === capacity
                          ? styles.capacityButtonActive
                          : ''
                      }`}
                    >
                      {capacity}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className={styles.priceBlock}>
            <span className={styles.discountPrice}>
              ${product.priceDiscount}
            </span>
            <span className={styles.regularPrice}>${product.priceRegular}</span>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.addToCart} ${
                isProductInCart ? styles.addToCartActive : ''
              }`}
              onClick={() => currentProduct && addToCart(currentProduct)}
              disabled={!currentProduct || isProductInCart}
            >
              {isProductInCart ? 'Added to cart' : 'Add to cart'}
            </button>
            <button
              type="button"
              className={`${styles.favoriteButton} ${
                isProductFavorite ? styles.favoriteButtonActive : ''
              }`}
              aria-label="Add to favourites"
              onClick={() => currentProduct && toggleFavorite(currentProduct)}
              disabled={!currentProduct}
            >
              <img
                src={isProductFavorite ? favoritedActive : favouritesIcon}
                alt=""
                className={styles.favoriteButtonIcon}
              />
            </button>
          </div>
          <div className={styles.specs}>
            <div className={styles.specRow}>
              <span className={styles.specName}>Screen</span>
              <span className={styles.specValue}>{product.screen}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>Resolution</span>
              <span className={styles.specValue}>{product.resolution}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>Processor</span>
              <span className={styles.specValue}>{product.processor}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>RAM</span>
              <span className={styles.specValue}>{product.ram}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>Built in memory</span>
              <span className={styles.specValue}>{product.capacity}</span>
            </div>
            {product.camera && (
              <div className={styles.specRow}>
                <span className={styles.specName}>Camera</span>
                <span className={styles.specValue}>{product.camera}</span>
              </div>
            )}
            {product.zoom && (
              <div className={styles.specRow}>
                <span className={styles.specName}>Zoom</span>
                <span className={styles.specValue}>{product.zoom}</span>
              </div>
            )}
            <div className={styles.specRow}>
              <span className={styles.specName}>Cell</span>
              <span className={styles.specValue}>
                {product.cell.join(', ')}
              </span>
            </div>
          </div>
        </div>

        <p className={styles.productIdDekstop}>ID: {productCode}</p>

        <div className={styles.about}>
          <h2 className={styles.sectionTitle}>About</h2>
          {product.description.map(section => (
            <div key={section.title} className={styles.descriptionBlock}>
              <h3 className={styles.descriptionTitle}>{section.title}</h3>
              {section.text.map(paragraph => (
                <p key={paragraph} className={styles.descriptionText}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.techSpecs}>
          <h2 className={styles.sectionTitle}>Tech specs</h2>

          <div className={styles.specs}>
            <div className={styles.specRow}>
              <span className={styles.specName}>Screen</span>
              <span className={styles.specValue}>{product.screen}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>Resolution</span>
              <span className={styles.specValue}>{product.resolution}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>Processor</span>
              <span className={styles.specValue}>{product.processor}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>RAM</span>
              <span className={styles.specValue}>{product.ram}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>Built in memory</span>
              <span className={styles.specValue}>{product.capacity}</span>
            </div>
            {product.camera && (
              <div className={styles.specRow}>
                <span className={styles.specName}>Camera</span>
                <span className={styles.specValue}>{product.camera}</span>
              </div>
            )}
            {product.zoom && (
              <div className={styles.specRow}>
                <span className={styles.specName}>Zoom</span>
                <span className={styles.specValue}>{product.zoom}</span>
              </div>
            )}
            <div className={styles.specRow}>
              <span className={styles.specName}>Cell</span>
              <span className={styles.specValue}>
                {product.cell.join(', ')}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.slider}>
        <div className={styles.slider__top}>
          <h2 className={styles.slider__title}>You may also like</h2>
          <div className={styles.slider__buttons}>
            <button
              type="button"
              className={styles.slider__arrow}
              onClick={() => scrollSlider('left')}
              disabled={!canScrollLeft}
            >
              <img
                className={styles.slider__arrow__img}
                src={arrowLeft}
                alt="arrowleft"
              />
            </button>
            <button
              type="button"
              className={styles.slider__arrow}
              onClick={() => scrollSlider('right')}
              disabled={!canScrollRight}
            >
              <img
                className={styles.slider__arrow__img}
                src={arrowRight__slider}
                alt="arrowRight"
              />
            </button>
          </div>
        </div>

        <div
          className={styles.viewport}
          ref={sliderRef}
          onScroll={updateScrollButtons}
        >
          <div className={styles.track}>
            {recommendedProducts.map(recommendedProduct => (
              <ProductCard
                key={recommendedProduct.id}
                product={recommendedProduct}
                variant="slider"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
