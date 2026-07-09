import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Product, ProductDetails } from '../../types/types';
import { ProductCard } from '../ProductCard';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useTranslation } from 'react-i18next';
import styles from './ProductDetailsPage.module.scss';

type Category = 'phones' | 'tablets' | 'accessories';

export const ProductDetailsPage: React.FC = () => {
  const { t } = useTranslation();

  const { productId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.split('/')[1] as Category;

  const { cartItems, addToCart, removeFromCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [allProducts, setAllProducts] = useState<ProductDetails[]>([]);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const isAdded = cartItems.some(
    item => String(item.itemId) === String(productId),
  );
  const isFavorite = favorites.some(
    item => String(item.itemId) === String(productId),
  );

  const getMappedProduct = (details: ProductDetails): Product => ({
    id: 0,
    category: category,
    itemId: details.id,
    name: details.name,
    fullPrice: details.priceRegular,
    price: details.priceDiscount,
    screen: details.screen || '',
    capacity: details.capacity || '',
    ram: details.ram || '',
    year: details.year || 2022,
    image: details.images[0],
    color: details.color,
    processor: details.processor || '',
    resolution: details.resolution || '',
    camera: details.camera || '',
    zoom: details.zoom || '',
    cell: details.cell || [],
  });

  const updateScrollButtons = useCallback(() => {
    if (listRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = listRef.current;

      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setHasError(false);

    fetch(`api/${category}.json`, { signal: controller.signal })
      .then(res => {
        if (!res.ok) {
          throw new Error('Error');
        }

        return res.json();
      })
      .then((data: ProductDetails[]) => {
        setAllProducts(data);
        const foundProduct = data.find(p => p.id === productId);

        if (foundProduct) {
          setProduct(foundProduct);
          setMainImage(foundProduct.images[0]);
        } else {
          setHasError(true);
        }
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setHasError(true);
        }
      })
      .finally(() => {
        setLoading(false);
        setTimeout(updateScrollButtons, 150);
      });

    return () => controller.abort();
  }, [productId, category, updateScrollButtons]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [productId]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (listRef.current) {
      const containerWidth = listRef.current.clientWidth;
      const scrollAmount =
        direction === 'left' ? -(containerWidth + 16) : containerWidth + 16;

      listRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(updateScrollButtons, 500);
    }
  };

  const handleSpecsChange = (newCapacity?: string, newColor?: string) => {
    if (!product) {
      return;
    }

    const capacity = (newCapacity || product.capacity).toLowerCase();
    const color = (newColor || product.color).toLowerCase().replace(' ', '-');
    const newId = `${product.namespaceId}-${capacity}-${color}`;

    navigate(`/${category}/${newId}`);
  };

  if (loading) {
    return (
      <div className={`${styles.loader} ${styles.container}`}>
        {t('product.loading') || 'Loading...'}
      </div>
    );
  }

  if (hasError || !product) {
    return (
      <div className={styles.container}>
        <h1 className={styles['product-details__title']}>
          {t('product.not_found') || 'Product not found'}
        </h1>
        <Link to={`/${category}`} className={styles['product-details__back']}>
          {t('product.back_to_catalog') || 'Back to catalog'}
        </Link>
      </div>
    );
  }

  const relatedProducts = allProducts.filter(p => p.id !== productId);

  return (
    <div className={styles['product-details']}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs}>
          <Link to="/" className={styles.breadcrumbs__link}>
            <img
              src="/images/icons/home.svg"
              alt="home"
              className={styles.breadcrumbs__icon}
            />
          </Link>
          <img
            src="/images/icons/arrow-right.png"
            alt="arrow"
            className={styles['breadcrumbs__arrow-img']}
          />
          <Link
            to={`/${category}`}
            className={styles.breadcrumbs__link}
            style={{ textTransform: 'capitalize' }}
          >
            {t(`nav.${category}`)}
          </Link>
          <img
            src="/images/icons/arrow-right.png"
            alt="arrow"
            className={styles['breadcrumbs__arrow-img']}
          />
          <span className={styles.breadcrumbs__current}>{product.name}</span>
        </nav>

        <Link to={`/${category}`} className={styles['product-details__back']}>
          <img
            src="/images/icons/arrow-left.png"
            alt="back"
            className={styles['back-icon']}
          />
          {t('product.back')}
        </Link>

        <h1 className={styles['product-details__title']}>{product.name}</h1>

        <div className={styles['product-details__main-grid']}>
          {/* Gallery Section */}
          <div
            className={`${styles['product-details__gallery']} ${styles.gallery}`}
          >
            <div className={styles.gallery__thumbnails}>
              {product.images.map(img => (
                <div
                  key={img}
                  className={`${styles.gallery__thumb} ${mainImage === img ? styles['gallery__thumb--active'] : ''}`}
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} alt="preview" />
                </div>
              ))}
            </div>
            <div className={styles['gallery__main-image']}>
              <img src={mainImage} alt={product.name} />
            </div>
          </div>

          <div
            className={`${styles['product-details__checkout']} ${styles.checkout}`}
          >
            <div className={styles['checkout__id-wrapper']}>
              <span className={styles['checkout__id-label']}>ID: 802390</span>
            </div>

            {product.colorsAvailable.length > 0 && (
              <div className={styles.checkout__section}>
                <span className={styles['checkout__section-label']}>
                  {t('product.available_colors')}
                </span>
                <div className={styles.checkout__colors}>
                  {product.colorsAvailable.map(color => (
                    <div
                      key={color}
                      onClick={() => handleSpecsChange(undefined, color)}
                      className={`${styles['checkout__color-wrapper']} ${product.color === color ? styles['checkout__color-wrapper--active'] : ''}`}
                    >
                      <div
                        className={styles.checkout__color}
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.checkout__divider} />

            {product.capacityAvailable.length > 0 && (
              <div className={styles.checkout__section}>
                <span className={styles['checkout__section-label']}>
                  {t('product.select_capacity')}
                </span>
                <div className={styles.checkout__capacities}>
                  {product.capacityAvailable.map(cap => (
                    <button
                      key={cap}
                      type="button"
                      onClick={() => handleSpecsChange(cap, undefined)}
                      className={`${styles.checkout__capacity} ${product.capacity === cap ? styles['checkout__capacity--active'] : ''}`}
                    >
                      {cap}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.checkout__divider} />

            <div className={styles['checkout__price-section']}>
              <div className={styles['checkout__price-row']}>
                <span className={styles['checkout__price-current']}>
                  ${product.priceDiscount}
                </span>
                <span className={styles['checkout__price-old']}>
                  ${product.priceRegular}
                </span>
              </div>

              <div className={styles.checkout__buttons}>
                <button
                  type="button"
                  className={`${styles['checkout__btn-add']} ${isAdded ? styles['checkout__btn-add--active'] : ''}`}
                  onClick={() =>
                    isAdded
                      ? removeFromCart(product.id)
                      : addToCart(getMappedProduct(product))
                  }
                >
                  {isAdded ? t('product.added') : t('product.add_to_cart')}
                </button>
                <button
                  type="button"
                  className={`${styles['checkout__icon-heart']} ${isFavorite ? styles['checkout__icon-heart--active'] : ''}`}
                  onClick={() => toggleFavorite(getMappedProduct(product))}
                />
              </div>
            </div>

            <div className={styles['checkout__short-specs']}>
              <div className={styles['checkout__spec-item']}>
                <span>{t('product.screen')}</span>
                <span>{product.screen}</span>
              </div>
              <div className={styles['checkout__spec-item']}>
                <span>{t('product.resolution')}</span>
                <span>{product.resolution}</span>
              </div>
              <div className={styles['checkout__spec-item']}>
                <span>{t('product.processor')}</span>
                <span>{product.processor}</span>
              </div>
              <div className={styles['checkout__spec-item']}>
                <span>{t('product.ram')}</span>
                <span>{product.ram}</span>
              </div>
            </div>
          </div>

          <div
            className={`${styles['product-details__about']} ${styles.about}`}
          >
            <h2 className={styles.about__subtitle}>{t('product.about')}</h2>
            <div className={styles.about__divider} />
            {product.description.map((item, index) => (
              <article key={index} className={styles.about__article}>
                <h3 className={styles['about__article-title']}>{item.title}</h3>
                {item.text.map((paragraph, i) => (
                  <p key={i} className={styles.about__text}>
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </div>

          <div
            className={`${styles['product-details__specs']} ${styles['tech-specs']}`}
          >
            <h2 className={styles['tech-specs__subtitle']}>
              {t('product.tech_specs')}
            </h2>
            <div className={styles['tech-specs__divider']} />
            <div className={styles['tech-specs__list']}>
              <div className={styles['tech-specs__item']}>
                <span>{t('product.screen')}</span>
                <span>{product.screen || '-'}</span>
              </div>
              <div className={styles['tech-specs__item']}>
                <span>{t('product.resolution')}</span>
                <span>{product.resolution || '-'}</span>
              </div>
              <div className={styles['tech-specs__item']}>
                <span>{t('product.processor')}</span>
                <span>{product.processor || '-'}</span>
              </div>
              <div className={styles['tech-specs__item']}>
                <span>{t('product.ram')}</span>
                <span>{product.ram || '-'}</span>
              </div>
              <div className={styles['tech-specs__item']}>
                <span>{t('product.built_in_memory')}</span>
                <span>{product.capacity}</span>
              </div>
              <div className={styles['tech-specs__item']}>
                <span>{t('product.camera')}</span>
                <span>{product.camera || '-'}</span>
              </div>
              <div className={styles['tech-specs__item']}>
                <span>{t('product.zoom')}</span>
                <span>{product.zoom || '-'}</span>
              </div>
              <div className={styles['tech-specs__item']}>
                <span>{t('product.cell')}</span>
                <span>{product.cell.join(', ') || '-'}</span>
              </div>
            </div>
          </div>
        </div>

        <section className={styles['product-details__related']}>
          <div className={styles['product-details__related-header']}>
            <h2 className={styles['product-details__related-title']}>
              {t('product.related_title')}
            </h2>
            <div className={styles['product-details__slider-controls']}>
              <button
                type="button"
                className={`${styles['product-details__slider-btn']} ${styles['product-details__slider-btn--left']}`}
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
              />

              <button
                type="button"
                className={`${styles['product-details__slider-btn']} ${styles['product-details__slider-btn--right']}`}
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
              />
            </div>
          </div>
          <div
            className={styles['product-details__related-list']}
            ref={listRef}
            onScroll={updateScrollButtons}
          >
            {relatedProducts.map(item => (
              <ProductCard key={item.id} product={getMappedProduct(item)} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
