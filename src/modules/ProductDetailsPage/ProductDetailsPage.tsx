import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import {
  getProductDetails,
  getProducts,
  getSuggestedProducts,
} from '../../api/products';
import { Product, ProductDetails } from '../../types/Product';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { Loader } from '../shared/components/Loader';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { Icon } from '../shared/components/Icon';
import { useCart, useFavorites } from '../shared/context';
import styles from './ProductDetailsPage.module.scss';

const COLOR_MAP: Record<string, string> = {
  black: '#1F2020',
  rosegold: '#FAD7BD',
  gold: '#FCDBC1',
  silver: '#E1E2E1',
  spacegray: '#4C4C4C',
  'space gray': '#4C4C4C',
  green: '#AEE1CD',
  yellow: '#FFE681',
  white: '#F9F6EF',
  purple: '#D1CDDA',
  red: '#BA0C2E',
  coral: '#FF6E5A',
  midnightgreen: '#4E5851',
  midnight: '#171E27',
  blue: '#2D4E6E',
  pink: '#FADDD7',
  graphite: '#5C5B57',
  sierrablue: '#A7C1D9',
  spaceblack: '#1B1B1B',
  starlight: '#FAF6F2',
};

function getColorHex(color: string): string {
  const key = color.toLowerCase().replace(/\s+/g, '');

  return COLOR_MAP[key] || COLOR_MAP[color.toLowerCase()] || '#999';
}

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [catalogProduct, setCatalogProduct] = useState<Product | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    setLoading(true);
    setSelectedImage(0);

    Promise.all([
      getProductDetails(productId),
      getProducts(),
      getSuggestedProducts(productId),
    ])
      .then(([detail, products, suggestions]) => {
        setDetails(detail);
        setCatalogProduct(
          products.find(item => item.itemId === productId) ?? null,
        );
        setSuggested(suggestions);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  const inCart = catalogProduct ? isInCart(catalogProduct.itemId) : false;
  const favorite = catalogProduct ? isFavorite(catalogProduct.itemId) : false;

  const categoryPath = useMemo(() => {
    if (!details) {
      return '/phones';
    }

    return `/${details.category}`;
  }, [details]);

  const categoryLabel = details
    ? details.category.charAt(0).toUpperCase() + details.category.slice(1)
    : '';

  const goToVariant = (color: string, capacity: string) => {
    if (!details) {
      return;
    }

    const nextId = `${details.namespaceId}-${capacity.toLowerCase()}-${color.replace(/ /g, '-')}`;

    navigate(`/product/${nextId}`);
  };

  if (loading) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }

  if (!details || !catalogProduct) {
    return (
      <div className={`container ${styles.notFound}`}>
        <h1>Product was not found</h1>
        <img src="img/product-not-found.png" alt="" />
        <Link to="/" className={styles.backLink}>
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className={`container ${styles.page}`}>
      <Breadcrumbs
        items={[
          { label: categoryLabel, to: categoryPath },
          { label: details.name },
        ]}
      />

      <button
        type="button"
        className={styles.back}
        onClick={() => navigate(-1)}
      >
        <Icon name="arrow-left" />
        <span>Back</span>
      </button>

      <h1 className={styles.title}>{details.name}</h1>

      <div className={styles.content}>
        <div className={styles.gallery}>
          <div className={styles.thumbs}>
            {details.images.map((image, index) => (
              <button
                key={image}
                type="button"
                className={classNames(styles.thumb, {
                  [styles.thumbActive]: index === selectedImage,
                })}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
          <div className={styles.mainImage}>
            <img src={details.images[selectedImage]} alt={details.name} />
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.optionBlock}>
            <p className={styles.optionLabel}>Available colors</p>
            <div className={styles.colors}>
              {details.colorsAvailable.map(color => (
                <button
                  key={color}
                  type="button"
                  className={classNames(styles.colorButton, {
                    [styles.colorActive]: color === details.color,
                  })}
                  style={{ backgroundColor: getColorHex(color) }}
                  aria-label={color}
                  onClick={() => goToVariant(color, details.capacity)}
                />
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.optionBlock}>
            <p className={styles.optionLabel}>Select capacity</p>
            <div className={styles.capacities}>
              {details.capacityAvailable.map(capacity => (
                <button
                  key={capacity}
                  type="button"
                  className={classNames(styles.capacityButton, {
                    [styles.capacityActive]: capacity === details.capacity,
                  })}
                  onClick={() => goToVariant(details.color, capacity)}
                >
                  {capacity}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.prices}>
            <span className={styles.price}>${details.priceDiscount}</span>
            {details.priceRegular > details.priceDiscount && (
              <span className={styles.fullPrice}>${details.priceRegular}</span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={classNames(styles.addButton, {
                [styles.added]: inCart,
              })}
              onClick={() => {
                if (!inCart) {
                  addToCart(catalogProduct);
                }
              }}
            >
              {inCart ? 'Added to cart' : 'Add to cart'}
            </button>
            <button
              type="button"
              className={classNames(styles.favButton, {
                [styles.favActive]: favorite,
              })}
              aria-label="Toggle favorite"
              onClick={() => toggleFavorite(catalogProduct)}
            >
              <Icon name={favorite ? 'heart-filled' : 'heart'} />
            </button>
          </div>

          <ul className={styles.shortSpecs}>
            <li>
              <span>Screen</span>
              <span>{details.screen}</span>
            </li>
            <li>
              <span>Resolution</span>
              <span>{details.resolution}</span>
            </li>
            <li>
              <span>Processor</span>
              <span>{details.processor}</span>
            </li>
            <li>
              <span>RAM</span>
              <span>{details.ram}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <section className={styles.about}>
          <h2 className={styles.sectionTitle}>About</h2>
          <div className={styles.divider} />
          {details.description.map(block => (
            <article key={block.title} className={styles.aboutBlock}>
              <h3>{block.title}</h3>
              {block.text.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
        </section>

        <section className={styles.tech}>
          <h2 className={styles.sectionTitle}>Tech specs</h2>
          <div className={styles.divider} />
          <ul className={styles.techList}>
            <li>
              <span>Screen</span>
              <span>{details.screen}</span>
            </li>
            <li>
              <span>Resolution</span>
              <span>{details.resolution}</span>
            </li>
            <li>
              <span>Processor</span>
              <span>{details.processor}</span>
            </li>
            <li>
              <span>RAM</span>
              <span>{details.ram}</span>
            </li>
            <li>
              <span>Built in memory</span>
              <span>{details.capacity}</span>
            </li>
            {details.camera && (
              <li>
                <span>Camera</span>
                <span>{details.camera}</span>
              </li>
            )}
            {details.zoom && (
              <li>
                <span>Zoom</span>
                <span>{details.zoom}</span>
              </li>
            )}
            <li>
              <span>Cell</span>
              <span>{details.cell.join(', ')}</span>
            </li>
          </ul>
        </section>
      </div>

      <ProductsSlider title="You may also like" products={suggested} />
    </div>
  );
};
