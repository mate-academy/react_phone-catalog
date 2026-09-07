import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import cn from 'classnames';
import {
  getProductByIdFromCategory,
  getProductById,
  getSuggestedProducts,
  getProductCodeById,
} from '../../api/products';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { Button, ProductSlider, Loader } from '../shared';
import { Icon } from '../shared/components/Icon/Icon';
import { useCart, useFavorites } from '../../contexts';
import { useTranslation } from 'react-i18next';
import styles from './ProductDetailsPage.module.scss';

// Helper function to extract tech specs from product details
const getProductSpecs = (product: ProductDetails) => {
  const {
    id,
    category,
    namespaceId,
    name,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    colorsAvailable,
    color,
    images,
    description,
    ...specs
  } = product;

  return specs;
};

const getShortSpec = (product: ProductDetails) => {
  return {
    Screen: product.screen,
    Resolution: product.resolution,
    Processor: product.processor,
    RAM: product.ram,
  };
};

// Helper function to convert ProductDetails to Product type
const convertToProduct = (productDetails: ProductDetails): Product => ({
  id: 0, // Not used anymore, itemId is the key
  itemId: productDetails.id,
  category: productDetails.category,
  name: productDetails.name,
  fullPrice: productDetails.priceRegular,
  price: productDetails.priceDiscount,
  screen: productDetails.screen,
  capacity: productDetails.capacity,
  color: productDetails.color,
  ram: productDetails.ram,
  year: new Date().getFullYear(),
  image: productDetails.images[0] || '',
});

export const ProductDetailsPage: React.FC = () => {
  // Router hooks
  const { product } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Translation hook
  const { t } = useTranslation();

  // Context hooks
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  // State
  const [productDetails, setProductDetails] =
    React.useState<ProductDetails | null>(null);
  const [suggestedProducts, setSuggestedProducts] = React.useState<Product[]>(
    [],
  );
  const [selectedImage, setSelectedImage] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [productIdDisplay, setProductIdDisplay] = React.useState<string>('');

  // Derived state
  const isProductInCart = isInCart(productDetails?.id || '');
  const isProductFavorite = isFavorite(productDetails?.id || '');

  // Effects
  React.useEffect(() => {
    if (!product) {
      setIsLoading(false);

      return;
    }

    setIsLoading(true);

    // Decode URL parameter and normalize spaces to dashes
    const decodedProductId = decodeURIComponent(product).replace(/\s+/g, '-');

    // If we have category from state, use it for faster lookup
    if (location.state?.category) {
      getProductByIdFromCategory(location.state.category, decodedProductId)
        .then(productData => {
          setProductDetails(productData || null);
          if (productData) {
            setSelectedImage(productData.images[0]);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // Otherwise, search in all categories
      getProductById(decodedProductId)
        .then(productData => {
          setProductDetails(productData || null);
          if (productData) {
            setSelectedImage(productData.images[0]);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [product, location.state?.category]);

  React.useEffect(() => {
    getSuggestedProducts().then(setSuggestedProducts);
  }, []);

  // Load product ID display when productDetails changes
  React.useEffect(() => {
    if (productDetails) {
      getProductCodeById(productDetails.id).then(code => {
        setProductIdDisplay(code || productDetails.id);
      });
    }
  }, [productDetails]);

  // Helper function to normalize color/capacity for URL
  const normalizeForUrl = (value: string): string => {
    return value.toLowerCase().replace(/\s+/g, '-');
  };

  // Navigation handlers
  const handleColorChange = (newColor: string) => {
    if (!productDetails) {
      return;
    }

    const normalizedCapacity = normalizeForUrl(productDetails.capacity);
    const normalizedColor = normalizeForUrl(newColor);
    const newProductId = `${productDetails.namespaceId}-${normalizedCapacity}-${normalizedColor}`;

    const categoryForPath = location.state?.category || productDetails.category;

    navigate(`/${categoryForPath}/${newProductId}`, {
      state: { category: categoryForPath },
      replace: true,
    });
  };

  const handleCapacityChange = (newCapacity: string) => {
    if (!productDetails) {
      return;
    }

    const normalizedCapacity = normalizeForUrl(newCapacity);
    const normalizedColor = normalizeForUrl(productDetails.color);
    const newProductId = `${productDetails.namespaceId}-${normalizedCapacity}-${normalizedColor}`;

    const categoryForPath = location.state?.category || productDetails.category;

    navigate(`/${categoryForPath}/${newProductId}`, {
      state: { category: categoryForPath },
      replace: true,
    });
  };

  // Cart and favorites handlers
  const handleCartClick = () => {
    if (!productDetails) {
      return;
    }

    if (isProductInCart) {
      removeFromCart(productDetails.id);
    } else {
      addToCart(convertToProduct(productDetails));
    }
  };

  const handleFavoriteClick = () => {
    if (!productDetails) {
      return;
    }

    toggleFavorite(convertToProduct(productDetails));
  };

  // Back button handler
  const handleBackClick = () => {
    navigate(-1);
  };

  // Image selection handler
  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!productDetails) {
    return (
      <div className={styles['product-details__not-found']}>
        <div className={styles['product-details__not-found-content']}>
          <h1 className={styles['product-details__not-found-title']}>
            {t('product.notFound')}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className={styles['product-details__not-found-button']}
          >
            {t('common.back')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['product-details']}>
      <div className={styles['product-details__back']}>
        <Button noBorder variant="icon" onClick={handleBackClick}>
          <Icon name="arrow-left" />
          <span>Back</span>
        </Button>
      </div>

      <h1 className={styles['product-details__title']}>
        {productDetails.name}
      </h1>

      <div className={styles['product-details__content']}>
        <div className={styles['product-details__gallery']}>
          <img
            className={styles['product-details__main-image']}
            src={selectedImage}
            alt={productDetails.name}
          />
          <ul className={styles['product-details__thumbnails']}>
            {productDetails.images.map((imgUrl, index) => (
              <li
                key={index}
                className={styles['product-details__thumbnail-item']}
              >
                <button
                  type="button"
                  className={cn(styles['product-details__thumbnail-button'], {
                    [styles['product-details__thumbnail-button--active']]:
                      selectedImage === imgUrl,
                  })}
                  onClick={() => handleImageSelect(imgUrl)}
                >
                  <img
                    className={styles['product-details__thumbnail']}
                    src={imgUrl}
                    alt={`${productDetails.name} view ${index + 1}`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles['product-details__info']}>
          <div className={styles['product-details__section']}>
            <div className={styles['product-details__section-header']}>
              <h3 className={styles['product-details__section-options-title']}>
                Available colors
              </h3>
              <p className={styles['product-details__product-id']}>
                ID: {productIdDisplay}
              </p>
            </div>
            <ul className={styles['product-details__color-list']}>
              {productDetails.colorsAvailable.map((color, index) => (
                <li
                  key={index}
                  className={styles['product-details__color-item']}
                >
                  <button
                    type="button"
                    title={color}
                    onClick={() => handleColorChange(color)}
                    className={cn(
                      styles['product-details__color-button'],
                      styles[
                        `product-details__color-button--${color.toLowerCase()}`
                      ],
                      {
                        [styles['product-details__color-button--active']]:
                          productDetails.color === color,
                      },
                    )}
                    aria-label={`Select ${color} color`}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className={styles['product-details__section']}>
            <h3 className={styles['product-details__section-options-title']}>
              Select capacity
            </h3>
            <ul className={styles['product-details__capacity-list']}>
              {productDetails.capacityAvailable.map((capacity, index) => (
                <li
                  key={index}
                  className={styles['product-details__capacity-item']}
                >
                  <button
                    type="button"
                    className={cn(styles['product-details__capacity-button'], {
                      [styles['product-details__capacity-button--active']]:
                        productDetails.capacity === capacity,
                    })}
                    onClick={() => handleCapacityChange(capacity)}
                    aria-label={`Select ${capacity} capacity`}
                  >
                    {capacity}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles['product-details__pricing']}>
            <p className={styles['product-details__price']}>
              ${productDetails.priceRegular}
            </p>
            {productDetails.priceDiscount && (
              <p className={styles['product-details__price-old']}>
                ${productDetails.priceDiscount}
              </p>
            )}
          </div>

          <div className={styles['product-details__actions']}>
            <Button fullWidth size="lg" onClick={handleCartClick}>
              {isProductInCart
                ? t('product.removeFromCart')
                : t('product.addToCart')}
            </Button>
            <Button size="lg" onClick={handleFavoriteClick} variant="icon">
              <Icon name="like" color={isProductFavorite ? 'red' : ''} />
            </Button>
          </div>
          <div className="short-spec">
            <dl className={styles['product-details__specs-info']}>
              {Object.entries(getShortSpec(productDetails)).map(
                ([specName, specValue]) => (
                  <div
                    key={specName}
                    className={styles['product-details__specs-info-row']}
                  >
                    <dt className={styles['product-details__specs-info-label']}>
                      {specName}
                    </dt>
                    <dd className={styles['product-details__specs-info-value']}>
                      {Array.isArray(specValue)
                        ? specValue.join(', ')
                        : specValue}
                    </dd>
                  </div>
                ),
              )}
            </dl>
          </div>
        </div>

        <section className={styles['product-details__about']}>
          <h2 className={styles['product-details__section-title']}>About</h2>
          <div className={styles['product-details__about-content']}>
            {productDetails.description.map(({ title, text }, index) => (
              <div
                key={index}
                className={styles['product-details__about-item']}
              >
                <h3 className={styles['product-details__about-subtitle']}>
                  {title}
                </h3>
                {text.map((desc, descIndex) => (
                  <p
                    key={descIndex}
                    className={styles['product-details__about-text']}
                  >
                    {desc}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className={styles['product-details__specs']}>
          <h2 className={styles['product-details__section-title']}>
            Tech specs
          </h2>
          <dl className={styles['product-details__specs-info']}>
            {Object.entries(getProductSpecs(productDetails)).map(
              ([specName, specValue]) => (
                <div
                  key={specName}
                  className={styles['product-details__specs-info-row']}
                >
                  <dt className={styles['product-details__specs-info-label']}>
                    {specName}
                  </dt>
                  <dd className={styles['product-details__specs-info-value']}>
                    {Array.isArray(specValue)
                      ? specValue.join(', ')
                      : specValue}
                  </dd>
                </div>
              ),
            )}
          </dl>
        </section>
      </div>

      {suggestedProducts.length > 0 && (
        <ProductSlider
          title={t('product.youMayLike')}
          products={suggestedProducts}
        />
      )}
    </div>
  );
};
