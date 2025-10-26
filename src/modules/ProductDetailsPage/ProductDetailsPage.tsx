import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import cn from "classnames";
import { getProductByIdFromCategory, getProductById, getSuggestedProducts } from "../../api/products";
import { ProductDetails } from "../../types/ProductDetails";
import { Product } from "../../types/Product";
import { Button, ProductSlider, Loader } from "../shared";
import { Icon } from "../shared/components/Icon/Icon";
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
  const navigate = useNavigate();
  const { product } = useParams();
  const { state } = useLocation();
  const { t } = useTranslation();

  // Context hooks
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  // State
  const [productDetails, setProductDetails] = React.useState<ProductDetails | null>(null);
  const [suggestedProducts, setSuggestedProducts] = React.useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

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

    // If we have category from state, use it for faster lookup
    if (state?.category) {
      getProductByIdFromCategory(state.category, product)
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
      getProductById(product)
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
  }, [product, state?.category]);

  React.useEffect(() => {
    getSuggestedProducts().then(setSuggestedProducts);
  }, []);

  // Navigation handlers
  const handleColorChange = (newColor: string) => {
    if (!productDetails) return;

    const newProductId = `${productDetails.namespaceId}-${productDetails.capacity.toLowerCase()}-${newColor.toLowerCase()}`;

    navigate(`/product/${newProductId}`, {
      state: { category: state?.category },
      replace: true
    });
  };

  const handleCapacityChange = (newCapacity: string) => {
    if (!productDetails) return;

    const newProductId = `${productDetails.namespaceId}-${newCapacity.toLowerCase()}-${productDetails.color.toLowerCase()}`;

    navigate(`/product/${newProductId}`, {
      state: { category: state?.category },
      replace: true
    });
  };

  // Cart and favorites handlers
  const handleCartClick = () => {
    if (!productDetails) return;

    if (isProductInCart) {
      removeFromCart(productDetails.id);
    } else {
      addToCart(convertToProduct(productDetails));
    }
  };

  const handleFavoriteClick = () => {
    if (!productDetails) return;

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
        <Button variant="icon" onClick={handleBackClick}>
          <Icon name="arrow-left" />
          <span>Back</span>
        </Button>
      </div>

      <h1 className={styles['product-details__title']}>{productDetails.name}</h1>

      <div className={styles['product-details__content']}>
        <div className={styles['product-details__gallery']}>
          <img
            className={styles['product-details__main-image']}
            src={selectedImage}
            alt={productDetails.name}
          />
          <ul className={styles['product-details__thumbnails']}>
            {productDetails.images.map((imgUrl, index) => (
              <li key={index} className={styles['product-details__thumbnail-item']}>
                <button
                  type="button"
                  className={cn(
                    styles['product-details__thumbnail-button'],
                    { [styles['product-details__thumbnail-button--active']]: selectedImage === imgUrl }
                  )}
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
              <h3 className={styles['product-details__section-title']}>Available colors</h3>
              <p className={styles['product-details__product-id']}>ID: {productDetails.id}</p>
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
                      styles[`product-details__color-button--${color.toLowerCase()}`],
                      { [styles['product-details__color-button--active']]: productDetails.color === color }
                    )}
                    aria-label={`Select ${color} color`}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className={styles['product-details__section']}>
            <h3 className={styles['product-details__section-title']}>Select capacity</h3>
            <ul className={styles['product-details__capacity-list']}>
              {productDetails.capacityAvailable.map((capacity, index) => (
                <li key={index} className={styles['product-details__capacity-item']}>
                  <button
                    type="button"
                    className={cn(
                      styles['product-details__capacity-button'],
                      { [styles['product-details__capacity-button--active']]: productDetails.capacity === capacity }
                    )}
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
            <p className={styles['product-details__price']}>${productDetails.priceRegular}</p>
            {productDetails.priceDiscount && (
              <p className={styles['product-details__price-old']}>${productDetails.priceDiscount}</p>
            )}
          </div>

          <div className={styles['product-details__actions']}>
            <Button onClick={handleCartClick}>{isProductInCart ? 'Remove from Cart' : 'Add to Cart'}</Button>
            <Button onClick={handleFavoriteClick} variant="icon">
              <Icon name='like' color={isProductFavorite ? 'red' : ''} />
            </Button>
          </div>
        </div>

        <section className={styles['product-details__about']}>
          <h2 className={styles['product-details__section-title']}>About</h2>
          <div className={styles['product-details__about-content']}>
            {productDetails.description.map(({ title, text }, index) => (
              <div key={index} className={styles['product-details__about-item']}>
                <h3 className={styles['product-details__about-subtitle']}>{title}</h3>
                {text.map((desc, descIndex) => (
                  <p key={descIndex} className={styles['product-details__about-text']}>{desc}</p>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className={styles['product-details__specs']}>
          <h2 className={styles['product-details__section-title']}>Tech specs</h2>
          <dl className={styles['product-details__specs-info']}>

            {Object.entries(getProductSpecs(productDetails)).map(([specName, specValue]) => (
              <div key={specName} className={styles['product-details__specs-info-row']}>
                <dt className={styles['product-details__specs-info-label']}>{specName}</dt>
                <dd className={styles['product-details__specs-info-value']}>{Array.isArray(specValue) ? specValue.join(', ') : specValue}</dd>
              </div>
            ))}

          </dl>
        </section>

      </div>

      {suggestedProducts.length > 0 && (
        <ProductSlider title="You may also like" products={suggestedProducts} />
      )}
    </div>
  );
};
