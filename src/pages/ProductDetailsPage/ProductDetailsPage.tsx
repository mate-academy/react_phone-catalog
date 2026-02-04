import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './ProductDetailsPage.module.scss';
import { Phone } from '../../types/Phone';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { NotFoundPage } from '../NotFoundPage';
import { getProductColor } from '../../constants/colors';
/* eslint-disable max-len */
import { SuggestedProductsSlider } from '../../components/SuggestedProductsSlider';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { fetchWithDelay } from '../../api/fetchWithDelay';

import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import 'yet-another-react-lightbox/styles.css';

export const ProductDetailsPage = () => {
  const { t } = useTranslation();
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { cartItems, addToCart } = useCart();
  const [product, setProduct] = useState<Phone | null>(null);
  const [productInfo, setProductInfo] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // for swipe functionality on mobile
  const [swipeStartX, setSwipeStartX] = useState<number | null>(null);
  const [swipeEndX, setSwipeEndX] = useState<number | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(false);

        const productsResponse = await fetchWithDelay('/api/products.json');
        const allProducts: Product[] = await productsResponse.json();
        const productFromList = allProducts.find(p => p.itemId === productId);

        if (!productFromList) {
          setError(true);
          setLoading(false);

          return;
        }

        setProductInfo(productFromList);

        const category = productFromList.category;
        const detailsResponse = await fetchWithDelay(`/api/${category}.json`);
        const categoryProducts: Phone[] = await detailsResponse.json();
        const detailedProduct = categoryProducts.find(p => p.id === productId);

        if (detailedProduct) {
          setProduct(detailedProduct);
          setSelectedColor(detailedProduct.color);
          setSelectedCapacity(detailedProduct.capacity);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleColorChange = (color: string) => {
    if (!product) {
      return;
    }

    const newProductId = product.id.replace(`-${product.color}`, `-${color}`);

    navigate(`/product/${newProductId}`);
  };

  const handleCapacityChange = (capacity: string) => {
    if (!product) {
      return;
    }

    const currentCapacity = product.capacity.toLowerCase();
    const newCapacity = capacity.toLowerCase();
    const newProductId = product.id.replace(currentCapacity, newCapacity);

    navigate(`/product/${newProductId}`);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setSwipeEndX(null);
    setSwipeStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setSwipeEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!swipeStartX || !swipeEndX || !product) {
      return;
    }

    const swipeDistance = swipeStartX - swipeEndX;

    if (swipeDistance > 60 && selectedImage < product.images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }

    if (swipeDistance < -60 && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const isFavorite = favorites.find(fav => fav.id === product?.id);
  const isInCart = cartItems.some(item => item.phone.id === product?.id);

  const handleFavoriteClick = () => {
    if (!product) {
      return;
    }

    if (isFavorite) {
      removeFromFavorites(product);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToCartClick = () => {
    if (!product || isInCart) {
      return;
    }

    addToCart(product);
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !product) {
    return <NotFoundPage title={t('product.notFound')} />;
  }

  const category = product.category as 'phones' | 'tablets' | 'accessories';

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumbLink}>
          <img
            src="/img/Home_breadcrumb.svg"
            alt={t('icons.homeAlt')}
            className={styles.homeIcon}
          />
        </Link>
        <img
          src="/img/arrow_right_gray.svg"
          alt={t('icons.arrowRightAlt')}
          className={styles.arrow}
        />
        <Link to={`/${category}`} className={styles.breadcrumbLink}>
          {t(`nav.${category}`)}
        </Link>
        <img
          src="/img/arrow_right_gray.svg"
          alt={t('icons.arrowRightAlt')}
          className={styles.arrow}
        />
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </div>

      <button onClick={() => navigate(-1)} className={styles.backButton}>
        <img src="/img/arrow_left.svg" alt={t('icons.backAlt')} />
        {t('common.back')}
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.content}>
        <div
          className={styles.gallery}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.thumbnails}>
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`${styles.thumbnail} ${
                  selectedImage === index ? styles.thumbnailActive : ''
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={`/${image}`} alt={`${product.name} ${index + 1}`} />
              </button>
            ))}
          </div>
          <button
            type="button"
            className={styles.mainImage}
            onClick={() => setIsLightboxOpen(true)}
          >
            <img
              key={selectedImage}
              src={`/${product.images[selectedImage]}`}
              alt={product.name}
            />
          </button>
        </div>

        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          index={selectedImage}
          slides={product.images.map((image, index) => ({
            src: `/${image}`,
            alt: `${product.name} ${index + 1}`,
          }))}
          styles={{
            container: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
          }}
          zoom={{ maxZoomPixelRatio: 2 }}
          plugins={[Fullscreen, Zoom]}
          on={{
            view: ({ index }) => setSelectedImage(index),
          }}
        />

        <div className={styles.options}>
          <div className={styles.optionSection}>
            <p className={styles.optionLabel}>{t('product.availableColors')}</p>
            <p className={styles.productId}>
              {t('product.id', { id: productInfo?.id })}
            </p>
          </div>

          <div className={styles.colors}>
            {product.colorsAvailable.map(color => (
              <button
                key={color}
                className={`${styles.colorButton} ${
                  selectedColor === color ? styles.colorButtonActive : ''
                }`}
                onClick={() => handleColorChange(color)}
                style={{ backgroundColor: getProductColor(color) }}
              />
            ))}
          </div>

          <div className={styles.divider} />

          <div className={styles.optionSection}>
            <p className={styles.optionLabel}>{t('product.selectCapacity')}</p>
          </div>

          <div className={styles.capacities}>
            {product.capacityAvailable.map(capacity => (
              <button
                key={capacity}
                className={`${styles.capacityButton} ${
                  selectedCapacity === capacity
                    ? styles.capacityButtonActive
                    : ''
                }`}
                onClick={() => handleCapacityChange(capacity)}
              >
                {capacity}
              </button>
            ))}
          </div>

          <div className={styles.divider} />

          <div className={styles.pricing}>
            <div className={styles.prices}>
              <span className={styles.price}>${product.priceDiscount}</span>
              {product.priceDiscount !== product.priceRegular && (
                <span className={styles.oldPrice}>${product.priceRegular}</span>
              )}
            </div>

            <div className={styles.actions}>
              <button
                className={`${styles.addToCart} ${isInCart ? styles.addedToCart : ''}`}
                onClick={handleAddToCartClick}
                disabled={isInCart}
              >
                {isInCart ? t('common.addedToCart') : t('common.addToCart')}
              </button>
              <button className={styles.favorite} onClick={handleFavoriteClick}>
                <img
                  src={isFavorite ? '/img/heart_active.svg' : '/img/heart.svg'}
                  alt={t('product.favoriteAlt')}
                />
              </button>
            </div>
          </div>

          <div className={styles.specs}>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>
                {t('product.specs.screen')}
              </span>
              <span className={styles.specValue}>{product.screen}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>
                {t('product.specs.resolution')}
              </span>
              <span className={styles.specValue}>{product.resolution}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>
                {t('product.specs.processor')}
              </span>
              <span className={styles.specValue}>{product.processor}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>{t('product.specs.ram')}</span>
              <span className={styles.specValue}>{product.ram}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.about}>
          <h2 className={styles.sectionTitle}>{t('product.about')}</h2>
          <div className={styles.divider} />

          {product.description.map((section, index) => (
            <div key={index} className={styles.descriptionSection}>
              <h3 className={styles.descriptionTitle}>{section.title}</h3>
              {section.text.map((paragraph, pIndex) => (
                <p key={pIndex} className={styles.descriptionText}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.techSpecs}>
          <h2 className={styles.sectionTitle}>{t('product.techSpecs')}</h2>
          <div className={styles.divider} />

          <div className={styles.techSpecsList}>
            <div className={styles.techSpecRow}>
              <span className={styles.techSpecLabel}>
                {t('product.specs.screen')}
              </span>
              <span className={styles.techSpecValue}>{product.screen}</span>
            </div>
            <div className={styles.techSpecRow}>
              <span className={styles.techSpecLabel}>
                {t('product.specs.resolution')}
              </span>
              <span className={styles.techSpecValue}>{product.resolution}</span>
            </div>
            <div className={styles.techSpecRow}>
              <span className={styles.techSpecLabel}>
                {t('product.specs.processor')}
              </span>
              <span className={styles.techSpecValue}>{product.processor}</span>
            </div>
            <div className={styles.techSpecRow}>
              <span className={styles.techSpecLabel}>
                {t('product.specs.ram')}
              </span>
              <span className={styles.techSpecValue}>{product.ram}</span>
            </div>
            <div className={styles.techSpecRow}>
              <span className={styles.techSpecLabel}>
                {t('product.specs.builtInMemory')}
              </span>
              <span className={styles.techSpecValue}>{product.capacity}</span>
            </div>
            {product.camera && (
              <div className={styles.techSpecRow}>
                <span className={styles.techSpecLabel}>
                  {t('product.specs.camera')}
                </span>
                <span className={styles.techSpecValue}>{product.camera}</span>
              </div>
            )}
            {product.zoom && (
              <div className={styles.techSpecRow}>
                <span className={styles.techSpecLabel}>
                  {t('product.specs.zoom')}
                </span>
                <span className={styles.techSpecValue}>{product.zoom}</span>
              </div>
            )}
            <div className={styles.techSpecRow}>
              <span className={styles.techSpecLabel}>
                {t('product.specs.cell')}
              </span>
              <span className={styles.techSpecValue}>
                {product.cell.join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <SuggestedProductsSlider category={category} excludeId={product.id} />
    </div>
  );
};
