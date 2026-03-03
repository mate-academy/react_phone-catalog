import styles from './ProductDetailsPage.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useProduct } from '../../hooks/useProducts';
import { useNavigate } from 'react-router-dom';
import { KeyboardEvent, useState } from 'react';
import { useEffect } from 'react';

import AddToCartButton from '../../components/AddToCartButton';
import { Product } from '../../../public/api/types/Product';
import FavouritesLink from '../../components/FavouritesLink/index';
import Button from '../../components/Button';
import buttonStyles from '../../components/Button/Button.module.scss';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [mainImage, setMainImage] = useState<string | null>(null);
  const { product, loading, error } = useProduct((productId as string) ?? '');
  const title = 'Product Details';
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

const [suggested, setSuggested] = useState<Product[]>([]);
const [loadingSuggested, setLoadingSuggested] = useState(false);
const [errorSuggested, setErrorSuggested] = useState<string | null>(null);

  useEffect(() => {
    setActiveIndex(0);
  }, [productId]);


useEffect(() => {
  if (!product) return;
  setMainImage(product.image ?? null);
  setSelectedColor(Array.isArray(product.colorsAvailable) ? product.colorsAvailable[0] : null);
  setSelectedCapacity(Array.isArray(product.capacityAvailable) ? product.capacityAvailable[0] : null);
  loadSuggested();
}, [product]);

  if (!productId) {
    return <div>Product was not found</div>;
  }


  const loadSuggested = async () => {
  if (!product) return;
    setLoadingSuggested(true);
    setErrorSuggested(null);
    try {
    const items = await getSuggestedProducts({ productId: product.id, category: product.category, count: 4 });
    setSuggested(items);
    } catch (err) {
    setErrorSuggested('Failed to load suggested products');
    setSuggested([]);
    } finally {
    setLoadingSuggested(false);
    }
};

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  function handleAddToCart(product: Product): void {
    throw new Error('Function not implemented.');
  }

  function handleToggleFavorite(id: string | number | undefined): void {
    if (!id) {
      return;
    }

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(id);

    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(id);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, image: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setMainImage(image);
    }
  };

  const handleToggleImageClick = (index: number, image: string) => {
    setMainImage(image);
    setActiveIndex(index);
  };


  async function getSuggestedProducts({ productId, category, count = 4 }) {
  const res = await fetch(`api/${category}.json`);
  const all = await res.json();
  const others = all.filter(p => p.id !== productId);

  for (let i = others.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [others[i], others[j]] = [others[j], others[i]];
  }

  return others.slice(0, count);
}



  return (
    <>
      <div className={styles.productDetailsPage}>
        <div className={styles.productDetailsPage__topBar}>
          <nav aria-label="Page navigation" className={styles.nav}>
            <div className={styles.breadcrumbs}>
              <Link to="/">Home</Link> / <Link to="/phones">Phones</Link> /{' '}
              <span>{product?.name}</span>
            </div>
            <button
              type="button"
              onClick={handleBack}
              aria-label="Back"
              className={styles.backButton}
            >
              Back
            </button>
          </nav>
        </div>
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
                <div className={styles.productDetailsPage__productInfo}>
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
                      <div className={styles.carousel}>
                        <div className={`${styles.slider}`}>
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
                      </div>
                    )}

                  <div
                    className={styles.optionsRow}
                    role="radiogroup"
                    aria-label="Available colors"
                  >
                    <fieldset className={styles.fieldset}>
                      <label className={styles.label}>Available colors</label>
                      {product.colorsAvailable.map(color => (
                        <label key={color} className={styles.colorOption}>
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
                            <label className={styles.label}>
                              Select capacity
                            </label>
                            {product.capacityAvailable.map(cap => (
                              <label key={cap} className={styles.option}>
                                <input
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
                    <p className={styles.productDetailsPage__productFullPrice}>
                      {`$${product?.fullPrice}`}
                    </p>
                  </div>
                  <div className={styles.productDetailsPage__bottom}>
                    <AddToCartButton
                      handleAddToCart={() => handleAddToCart?.(product)}
                    />

                    <Button
                      className={`${buttonStyles.button} ${buttonStyles['button--favourites']}`}
                      onClick={() =>
                        handleToggleFavorite?.(String(product?.id))
                      }
                    >
                      <FavouritesLink
                        className={`${styles['icon--large']} ${styles['icon--favourites']}`}
                        iconSize="lg"
                      />
                    </Button>
                  </div>

                  <div className={styles.productDetailsPage__productInfoTable}>
                    <div className={styles.productFeature}>Screen</div>
                    <div className={styles.productValue}>{product?.screen}</div>
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
                <h4>About</h4>
                <div
                  role="radiogroup"
                  aria-label="Product description"
                  className={styles.productDetailsPage__description}
                >
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
              </section>
            </>
          )}

          {product && (
            <>
              <section
                id="tech-specs"
                aria-label="Tech specs"
                className={`${styles.section} ${styles['section--tech-specs']}`}
              >
                <h4>Tech specs</h4>
                <div className={styles.productDetailsPage__productInfoTable}>
                <div className={styles.productFeature}>Screen</div>
                    <div className={styles.productValue}>{product?.screen}</div>
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

                  <div className={styles.productFeature}>Built in memory</div>
                  <div className={styles.productValue}>{product?.capacity}</div>
                  <div className={styles.productFeature}>Camera</div>
                  <div className={styles.productValue}>{product?.camera}</div>
                  <div className={styles.productFeature}></div>
                  <div className={styles.productValue}>{product?.screen}</div>
                  <div className={styles.productFeature}>Zoom</div>
                  <div className={styles.productValue}>{product?.zoom}</div>
                  <div className={styles.productFeature}>Cell</div>
                  <div className={styles.productValue}>{product?.cell}</div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </>
  );
};
