import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { ProductDetails } from '../../types/ProductDetails';
import type { Category, Product } from '../../types/Product';
import {
  getProductDetails,
  getProducts,
  getSuggestedProducts,
} from '../../api/products';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { Loader } from '../shared/components/Loader';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import {
  ArrowLeftIcon,
  HeartIcon,
  HeartFilledIcon,
} from '../shared/components/Icons/Icons';
import { useCart } from '../shared/context/CartContext';
import { useFavorites } from '../shared/context/FavoritesContext';
import { getSwatchColor } from './colors';
import styles from './ProductDetailsPage.module.scss';

const categoryLabels: Record<Category, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [shortProduct, setShortProduct] = useState<Product | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState('');
  const [color, setColor] = useState('');
  const [capacity, setCapacity] = useState('');

  useEffect(() => {
    if (!productId) {
      return;
    }

    // Arriving from "You may also like" must not keep the previous scroll.
    window.scrollTo({ top: 0 });
    setIsLoading(true);

    Promise.all([getProductDetails(productId), getProducts()])
      .then(([found, allProducts]) => {
        setProduct(found);
        setShortProduct(
          allProducts.find(item => item.itemId === productId) ?? null,
        );

        if (found) {
          setImage(found.images[0]);
          setColor(found.color);
          setCapacity(found.capacity);
          getSuggestedProducts(found.category, productId).then(setSuggested);
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setIsLoading(false));
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <section className="page">
        <p className="page__empty">Product was not found</p>
      </section>
    );
  }

  const imageUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;
  const inCart = isInCart(product.id);
  const favorite = isFavorite(product.id);

  const handleAddToCart = () => {
    if (shortProduct) {
      addToCart(shortProduct);
    }
  };

  const mainSpecs: [string, string][] = [
    ['Screen', product.screen],
    ['Resolution', product.resolution],
    ['Processor', product.processor],
    ['RAM', product.ram],
  ];

  const techSpecs: [string, string][] = [...mainSpecs];

  techSpecs.push(['Built in memory', product.capacity]);

  if (product.camera) {
    techSpecs.push(['Camera', product.camera]);
  }

  if (product.zoom) {
    techSpecs.push(['Zoom', product.zoom]);
  }

  if (product.cell.length) {
    techSpecs.push(['Cell', product.cell.join(', ')]);
  }

  return (
    <section className="page">
      <Breadcrumbs
        items={[
          {
            label: categoryLabels[product.category],
            to: `/${product.category}`,
          },
          { label: product.name },
        ]}
      />

      <button
        type="button"
        className={styles.back}
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon size={12} />
        Back
      </button>

      <h1 className="page__title">{product.name}</h1>

      <div className={styles.main}>
        <div className={styles.thumbnails}>
          {product.images.map(src => (
            <button
              type="button"
              key={src}
              className={
                src === image
                  ? `${styles.thumb} ${styles.thumbActive}`
                  : styles.thumb
              }
              aria-label="Show this picture"
              aria-pressed={src === image}
              onClick={() => setImage(src)}
            >
              <img src={imageUrl(src)} alt="" loading="lazy" />
            </button>
          ))}
        </div>

        <div className={styles.mainImage}>
          <img src={imageUrl(image)} alt={product.name} />
        </div>

        <div className={styles.options}>
          <div className={styles.optionsHead}>
            <p className={styles.optionLabel}>Available colors</p>
            {shortProduct && <p className={styles.id}>ID: {shortProduct.id}</p>}
          </div>

          <div className={styles.colors}>
            {product.colorsAvailable.map(value => (
              <label
                key={value}
                className={
                  color === value
                    ? `${styles.color} ${styles.colorActive}`
                    : styles.color
                }
              >
                <input
                  type="radio"
                  name="color"
                  value={value}
                  checked={color === value}
                  className="visually-hidden"
                  onChange={() => setColor(value)}
                />
                <span
                  className={styles.swatch}
                  style={{ backgroundColor: getSwatchColor(value) }}
                />
                <span className="visually-hidden">{value}</span>
              </label>
            ))}
          </div>

          <div className={styles.divider} />

          <p className={styles.optionLabel}>Select capacity</p>

          <div className={styles.capacities}>
            {product.capacityAvailable.map(value => (
              <label
                key={value}
                className={
                  capacity === value
                    ? `${styles.capacity} ${styles.capacityActive}`
                    : styles.capacity
                }
              >
                <input
                  type="radio"
                  name="capacity"
                  value={value}
                  checked={capacity === value}
                  className="visually-hidden"
                  onChange={() => setCapacity(value)}
                />
                {value}
              </label>
            ))}
          </div>

          <div className={styles.divider} />

          <p className={styles.priceRow}>
            <span className={styles.priceCurrent}>
              ${product.priceDiscount}
            </span>
            {product.priceRegular !== product.priceDiscount && (
              <span className={styles.priceOld}>${product.priceRegular}</span>
            )}
          </p>

          <div className={styles.actions}>
            <button
              type="button"
              className={
                inCart
                  ? `${styles.addToCart} ${styles.addedToCart}`
                  : styles.addToCart
              }
              disabled={!shortProduct || inCart}
              onClick={handleAddToCart}
            >
              {inCart ? 'Added to cart' : 'Add to cart'}
            </button>

            {shortProduct && (
              <button
                type="button"
                className={
                  favorite
                    ? `${styles.favorite} ${styles.favoriteActive}`
                    : styles.favorite
                }
                aria-label="Toggle favorite"
                aria-pressed={favorite}
                onClick={() => toggleFavorite(shortProduct)}
              >
                {favorite ? (
                  <HeartFilledIcon size={16} />
                ) : (
                  <HeartIcon size={16} />
                )}
              </button>
            )}
          </div>

          <dl className={styles.shortSpecs}>
            {mainSpecs.map(([label, value]) => (
              <div className={styles.specRow} key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className={styles.info}>
        <section className={styles.about}>
          <h2 className={styles.sectionTitle}>About</h2>
          <div className={styles.divider} />

          {product.description.map(block => (
            <article key={block.title}>
              <h3>{block.title}</h3>
              {block.text.map(text => (
                <p key={text}>{text}</p>
              ))}
            </article>
          ))}
        </section>

        <section className={styles.tech}>
          <h2 className={styles.sectionTitle}>Tech specs</h2>
          <div className={styles.divider} />

          <dl className={styles.techList}>
            {techSpecs.map(([label, value]) => (
              <div className={styles.specRow} key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      {suggested.length > 0 && (
        <ProductsSlider title="You may also like" products={suggested} />
      )}
    </section>
  );
};
