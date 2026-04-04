/* eslint-disable @typescript-eslint/indent */
import { useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import buttonStyles from '../../components/Button/Button.module.scss';
import { useProduct } from '../../hooks/useProducts';
import { KeyboardEvent, useState } from 'react';
import { useEffect } from 'react';
import AddToCartButton from '../../components/AddToCartButton';
import { Product } from '../../../public/api/types/Product';
import FavouritesLink from '../../components/FavouritesLink/index';
import Button from '../../components/Button';

import ProductsSlider from '../HomePage/components/ProductsSlider/index';
import Breadcrumbs from '../../components/Breadcrumbs/index';
import HistoryBackButton from '../../components/HistoryBackButton';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

type Types = {
  productId: string;
  category: string;
  count?: number;
};

export const ProductDetailsPage = () => {
  const URL = `api/products.json`;
  const { productId } = useParams();
  const [mainImage, setMainImage] = useState<string | null>(null);
  const { product, loading, error } = useProduct((productId as string) ?? '');
  const title = 'Product Details';

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [suggested, setSuggested] = useState<Product[]>([]);
  const [loadingSuggested, setLoadingSuggested] = useState(false);
  const [errorSuggested, setErrorSuggested] = useState<string | null>(null);
  const [suggestedIndex, setSuggestedIndex] = useState(0);
  const { items, addToCart, removeFromCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    setActiveIndex(0);
  }, [productId]);

  useEffect(() => {
    if (!product) {
      return;
    }

    async function getSuggestedProducts({
      productId: id,
      category,
      count = 4,
    }: Types) {
      const res = await fetch(URL);

      if (!res.ok) {
        throw new Error('Failed to fetch');
      }

      const all = await res.json();

      const others = all.filter(
        p =>
          String(p.id) !== String(id) &&
          p.image !== '' &&
          p.category === String(category),
      );

      for (let i = others.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [others[i], others[j]] = [others[j], others[i]];
      }

      return others.slice(0, count);
    }

    const loadSuggested = async () => {
      setLoadingSuggested(true);
      setErrorSuggested(null);
      try {
        const newItems = await getSuggestedProducts({
          productId: product.id,
          category: product.category,
          count: 4,
        });

        setSuggested(newItems);
      } catch (err) {
        setErrorSuggested('Failed to load suggested products');
        setSuggested([]);
      } finally {
        setLoadingSuggested(false);
      }
    };

    setMainImage(product.image ?? null);
    setSelectedColor(
      Array.isArray(product.colorsAvailable)
        ? product.colorsAvailable[0]
        : null,
    );
    setSelectedCapacity(
      Array.isArray(product.capacityAvailable)
        ? product.capacityAvailable[0]
        : null,
    );
    loadSuggested();
  }, [product, URL]);

  if (!productId) {
    return <div>Product was not found</div>;
  }

  const handleRetry = () => {
    window.location.reload();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, image: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setMainImage(image);
    }
  };

  const handleToggleImageClick = (index: number, image: string) => {
    setMainImage(image);
    setActiveIndex(index);
  };

  const handleNext = () => {
    setSuggestedIndex(prev => (prev + 1) % suggested.length);
  };

  const handlePrev = () => {
    if (!suggested || suggested.length === 0) {
      return;
    }

    setSuggestedIndex(prev => (prev - 1 + suggested.length) % suggested.length);
  };

  return (
    <>
      <div className={styles.productDetailsPage}>
        <div className={styles.productDetailsPage__breadcrumbs}>
          <Breadcrumbs productName={product?.name} />
        </div>
        <nav className={styles.productDetailsPage__nav}>
          <HistoryBackButton />
        </nav>
        <h1 className="visually-hidden">Product Details Page</h1>
        <div className={styles.productDetailsPage__content}>
          <section
            id={productId}
            aria-label={title}
            className={`${styles.section} ${styles['section--breadcrumbs']}`}
          >
            <div className="product-errors">
              {loading && <div>Loading...</div>}
              {error && (
                <div role="alert">
                  {error} <button onClick={handleRetry}>Retry</button>
                </div>
              )}
              {!product && <div>Product was not found</div>}
            </div>
            {!loading && !error && product && (
              <>
                <div className={styles.productDetailsPage__title}>
                  <h3>{product?.name}</h3>
                </div>

                <div className={styles.productDetailsPage__sliderWraper}>
                  <div
                    className={styles.productDetailsPage__productImageContainer}
                  >
                    <img
                      src={mainImage ?? product?.image}
                      alt={product?.name ?? 'Product Image'}
                      className={styles.productDetailsPage__productImage}
                    />
                  </div>
                  {Array.isArray(product.images) &&
                    product.images.length > 0 && (
                      <div
                        className={`${styles.slider} ${styles.productDetailsPage__slider}`}
                      >
                        {Array.isArray(product.images) &&
                          product.images.map((img, i) => (
                            <div
                              key={i}
                              className={`${styles.slide} ${i === activeIndex ? styles.active : ''}`}
                              onClick={() => handleToggleImageClick(i, img)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={e => {
                                handleKeyDown(e, img);
                              }}
                            >
                              <img
                                src={img}
                                alt={`Product ${product?.name} image ${i + 1}`}
                              />
                            </div>
                          ))}
                      </div>
                    )}

                  <div className={styles.productDetailsPage__productInfo}>
                    <div
                      className={styles.optionsRow}
                      role="radiogroup"
                      aria-label="Available colors"
                    >
                      <fieldset className={styles.fieldset}>
                        <span className={styles.label}>Available colors</span>
                        {product.colorsAvailable.map(color => (
                          <label key={color} className={styles.colorOption}>
                            {' '}
                            &nbsp;
                            <input
                              type="radio"
                              name="color"
                              value={color}
                              checked={selectedColor === color}
                              onChange={() => setSelectedColor(color)}
                            />
                            <span
                              className={styles.colorCircle}
                              style={{ backgroundColor: color }}
                              aria-hidden="true"
                            />
                          </label>
                        ))}
                      </fieldset>
                      <p
                        className={`${styles.label} ${styles.productDetailsPage__id}`}
                      >
                        ID: {productId}
                      </p>
                    </div>
                    <div className={styles.productDetailsPage__fieldsetTable}>
                      {Array.isArray(product.colorsAvailable) &&
                        product.colorsAvailable.length > 0 && (
                          <div
                            className={styles.optionsRow}
                            role="radiogroup"
                            aria-label="Available capacities"
                          >
                            <fieldset className={styles.fieldset}>
                              <label
                                className={styles.label}
                                htmlFor="capacity"
                              >
                                Select capacity
                              </label>
                              {product.capacityAvailable.map(cap => (
                                <label key={cap} className={styles.option}>
                                  <input
                                    id="capacity"
                                    type="radio"
                                    name="capacity"
                                    value={cap}
                                    checked={selectedCapacity === cap}
                                    onChange={() => setSelectedCapacity(cap)}
                                  />
                                  <span
                                    className={styles.optionText}
                                    aria-hidden="true"
                                  >
                                    {cap}
                                  </span>
                                </label>
                              ))}
                            </fieldset>
                          </div>
                        )}
                    </div>
                    <div className={styles.productPriceRow}>
                      <p className={styles.productDetailsPage__productPrice}>
                        <a>${product?.price}&nbsp;</a>
                      </p>
                      <p
                        className={styles.productDetailsPage__productFullPrice}
                      >
                        {`$${product?.fullPrice}`}
                      </p>
                    </div>
                    <div className={styles.productDetailsPage__bottom}>
                      <AddToCartButton
                        onClick={() => addToCart(product)}
                        isInCart={
                          !!items.find(item => item.product.id === product.id)
                        }
                        removeFromCart={() =>
                          removeFromCart(String(product.id))
                        }
                      />

                      <Button
                        className={`${buttonStyles.button} ${buttonStyles['button--favourites']}`}
                        onClick={() => toggleFavorite(String(product.id))}
                        pressed={isFavorite(String(product.id))}
                      >
                        <FavouritesLink
                          className={`${styles['icon--large']} ${styles['icon--favourites']} ${isFavorite(product.id) ? styles.active : ''}`}
                          iconSize="lg"
                        />
                      </Button>
                    </div>

                    <div
                      className={`{${styles.productInfoTable} ${styles['productDetailsPage__productInfoTable--general']}`}
                    >
                      <div className={styles.productFeature}>Screen</div>
                      <div className={styles.productValue}>
                        {product?.screen}
                      </div>
                      <div className={styles.productFeature}>Resolution</div>
                      <div className={styles.productValue}>
                        {product?.resolution}
                      </div>
                      <div className={styles.productFeature}>Processor</div>
                      <div className={styles.productValue}>
                        {product?.processor}
                      </div>
                      <div className={styles.productFeature}>RAM</div>
                      <div className={styles.productValue}>{product?.ram}</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
          {product && (
            <>
              <section
                id="about-product"
                aria-label="About product"
                className={`${styles.section} ${styles['section--about']}`}
              >
                <div
                  role="radiogroup"
                  aria-label="Product description"
                  className={styles.productDetailsPage__description}
                >
                  <h4>About</h4>
                  {Array.isArray(product.description) &&
                    product.description.map(
                      (desc: { title: string; text: string }) => (
                        <>
                          <h5>{desc.title}</h5>
                          <p
                            className={
                              styles.productDetailsPage__descriptionText
                            }
                          >
                            {desc.text}
                          </p>
                        </>
                      ),
                    )}
                </div>

                {product && (
                  <>
                    <div
                      className={`{${styles.productInfoTable} ${styles['productDetailsPage__productInfoTable--tech-specs']}`}
                    >
                      <h4>Tech specs</h4>
                      <div className={styles.productFeature}>Screen</div>
                      <div className={styles.productValue}>
                        {product?.screen}
                      </div>
                      <div className={styles.productFeature}>Resolution</div>
                      <div className={styles.productValue}>
                        {product?.resolution}
                      </div>
                      <div className={styles.productFeature}>Processor</div>
                      <div className={styles.productValue}>
                        {product?.processor}
                      </div>
                      <div className={styles.productFeature}>RAM</div>
                      <div className={styles.productValue}>{product?.ram}</div>

                      <div className={styles.productFeature}>
                        Built in memory
                      </div>
                      <div className={styles.productValue}>
                        {product?.capacity}
                      </div>
                      <div className={styles.productFeature}>Camera</div>
                      <div className={styles.productValue}>
                        {product?.camera}
                      </div>
                      <div className={styles.productFeature}></div>
                      <div className={styles.productValue}>
                        {product?.screen}
                      </div>
                      <div className={styles.productFeature}>Zoom</div>
                      <div className={styles.productValue}>{product?.zoom}</div>
                      <div className={styles.productFeature}>Cell</div>
                      <div className={styles.productValue}>{product?.cell}</div>
                    </div>
                  </>
                )}
              </section>

              {!loadingSuggested &&
                !errorSuggested &&
                Array.isArray(suggested) && (
                  <>
                    <section
                      id="suggested-products"
                      aria-label="Suggeste Products"
                      className={`${styles.section} ${styles['section--suggested']}`}
                    >
                      <ProductsSlider
                        products={suggested}
                        currentIndex={suggestedIndex}
                        handlePrev={handlePrev}
                        handleNext={handleNext}
                      >
                        You may also like
                      </ProductsSlider>
                    </section>
                  </>
                )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
