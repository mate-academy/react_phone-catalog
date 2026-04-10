import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductDetails';
import { useCart } from '../../context/CartContext';
import { Icon } from '../../components/Icon';
import { toCartProduct, getSuggestedProducts } from '../../utils/productUtils';
import styles from './ProductDetails.module.scss';
import { Loader } from '../../components/Loader';
import { ProductSlider } from '../../components/ProductSlider';
import { Product } from '../../types/Product';

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [suggested, setSuggested] = useState<Product[]>([]);

  const { addToCart, addToFavorites, isInCart, isInFavorites } = useCart();

  useEffect(() => {
    if (!productId) {
      return;
    }

    setLoading(true);
    setError(false);
    setSelectedImage(0);

    fetch('/api/products.json')
      .then(res => res.json())
      .then(products => {
        const found = products.find(
          (p: { itemId: string; category: string }) => p.itemId === productId,
        );

        if (!found) {
          setLoading(false);
          setError(true);

          return null;
        }

        return fetch(`/api/${found.category}.json`);
      })
      .then(res => res?.json())
      .then(details => {
        if (!details) {
          return;
        }

        const detail = details.find((p: ProductDetails) => p.id === productId);

        if (!detail) {
          setError(true);
        } else {
          setProduct(detail);
          setSelectedColor(detail.color);
          setSelectedCapacity(detail.capacity);
          getSuggestedProducts(productId).then(setSuggested);
        }

        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <div className={styles.page}>
        <Loader />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.page}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <Icon name="left" />
          <span>Back</span>
        </button>
        <p className={styles.notFound}>Product was not found</p>
      </div>
    );
  }

  const cartProduct = toCartProduct(product);
  const inCart = isInCart(cartProduct.id);
  const inFavorites = isInFavorites(cartProduct.id);

  const techSpecs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    { label: 'Built in memory', value: product.capacity },
    { label: 'Camera', value: product.camera },
    { label: 'Zoom', value: product.zoom },
    { label: 'Cell', value: product.cell?.join(', ') },
  ].filter(item => item.value);

  const shortSpecs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
  ];

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumbs__link}>
          <Icon name="home" />
        </Link>
        <span className={styles.breadcrumbs__arrow}>&gt;</span>
        <Link to={`/${product.category}`} className={styles.breadcrumbs__link}>
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <span className={styles.breadcrumbs__arrow}>&gt;</span>
        <span className={styles.breadcrumbs__current}>{product.name}</span>
      </nav>

      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <Icon name="left" />
        <span>Back</span>
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.main}>
        <div className={styles.gallery}>
          <div className={styles.gallery__thumbs}>
            {product.images.map((img, index) => (
              <button
                key={img}
                className={`${styles.gallery__thumb} ${
                  selectedImage === index
                    ? styles['gallery__thumb--active']
                    : ''
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.name} view ${index + 1}`} />
              </button>
            ))}
          </div>

          <div className={styles.gallery__main}>
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className={styles.gallery__image}
            />
          </div>
        </div>

        <div className={styles.options}>
          <div className={styles.options__section}>
            <span className={styles.options__label}>Available colors</span>
            <div className={styles.options__colors}>
              {product.colorsAvailable.map(color => (
                <button
                  key={color}
                  className={`${styles.colorBtn} ${
                    selectedColor === color ? styles['colorBtn--active'] : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.options__section}>
            <span className={styles.options__label}>Select capacity</span>
            <div className={styles.options__capacities}>
              {product.capacityAvailable.map(cap => (
                <button
                  key={cap}
                  className={`${styles.capBtn} ${
                    selectedCapacity === cap ? styles['capBtn--active'] : ''
                  }`}
                  onClick={() => setSelectedCapacity(cap)}
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.price}>
            <span className={styles.price__current}>
              ${product.priceDiscount}
            </span>
            <span className={styles.price__old}>${product.priceRegular}</span>
          </div>

          <div className={styles.actions}>
            <button
              className={`${styles.actions__cart} ${
                inCart ? styles['actions__cart--added'] : ''
              }`}
              onClick={() => addToCart(cartProduct)}
            >
              {inCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              className={`${styles.actions__favorite} ${
                inFavorites ? styles['actions__favorite--active'] : ''
              }`}
              onClick={() => addToFavorites(cartProduct)}
            >
              <Icon name={inFavorites ? 'favoriteActive' : 'favourite'} />
            </button>
          </div>

          <div className={styles.specs}>
            {shortSpecs.map(({ label, value }) => (
              <div key={label} className={styles.specs__row}>
                <span className={styles.specs__label}>{label}</span>
                <span className={styles.specs__value}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <section className={styles.about}>
          <h2 className={styles.section__title}>About</h2>
          <div className={styles.divider} />
          {product.description.map(({ title, text }) => (
            <div key={title} className={styles.about__item}>
              <h3 className={styles.about__subtitle}>{title}</h3>
              {text.map((paragraph, i) => (
                <p key={i} className={styles.about__text}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </section>

        <section className={styles.techSpecs}>
          <h2 className={styles.section__title}>Tech specs</h2>
          <div className={styles.divider} />
          {techSpecs.map(({ label, value }) => (
            <div key={label} className={styles.specs__row}>
              <span className={styles.specs__label}>{label}</span>
              <span className={styles.specs__value}>{value}</span>
            </div>
          ))}
        </section>
      </div>
      {suggested.length > 0 && (
        <ProductSlider
          id="suggested"
          title="You may also like"
          products={suggested}
          autoplay={true}
        />
      )}
    </div>
  );
};
