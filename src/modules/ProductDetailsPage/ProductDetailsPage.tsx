/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './ProductDetailsPage.module.scss';
import { Product } from '../shared/types';
import { useCart } from '../shared/context/CartContext';
import { useFavorites } from '../shared/context/FavoriteContext';
import { Button } from '../../components/UI/Button/Button';
// import { ProductsList } from '../CategoryPage/components/ProductsList';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../components/BackButton/BackButton';
import { DetailsSlider } from './DetailsSlider';

export const ProductDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const [baseProduct, setBaseProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const currentProduct = useMemo(() => {
    if (!baseProduct || !allProducts.length) {
      return null;
    }

    const variantId = `${baseProduct?.namespaceId}-${selectedCapacity.toLowerCase()}-${selectedColor.toLowerCase()}`;
    const variant = allProducts.find(p => p.id === variantId);

    return variant || baseProduct;

  }, [baseProduct, allProducts, selectedCapacity, selectedColor]);

  const isFavorite = currentProduct
    ? favorites.some(fav => fav.id === currentProduct.id)
    : false;

  const recommendedProducts = useMemo(() => {
    if (!allProducts.length || !currentProduct) {
      return [];
    }

    return allProducts
      .filter(p =>
        p.id !== currentProduct.id && p.category === currentProduct.category)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }, [allProducts, currentProduct]);


  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const categories = ['phones', 'tablets', 'accessories'];
        const results = await Promise.all(
          categories.map(cat =>
            fetch(`/api/${cat}.json`)
              .then(res => res.ok ? res.json() : [])
          )
        );

        const all = results.flat();

        setAllProducts(all);

        const found = all.find(p => p.id === productId);

        if (!found) {
          throw new Error(t('productNotFound'));
        }

        setBaseProduct(found);
        setSelectedColor(found.color);
        setSelectedCapacity(found.capacity);
      } catch (err) {
        setError(t('errorLoading') + (err instanceof Error ? `: ${err.message}` : ''));
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [productId, t]);

  useEffect(() => {
    if (currentProduct) {
      setSelectedImageIndex(0);
    }
  }, [currentProduct]);

  if (loading) {
    return <div className={styles.loading}>...Loading</div>;
  }

  if (error || !currentProduct) {
    return (
      <div className={styles.error}>
        <img
          src="/img/product-not-found.png"
          alt={t('productNotFound')}
          className={styles.errorImage}
        />
        <p>{error || t('productNotFound')}</p>
      </div>
    );
  }



  return (
    <div className={styles.details}>
      <Breadcrumbs />
      <BackButton />
      <div className={styles.content}>
        <div className={styles.topPanel}>
          <div className={styles.thumbnailGallery}>
            {currentProduct.images?.map((img, index) => (
              <img
              key={index}
              src={img ? `/${img}` : '/img/product-not-found.png'}
              alt={`${currentProduct.name} image ${index + 1}`}
              className={`${styles.thumbnail} ${selectedImageIndex === index ? styles.selected : ''}`}
              onClick={() => setSelectedImageIndex(index)}
              />
            )) || (
                <img
                  src="/img/product-not-found.png"
                  alt={t('noImage')}
                  className={styles.thumbnail}
                />
              )}
          </div>
          <div className={styles.mainImageContainer}>
            <img
              src={
                currentProduct.images?.[selectedImageIndex]
                  ? `/${currentProduct.images[selectedImageIndex]}`
                  : '/img/product-not-found.png'
              }
              alt={`${currentProduct.name} main image`}
              className={styles.mainImage}
            />
          </div>
          <div className={styles.colorOptions}>
            <h3>Available Colors</h3>
            <div className={styles.colorCircles}>
              {baseProduct?.colorsAvailable?.map((color) => (
                <div
                  key={color}
                  className={`${styles.colorCircle} ${selectedColor === color ? styles.selected : ''}`}
                  style={{ backgroundColor: color.toLocaleLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                />
              )) || <p>{t('noColors')}</p>}
            </div>
            <div className={styles.divider}></div>
            <div className={styles.capacityOptions}>
              {baseProduct?.capacityAvailable?.map((cap) => (
                <button
                  key={cap}
                  className={`${styles.capacityButton} ${selectedCapacity === cap ? styles.selected : ''}`}
                  onClick={() => setSelectedCapacity(cap)}
                >
                  {cap}
                </button>
              )) || <p>{t('noCapacity')}</p>}
            </div>
          </div>
          <p className={styles.price}>
            {currentProduct.priceDiscount ? (
              <>
                <span className={styles.discount}>
                  {currentProduct.priceDiscount} $
                </span>
                <span
                className={styles.regular}
                >{currentProduct.priceRegular} $</span>
              </>
            ) : (
              <span>
                {currentProduct.priceRegular || currentProduct.price} $</span>
            )}
          </p>
          <div className={styles.actions}>
            <Button
              variant="primary"
              size="md"
              onClick={() => addToCart(currentProduct)}
            >
              {t('addToCart')}
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => toggleFavorite(currentProduct)}
              className={isFavorite ? styles.favoriteActive : ''}
            >
              {isFavorite ? '❤️' : '🤍'}
            </Button>
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.productId}> ID: {currentProduct.id}</div>
          {currentProduct.description && (
            <div className={styles.description}>
              <h1 className={styles.about}>{t('about')}</h1>
              <div className={styles.divider}></div>
              {currentProduct.description.map((desc, index) => (
                <div key={index}>
                  <h3 className={styles.descTitle}>{desc.title}</h3>
                  {desc.text.map((text, i) => (
                    <p key={i}>{text}</p>
                  ))}
                </div>
              ))}
            </div>
          )}
          <h1 className={styles.specsTitle}>{t('specs')}</h1>
          <div className={styles.specs}>
            <p>Screen: {currentProduct.screen || 'N/A'}</p>
            <p>Resolution: {currentProduct.resolution || 'N/A'}</p>
            <p>Processor: {currentProduct.processor || 'N/A'}</p>
            <p>RAM: {currentProduct.ram || 'N/A'}</p>
            <p>Camera: {currentProduct.camera || 'N/A'}</p>
            <p>Zoom: {currentProduct.zoom || 'N/A'}</p>
            <p>Connectivity: {currentProduct.cell?.join(', ') || 'N/A'}</p>
            {currentProduct.year && <p>Year: {currentProduct.year}</p>}
          </div>
        </div>
      </div>
      <section className={styles.recommendations}>
        <h2 className={styles.recommendationTitle}>{t('youMayLike')}</h2>
        <DetailsSlider products={recommendedProducts} />
      </section>
    </div>
  );
};
