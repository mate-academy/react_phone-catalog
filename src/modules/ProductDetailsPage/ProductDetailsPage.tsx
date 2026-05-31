import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { ProductCard } from '../../components/ProductCard';
import { useCart } from '../../contexts/CartContext';
import {
  fetchProductDetails,
  getSuggestedProducts,
} from '../../services/products';
import styles from './ProductDetailsPage.module.scss';
import type { Product } from '../../types';

const categoryNames: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [currentImage, setCurrentImage] = useState('');
  const { addToCart, removeFromCart, isInCart } = useCart();

  useEffect(() => {
    if (!productId) {
      return;
    }

    setLoading(true);
    setError(false);
    fetchProductDetails(productId)
      .then(item => {
        if (!item) {
          setProduct(null);

          return;
        }

        setProduct(item);
        setCurrentImage(item.images?.[0] ?? item.image ?? '');
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [productId]);

  useEffect(() => {
    if (!productId) {
      return;
    }

    getSuggestedProducts(productId).then(setSuggested);
  }, [productId]);

  const productExists = Boolean(product);
  const productCategory = product?.category
    ? categoryNames[product.category]
    : null;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.message}>
        Something went wrong while loading the product.
      </div>
    );
  }

  if (!productExists) {
    return (
      <div className={styles.message}>
        <p>Product was not found</p>
        <button type="button" onClick={() => navigate('/')}>
          Back to home
        </button>
      </div>
    );
  }

  const price =
    product.price ?? product.priceDiscount ?? product.priceRegular ?? 0;
  const oldPrice = product.fullPrice ?? product.priceRegular ?? 0;
  const routeCategory = product.category;
  const selectedColor = product.color ?? product.colorsAvailable?.[0] ?? '';
  const selectedCapacity =
    product.capacity ?? product.capacityAvailable?.[0] ?? '';
  const cartProductId = (product.itemId || product.id).toString();
  const isProductInCart = isInCart(cartProductId);

  const getConfigurationId = (capacity: string, color: string) => {
    const capacitySlug = capacity.toLowerCase();
    const colorSlug = color.toLowerCase().replace(/\s+/g, '-');

    return `${product.namespaceId ?? product.id}-${capacitySlug}-${colorSlug}`;
  };

  const updateConfiguration = (capacity: string, color: string) => {
    const nextProductId = getConfigurationId(capacity, color);

    navigate(`/product/${nextProductId}`);
  };

  const toggleCart = () => {
    if (isProductInCart) {
      removeFromCart(cartProductId);

      return;
    }

    addToCart(product);
  };

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumbs}>
        <button
          type="button"
          className={styles.link}
          onClick={() => navigate('/')}
        >
          Home
        </button>
        <span>›</span>
        <button
          type="button"
          className={styles.link}
          onClick={() => navigate(`/${routeCategory}`)}
        >
          {productCategory}
        </button>
        <span>›</span>
        <span>{product.name}</span>
      </div>
      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
      <section className={styles.details}>
        <div className={styles.imageColumn}>
          <img
            src={currentImage}
            alt={product.name}
            className={styles.mainImage}
          />
          <div className={styles.thumbs}>
            {product.images?.map(image => (
              <button
                key={image}
                type="button"
                onClick={() => setCurrentImage(image)}
                className={image === currentImage ? styles.activeThumb : ''}
              >
                <img src={image} alt={product.name} />
              </button>
            ))}
          </div>
        </div>
        <div className={styles.infoColumn}>
          <h1>{product.name}</h1>
          <div className={styles.priceBlock}>
            <strong>€{price}</strong>
            {oldPrice > price && <span>€{oldPrice}</span>}
          </div>
          <div className={styles.selectors}>
            {product.colorsAvailable && (
              <div>
                <h3>Color</h3>
                <div className={styles.options}>
                  {product.colorsAvailable.map(color => (
                    <label key={color} className={styles.optionLabel}>
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        checked={selectedColor === color}
                        onChange={() =>
                          updateConfiguration(selectedCapacity, color)
                        }
                      />
                      <span>{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            {product.capacityAvailable && (
              <div>
                <h3>Capacity</h3>
                <div className={styles.options}>
                  {product.capacityAvailable.map(capacity => (
                    <label key={capacity} className={styles.optionLabel}>
                      <input
                        type="radio"
                        name="capacity"
                        value={capacity}
                        checked={selectedCapacity === capacity}
                        onChange={() =>
                          updateConfiguration(capacity, selectedColor)
                        }
                      />
                      <span>{capacity}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            className={styles.cartButton}
            onClick={toggleCart}
          >
            {isProductInCart ? 'Remove from cart' : 'Add to cart'}
          </button>
        </div>
      </section>
      <section className={styles.about}>
        <h2>About</h2>
        {product.description?.map(block => (
          <div key={block.title} className={styles.block}>
            <h3>{block.title}</h3>
            {block.text.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ))}
      </section>
      <section className={styles.specs}>
        <h2>Tech specs</h2>
        <div className={styles.specsGrid}>
          {product.screen && (
            <div>
              <strong>Screen</strong>
              <span>{product.screen}</span>
            </div>
          )}
          {product.resolution && (
            <div>
              <strong>Resolution</strong>
              <span>{product.resolution}</span>
            </div>
          )}
          {product.processor && (
            <div>
              <strong>Processor</strong>
              <span>{product.processor}</span>
            </div>
          )}
          {product.ram && (
            <div>
              <strong>RAM</strong>
              <span>{product.ram}</span>
            </div>
          )}
          {product.camera && (
            <div>
              <strong>Camera</strong>
              <span>{product.camera}</span>
            </div>
          )}
          {product.zoom && (
            <div>
              <strong>Zoom</strong>
              <span>{product.zoom}</span>
            </div>
          )}
        </div>
      </section>
      {suggested.length > 0 && (
        <section className={styles.suggested}>
          <h2>You may also like</h2>
          <div className={styles.suggestedList}>
            {suggested.map(item => (
              <ProductCard key={item.itemId || item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};
