import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import classNames from 'classnames';
import { getProductById, getProducts } from '../../api/api';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsSlider } from '../../components/ProductsSlider';
import { useStore } from '../../context/StoreContext';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const { productId, category } = useParams<{
    productId: string;
    category: string;
  }>();
  const navigate = useNavigate();
  const { cart, favorites, addToCart, toggleFavorite } = useStore();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [mainImage, setMainImage] = useState<string>('');

  // useEffect(() => {
  //   if (!productId) {
  //     return;
  //   }

  //   setIsLoading(true);
  //   setIsError(false);

  //   // Завантажуємо деталі товару та рекомендовані товари паралельно
  //   Promise.all([getProductById(productId), getProducts()])
  //     .then(([detailsData, allProducts]) => {
  //       setProduct(detailsData);

  //       setMainImage(detailsData.images[0]);

  //       // Рандомізуємо та беремо 8 товарів для "You may also like"
  //       const filteredSuggested = allProducts.filter(
  //         p => p.itemId !== productId,
  //       );

  //       setSuggested(
  //         filteredSuggested.sort(() => 0.5 - Math.random()).slice(0, 8),
  //       );
  //     })
  //     .catch(() => {
  //       return setIsError(true);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, [productId]);

  useEffect(() => {
    if (!productId || !category) {
      return;
    }

    setIsLoading(true);
    setIsError(false);

    Promise.all([getProductById(category, productId), getProducts()])
      .then(([detailsData, allProducts]) => {
        setProduct(detailsData);
        setMainImage(detailsData.images[0]);

        // "You may also like"
        const filteredSuggested = allProducts.filter(
          p => p.itemId !== productId,
        );

        setSuggested(
          filteredSuggested.sort(() => 0.5 - Math.random()).slice(0, 8),
        );
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [productId, category]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !product) {
    return (
      <div className={styles.details}>
        <Breadcrumbs />
        <button className={styles.details__back} onClick={() => navigate(-1)}>
          <i className="fas fa-chevron-left"></i>
          <span>Back</span>
        </button>
        <h2 className={styles.details__title}>Product was not found</h2>
      </div>
    );
  }

  const inCart = cart.some(item => item.id === product.id);
  const isFavorite = favorites.some(item => item.id === product.id);

  // Хелпери для генерації посилань на інші конфігурації
  const getProductUrl = (newColor: string, newCapacity: string) => {
    const capacityFormatted = newCapacity.toLowerCase().replace(' ', '');

    return `/${category}/${product.namespaceId}-${capacityFormatted}-${newColor}`;
  };

  return (
    <div className={styles.details} data-cy="ProductDetailsPage">
      <Breadcrumbs />

      <button
        className={styles.details__back}
        onClick={() => navigate(-1)}
        data-cy="backButton"
      >
        <i className="fas fa-chevron-left"></i>
        <span>Back</span>
      </button>

      <h1 className={styles.details__title}>{product.name}</h1>

      <div className="columns is-desktop is-variable is-8">
        <div className="column is-half-desktop">
          <div className={styles.gallery}>
            <div className={styles.gallery__thumbnails}>
              {product.images.map(img => (
                <button
                  key={img}
                  className={classNames(styles.gallery__thumb, {
                    [styles['gallery__thumb--active']]: img === mainImage,
                  })}
                  onClick={() => setMainImage(img)}
                >
                  <img
                    src={img}
                    alt="Thumbnail"
                    className={styles['gallery__thumb-img']}
                  />
                </button>
              ))}
            </div>
            <div className={styles.gallery__main}>
              <img
                src={mainImage}
                alt={product.name}
                className={styles['gallery__main-img']}
              />
            </div>
          </div>
        </div>

        <div className="column is-half-desktop">
          <div className={styles.options}>
            <div className={styles.options__block}>
              <div className={styles.options__header}>
                <span className={styles['options__header-title']}>
                  Available colors
                </span>
                <span className={styles['options__header-id']}>
                  ID: {product.id}
                </span>
              </div>
              <div className={styles.options__colors}>
                {product.colorsAvailable.map(color => (
                  <Link
                    key={color}
                    to={getProductUrl(color, product.capacity)}
                    className={classNames(styles.options__color, {
                      [styles['options__color--active']]:
                        color === product.color,
                    })}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            <div className={styles.options__block}>
              <span className={styles['options__header-title']}>
                Select capacity
              </span>
              <div className={styles.options__capacities}>
                {product.capacityAvailable.map(cap => (
                  <Link
                    key={cap}
                    to={getProductUrl(product.color, cap)}
                    className={classNames(styles.options__capacity, {
                      [styles['options__capacity--active']]:
                        cap === product.capacity,
                    })}
                  >
                    {cap}
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.details__prices}>
              <span className={styles['details__price-discount']}>
                ${product.priceDiscount}
              </span>
              <span className={styles['details__price-regular']}>
                ${product.priceRegular}
              </span>
            </div>

            <div className={styles.details__actions}>
              <button
                className={classNames(styles['details__add-to-cart'], {
                  [styles['details__add-to-cart--added']]: inCart,
                })}
                onClick={() =>
                  !inCart && addToCart(product as unknown as Product)
                }
              >
                {inCart ? 'Added to cart' : 'Add to cart'}
              </button>
              <button
                className={classNames(styles.details__favorite, {
                  [styles['details__favorite--active']]: isFavorite,
                })}
                onClick={() => toggleFavorite(product as unknown as Product)}
              >
                <i className={isFavorite ? 'fas fa-heart' : 'far fa-heart'}></i>
              </button>
            </div>

            <div className={styles.details__specs_short}>
              <div className={styles.spec}>
                <span className={styles['spec-name']}>Screen</span>
                <span className={styles['spec-value']}>{product.screen}</span>
              </div>
              <div className={styles.spec}>
                <span className={styles['spec-name']}>Resolution</span>
                <span className={styles['spec-value']}>
                  {product.resolution}
                </span>
              </div>
              <div className={styles.spec}>
                <span className={styles['spec-name']}>Processor</span>
                <span className={styles['spec-value']}>
                  {product.processor}
                </span>
              </div>
              <div className={styles.spec}>
                <span className={styles['spec-name']}>RAM</span>
                <span className={styles['spec-value']}>{product.ram}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="columns is-desktop is-variable is-8"
        style={{ marginTop: '56px', marginBottom: '56px' }}
      >
        <div className="column is-half-desktop">
          <h2 className={styles.details__subtitle}>About</h2>
          <div className={styles.details__divider} />
          <div className={styles.about}>
            {product.description.map((desc, idx) => (
              <div key={idx} className={styles.about__section}>
                <h3 className={styles.about__title}>{desc.title}</h3>
                {desc.text.map((p, i) => (
                  <p key={i} className={styles.about__text}>
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="column is-half-desktop">
          <h2 className={styles.details__subtitle}>Tech specs</h2>
          <div className={styles.details__divider} />
          <div className={styles.details__specs_full}>
            {[
              { label: 'Screen', value: product.screen },
              { label: 'Resolution', value: product.resolution },
              { label: 'Processor', value: product.processor },
              { label: 'RAM', value: product.ram },
              { label: 'Built in memory', value: product.capacity },
              { label: 'Camera', value: product.camera },
              { label: 'Zoom', value: product.zoom },
              { label: 'Cell', value: product.cell.join(', ') },
            ].map((item, idx) => (
              <div key={idx} className={styles.spec}>
                <span className={styles['spec-name']}>{item.label}</span>
                <span className={styles['spec-value']}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProductsSlider title="You may also like" products={suggested} />
    </div>
  );
};
