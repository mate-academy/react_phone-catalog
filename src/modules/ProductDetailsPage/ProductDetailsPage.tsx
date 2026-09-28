import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { ProductsSlider } from '../../components/ProductsSlider';
import {
  getAllProductDetails,
  getProducts,
  getSuggestedProducts,
} from '../shared/api/products';
import { useCart } from '../shared/context/CartContext';
import { useFavorites } from '../shared/context/FavoritesContext';
import { Product, ProductDetails } from '../shared/types/Product';
import { ProductGallery } from './components/ProductGallery';
import styles from './ProductDetailsPage.module.scss';

const categoryTitles = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const colorMap: Record<string, string> = {
  black: '#1f2020',
  blue: '#276787',
  coral: '#ff7f50',
  gold: '#f5ddc5',
  graphite: '#41424c',
  green: '#394c38',
  midnight: '#1d2733',
  midnightgreen: '#394c38',
  pink: '#f7c9c1',
  purple: '#594f63',
  red: '#ba0c2f',
  rosegold: '#f7c9c1',
  sierrablue: '#9bb5ce',
  silver: '#f1f2ed',
  skyblue: '#9bc9e9',
  spaceblack: '#1f2020',
  spacegray: '#3c3d3f',
  starlight: '#f1f2ed',
  white: '#f1f2f9',
  yellow: '#f5d76e',
};

const getColorHex = (color: string) => {
  return colorMap[color.replace(/\s+/g, '').replace(/-/g, '')] || '#75767f';
};

const getOptionId = (prefix: string, value: string) => {
  return `${prefix}-${value.replace(/\s+/g, '-').toLowerCase()}`;
};

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [details, setDetails] = useState<ProductDetails[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    Promise.all([
      getAllProductDetails(),
      getProducts(),
      getSuggestedProducts(productId),
    ])
      .then(([loadedDetails, loadedProducts, loadedSuggestions]) => {
        setDetails(loadedDetails);
        setProducts(loadedProducts);
        setSuggestedProducts(loadedSuggestions);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [productId]);

  const productDetails = useMemo(() => {
    return details.find(product => product.id === productId) || null;
  }, [details, productId]);

  const product = useMemo(() => {
    return (
      products.find(currentProduct => {
        return currentProduct.itemId === productId;
      }) || null
    );
  }, [productId, products]);

  const navigateToVariant = useCallback(
    (capacity: string, color: string) => {
      if (!productDetails) {
        return;
      }

      const variant = details.find(item => {
        return (
          item.namespaceId === productDetails.namespaceId &&
          item.capacity === capacity &&
          item.color === color
        );
      });

      if (variant) {
        navigate(`/product/${variant.id}`);
      }
    },
    [details, navigate, productDetails],
  );

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return <p>Something went wrong</p>;
  }

  if (!productDetails || !product) {
    return (
      <section className={styles.state}>
        <h1>Product was not found</h1>
      </section>
    );
  }

  const isAddedToCart = isInCart(product.itemId);
  const isAddedToFavorites = isFavorite(product.itemId);
  const specs = [
    ['Screen', productDetails.screen],
    ['Resolution', productDetails.resolution],
    ['Processor', productDetails.processor],
    ['RAM', productDetails.ram],
    ['Camera', productDetails.camera],
    ['Zoom', productDetails.zoom],
    ['Cell', productDetails.cell.join(', ')],
  ].filter(([, value]) => Boolean(value));

  return (
    <section>
      <Breadcrumbs
        items={[
          {
            label: categoryTitles[productDetails.category],
            to: `/${productDetails.category}`,
          },
          { label: productDetails.name },
        ]}
      />

      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(`/${productDetails.category}`)}
      >
        <i className="fa-solid fa-chevron-left" />
        Back
      </button>

      <h1>{productDetails.name}</h1>

      <div className={styles.hero}>
        <ProductGallery
          images={productDetails.images}
          name={productDetails.name}
        />

        <div className={styles.options}>
          <fieldset className={styles.optionGroup}>
            <legend>Available colors</legend>

            <div className={styles.colors}>
              {productDetails.colorsAvailable.map(color => {
                const colorId = getOptionId('color', color);

                return (
                  <label
                    className={styles.color}
                    key={color}
                    htmlFor={colorId}
                    title={color}
                  >
                    <input
                      id={colorId}
                      type="radio"
                      name="color"
                      checked={productDetails.color === color}
                      onChange={() => {
                        navigateToVariant(productDetails.capacity, color);
                      }}
                    />

                    <span style={{ backgroundColor: getColorHex(color) }} />
                    <span className="visually-hidden">{color}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset className={styles.optionGroup}>
            <legend>Select capacity</legend>

            <div className={styles.capacities}>
              {productDetails.capacityAvailable.map(capacity => {
                const capacityId = getOptionId('capacity', capacity);

                return (
                  <label key={capacity} htmlFor={capacityId}>
                    <input
                      id={capacityId}
                      type="radio"
                      name="capacity"
                      checked={productDetails.capacity === capacity}
                      onChange={() => {
                        navigateToVariant(capacity, productDetails.color);
                      }}
                    />

                    <span>{capacity}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className={styles.priceRow}>
            <span>${productDetails.priceDiscount}</span>
            <del>${productDetails.priceRegular}</del>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={classNames(styles.cartButton, {
                [styles.cartButtonAdded]: isAddedToCart,
              })}
              onClick={() => addToCart(product)}
            >
              {isAddedToCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              type="button"
              aria-label="Toggle favorite"
              className={classNames(styles.favoriteButton, {
                [styles.favoriteButtonActive]: isAddedToFavorites,
              })}
              onClick={() => toggleFavorite(product)}
            >
              <i
                className={classNames(
                  isAddedToFavorites ? 'fa-solid' : 'fa-regular',
                  'fa-heart',
                )}
              />
            </button>
          </div>

          <dl className={styles.summarySpecs}>
            <div>
              <dt>Screen</dt>
              <dd>{productDetails.screen}</dd>
            </div>

            <div>
              <dt>Resolution</dt>
              <dd>{productDetails.resolution}</dd>
            </div>

            <div>
              <dt>Processor</dt>
              <dd>{productDetails.processor}</dd>
            </div>

            <div>
              <dt>RAM</dt>
              <dd>{productDetails.ram}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className={styles.infoGrid}>
        <section className={styles.about}>
          <h2>About</h2>

          {productDetails.description.map(section => (
            <article key={section.title}>
              <h3>{section.title}</h3>

              {section.text.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
        </section>

        <section className={styles.techSpecs}>
          <h2>Tech specs</h2>

          <dl>
            {specs.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <ProductsSlider title="You may also like" products={suggestedProducts} />
    </section>
  );
};
