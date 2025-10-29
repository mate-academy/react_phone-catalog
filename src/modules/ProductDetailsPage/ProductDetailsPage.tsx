/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './ProductDetailsPage.module.scss';
import { Product } from '../shared/types';
import { useCart } from '../shared/context/CartContext';
import { useFavorites } from '../shared/context/FavoriteContext';
import { Button } from '../../components/UI/Button/Button';
import { ProductsList } from '../CategoryPage/components/ProductsList';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../components/BackButton/BackButton';

export const ProductDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const isFavorite = product
    ? favorites.some(fav => fav.id === product.id)
    : false;
  const [selectedCapacity, setSelectedCapacity] = useState(
    product?.capacity || '',
  );
  const [selectedColor, setSelectedColor] = useState(product?.color || '');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const categories = ['phones', 'tablets', 'accessories'];
        let foundProduct: Product | undefined;

        for (const category of categories) {
          const response = await fetch(`/api/${category}.json`);

          if (!response.ok) {
            continue;
          }

          const data: Product[] = await response.json();

          foundProduct = data.find(p => p.id === productId);
          if (foundProduct) {
            break;
          }
        }

        if (!foundProduct) {
          throw new Error(t('productNotFound'));
        }

        const normalizedProduct = {
          ...foundProduct,
          priceDiscount:
            foundProduct.priceDiscount ??
            foundProduct.priceRegular ??
            foundProduct.price ??
            0,
          priceRegular:
            foundProduct.priceRegular ??
            foundProduct.fullPrice ??
            foundProduct.price ??
            0,
        };

        setProduct(normalizedProduct);

        const allProductsData = await Promise.all(
          categories.map(category =>
            fetch(`/api/${category}.json`).then(res => res.json()),
          ),
        ).then(results => results.flat());

        setAllProducts(allProductsData);
      } catch (err) {
        setError(
          t('errorLoading') + (err instanceof Error ? `: ${err.message}` : ''),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, t]);

  useEffect(() => {
    if (product && allProducts.length > 0) {
      const filteredProducts = allProducts.filter(p => p.id !== product.id);
      const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
      const recommended = shuffled.slice(0, 4);

      setRecommendedProducts(recommended);
    }
  }, [product, allProducts]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error || !product) {
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
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img ? `/${img}` : '/img/product-not-found.png'}
                alt={`${product.name} image ${index + 1}`}
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
                product.images?.[selectedImageIndex]
                  ? `/${product.images[selectedImageIndex]}`
                  : '/img/product-not-found.png'
              }
              alt={`${product.name} main image`}
              className={styles.mainImage}
            />
          </div>
          <div className={styles.colorOptions}>
            <h3>Available Colors</h3>
            <div className={styles.colorCircles}>
              {product.colorsAvailable?.map((color, index) => (
                <div
                  key={index}
                  className={`${styles.colorCircle} ${selectedColor === color ? styles.selected : ''}`}
                  style={{ backgroundColor: color.toLocaleLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                />
              )) || <p>{t('noColors')}</p>}
            </div>
            <div className={styles.divider}></div>
            <div className={styles.capacityOptions}>
              {product.capacityAvailable?.map((cap, index) => (
                <button
                  key={index}
                  className={`${styles.capacityButton} ${selectedCapacity === cap ? styles.selected : ''}`}
                  onClick={() => setSelectedCapacity(cap)}
                >
                  {cap}
                </button>
              )) || <p>{t('noCapacity')}</p>}
            </div>
          </div>
          <p className={styles.price}>
            {product.priceDiscount ? (
              <>
                <span className={styles.discount}>
                  {product.priceDiscount} $
                </span>
                <span className={styles.regular}>{product.priceRegular} $</span>
              </>
            ) : (
              <span>{product.priceRegular || product.price} $</span>
            )}
          </p>
          <div className={styles.actions}>
            <Button
              variant="primary"
              size="md"
              onClick={() => addToCart(product)}
            >
              {t('addToCart')}
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => toggleFavorite(product)}
              className={isFavorite ? styles.favoriteActive : ''}
            >
              {isFavorite ? '❤️' : '🤍'}
            </Button>
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.productId}> ID: {product.id}</div>
          {product.description && (
            <div className={styles.description}>
              <h1 className={styles.about}>{t('about')}</h1>
              <div className={styles.divider}></div>
              {product.description.map((desc, index) => (
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
            <p>Screen: {product.screen || 'N/A'}</p>
            <p>Resolution: {product.resolution || 'N/A'}</p>
            <p>Processor: {product.processor || 'N/A'}</p>
            <p>RAM: {product.ram || 'N/A'}</p>
            <p>Camera: {product.camera || 'N/A'}</p>
            <p>Zoom: {product.zoom || 'N/A'}</p>
            <p>Connectivity: {product.cell?.join(', ') || 'N/A'}</p>
            {product.year && <p>Year: {product.year}</p>}
          </div>
        </div>
      </div>
      <section className={styles.recommendations}>
        <h2 className={styles.recommendationTitle}>{t('youMayLike')}</h2>
        <ProductsList products={recommendedProducts} isSlider={false} />
      </section>
    </div>
  );
};
