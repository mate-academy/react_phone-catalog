import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';

import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import {
  getProductById,
  getSuggestedProducts,
  getProducts,
} from '../../api/products';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackButton } from '../../components/BackButton';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';
import { ProductsSlider } from '../HomePage/components/ProductsSlider';

import { CartContext } from '../shared/context/CartContext';
import { FavoritesContext } from '../shared/context/FavoritesContext';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState<ProductDetails | null>(null);

  const [productAsCard, setProductAsCard] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [mainImage, setMainImage] = useState<string>('');
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const cartContext = useContext(CartContext);
  const favoritesContext = useContext(FavoritesContext);

  const isInCart = cartContext?.cart.some(
    item => item.product.itemId === productId,
  );
  const isFavorite = favoritesContext?.favorites.some(
    fav => fav.itemId === productId,
  );

  const handleAddToCart = () => {
    if (!isInCart && productAsCard) {
      cartContext?.addToCart(productAsCard);
    }
  };

  const handleToggleFavorite = () => {
    if (productAsCard) {
      favoritesContext?.toggleFavorite(productAsCard);
    }
  };

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);
    setHasError(false);

    Promise.all([
      getProductById(productId),
      getSuggestedProducts(),

      getProducts(),
    ])
      .then(([details, suggested, allProducts]) => {
        setProduct(details);
        setMainImage(details.images[0]);
        setSuggestedProducts(suggested);

        const matched = allProducts.find(p => p.itemId === productId);

        if (matched) {
          setProductAsCard(matched);
        }
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [productId]);

  return (
    <main className={styles.productDetails}>
      <div className="container">
        <div className={styles.productDetails__navigation}>
          <Breadcrumbs />
          <BackButton />
        </div>

        {isLoading && <Loader />}

        {hasError && <ErrorMessage onReload={() => window.location.reload()} />}

        {!isLoading && !hasError && product && (
          <div className={styles.productDetails__content}>
            <h1 className={styles.title}>{product.name}</h1>

            <div className={styles.productDetails__overview}>
              <div className={styles.gallery}>
                <div className={styles.gallery__thumbs}>
                  {product.images.map(imgUrl => (
                    <button
                      key={imgUrl}
                      type="button"
                      className={`${styles.gallery__thumbButton} ${
                        mainImage === imgUrl
                          ? styles['gallery__thumbButton--active']
                          : ''
                      }`}
                      onClick={() => setMainImage(imgUrl)}
                    >
                      <img
                        src={`/${imgUrl}`}
                        alt="Thumbnail"
                        className={styles.gallery__thumbImage}
                      />
                    </button>
                  ))}
                </div>

                <div className={styles.gallery__main}>
                  <img
                    src={`/${mainImage}`}
                    alt={product.name}
                    className={styles.gallery__mainImage}
                  />
                </div>
              </div>

              <div className={styles.info}>
                <div className={styles.info__colors}>
                  <div className={styles.info__colorsHeader}>
                    <span className={styles.info__label}>Available colors</span>
                    <span className={styles.info__id}>ID: 802390</span>
                  </div>
                  <div className={styles.info__colorsList}>
                    {product.colorsAvailable.map(color => {
                      const newId = `${product.namespaceId}-${product.capacity.toLowerCase()}-${color}`;

                      return (
                        <Link
                          key={color}
                          to={`/product/${newId}`}
                          className={`${styles.info__colorLink} ${
                            product.color === color
                              ? styles['info__colorLink--active']
                              : ''
                          }`}
                          title={color}
                        >
                          <span
                            className={styles.info__colorCircle}
                            style={{ backgroundColor: color }}
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Пам'ять */}
                <div className={styles.info__capacity}>
                  <span className={styles.info__label}>Select capacity</span>
                  <div className={styles.info__capacityList}>
                    {product.capacityAvailable.map(capacity => {
                      const newId = `${product.namespaceId}-${capacity.toLowerCase()}-${product.color}`;

                      return (
                        <Link
                          key={capacity}
                          to={`/product/${newId}`}
                          className={`${styles.info__capacityLink} ${
                            product.capacity === capacity
                              ? styles['info__capacityLink--active']
                              : ''
                          }`}
                        >
                          {capacity}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Ціна */}
                <div className={styles.info__price}>
                  <span className={styles.info__priceDiscount}>
                    ${product.priceDiscount}
                  </span>
                  <span className={styles.info__priceRegular}>
                    ${product.priceRegular}
                  </span>
                </div>

                <div className={styles.info__actions}>
                  <button
                    className={`${styles.info__addToCart} ${
                      isInCart ? styles['info__addToCart--added'] : ''
                    }`}
                    onClick={handleAddToCart}
                  >
                    {isInCart ? 'Added to cart' : 'Add to cart'}
                  </button>

                  <button
                    className={`${styles.info__favorite} ${
                      isFavorite ? styles['info__favorite--active'] : ''
                    }`}
                    onClick={handleToggleFavorite}
                    aria-label={
                      isFavorite ? 'Remove from favorites' : 'Add to favorites'
                    }
                  >
                    <img
                      src={
                        isFavorite
                          ? '/icons/heart-filled.svg'
                          : '/icons/heart-empty.svg'
                      }
                      alt="Favorite"
                    />
                  </button>
                </div>

                <div className={styles.info__specs}>
                  <div className={styles.info__specRow}>
                    <span className={styles.info__specName}>Screen</span>
                    <span className={styles.info__specValue}>
                      {product.screen}
                    </span>
                  </div>
                  <div className={styles.info__specRow}>
                    <span className={styles.info__specName}>Resolution</span>
                    <span className={styles.info__specValue}>
                      {product.resolution}
                    </span>
                  </div>
                  <div className={styles.info__specRow}>
                    <span className={styles.info__specName}>Processor</span>
                    <span className={styles.info__specValue}>
                      {product.processor}
                    </span>
                  </div>
                  <div className={styles.info__specRow}>
                    <span className={styles.info__specName}>RAM</span>
                    <span className={styles.info__specValue}>
                      {product.ram}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.productDetails__additional}>
              <div className={styles.about}>
                <h2 className={styles.about__mainTitle}>About</h2>
                <div className={styles.about__content}>
                  {product.description.map((section, index) => (
                    <div key={index} className={styles.about__section}>
                      <h3 className={styles.about__title}>{section.title}</h3>
                      {section.text.map((paragraph, pIndex) => (
                        <p key={pIndex} className={styles.about__text}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.techSpecs}>
                <h2 className={styles.techSpecs__mainTitle}>Tech specs</h2>
                <div className={styles.techSpecs__content}>
                  <div className={styles.techSpecs__row}>
                    <span className={styles.techSpecs__name}>Screen</span>
                    <span className={styles.techSpecs__value}>
                      {product.screen}
                    </span>
                  </div>
                  <div className={styles.techSpecs__row}>
                    <span className={styles.techSpecs__name}>Resolution</span>
                    <span className={styles.techSpecs__value}>
                      {product.resolution}
                    </span>
                  </div>
                  <div className={styles.techSpecs__row}>
                    <span className={styles.techSpecs__name}>Processor</span>
                    <span className={styles.techSpecs__value}>
                      {product.processor}
                    </span>
                  </div>
                  <div className={styles.techSpecs__row}>
                    <span className={styles.techSpecs__name}>RAM</span>
                    <span className={styles.techSpecs__value}>
                      {product.ram}
                    </span>
                  </div>
                  <div className={styles.techSpecs__row}>
                    <span className={styles.techSpecs__name}>
                      Built in memory
                    </span>
                    <span className={styles.techSpecs__value}>
                      {product.capacity}
                    </span>
                  </div>
                  <div className={styles.techSpecs__row}>
                    <span className={styles.techSpecs__name}>Camera</span>
                    <span className={styles.techSpecs__value}>
                      {product.camera}
                    </span>
                  </div>
                  <div className={styles.techSpecs__row}>
                    <span className={styles.techSpecs__name}>Zoom</span>
                    <span className={styles.techSpecs__value}>
                      {product.zoom}
                    </span>
                  </div>
                  <div className={styles.techSpecs__row}>
                    <span className={styles.techSpecs__name}>Cell</span>
                    <span className={styles.techSpecs__value}>
                      {product.cell.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <ProductsSlider
              title="You may also like"
              products={suggestedProducts}
            />
          </div>
        )}
      </div>
    </main>
  );
};
