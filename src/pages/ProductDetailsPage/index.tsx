import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getCategoryTitle,
  getProductById,
  getSuggestedProducts,
} from '../../api/products';
import { Product } from '../../types';
import { AppContext } from '../../context/AppContext';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { ProductList } from '../../components/ProductList';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [product, setProduct] = useState<Product | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setLoading(true);
    setError(false);
    getProductById(productId)
      .then(item => {
        if (!item) {
          setProduct(null);

          return;
        }

        setProduct(item);
        setSelectedColor(item.color);
        setSelectedCapacity(item.capacity);

        return getSuggestedProducts(productId, 4);
      })
      .then(items => {
        if (items) {
          setSuggested(items);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [productId]);

  const handleAddToCart = () => {
    if (!product || !context) {
      return;
    }

    context.addToCart(product);
  };

  const breadcrumbs = useMemo(() => {
    if (!product) {
      return [];
    }

    const categoryTitle = getCategoryTitle(product.category);

    return [
      { title: 'Home', href: '/' },
      { title: categoryTitle, href: `/${product.category}` },
      { title: product.name },
    ];
  }, [product]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.errorBlock}>
        <p>Unable to load product details.</p>
        <button type="button" onClick={() => window.location.reload()}>
          Reload
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Product was not found</h1>
        <button type="button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Breadcrumbs items={breadcrumbs} />
      <div className={styles.topRow}>
        <div className={styles.gallery}>
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className={styles.mainImage}
          />
          <div className={styles.thumbs}>
            {product.images.map((img, index) => (
              <button
                key={img}
                type="button"
                className={
                  selectedImage === index ? styles.thumbActive : styles.thumb
                }
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.name} ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>
        <div className={styles.detailsPanel}>
          <h1>{product.name}</h1>
          <p className={styles.price}>${product.priceDiscount}</p>
          <div className={styles.selectionGroup}>
            <div>
              <h3>Choose color</h3>
              <div className={styles.optionsRow}>
                {product.colorsAvailable.map(color => (
                  <label key={color} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="color"
                      checked={selectedColor === color}
                      onChange={() => setSelectedColor(color)}
                    />
                    <span>{color}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3>Choose capacity</h3>
              <div className={styles.optionsRow}>
                {product.capacityAvailable.map(capacity => (
                  <label key={capacity} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="capacity"
                      checked={selectedCapacity === capacity}
                      onChange={() => setSelectedCapacity(capacity)}
                    />
                    <span>{capacity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
      <section className={styles.descriptionSection}>
        <h2>About</h2>
        {product.description.map(block => (
          <div key={block.title} className={styles.descriptionBlock}>
            <h3>{block.title}</h3>
            {block.text.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ))}
      </section>
      <section className={styles.techSpecs}>
        <h2>Tech specs</h2>
        <div className={styles.specList}>
          <div>
            <strong>Screen</strong>
            <span>{product.screen}</span>
          </div>
          <div>
            <strong>Resolution</strong>
            <span>{product.resolution}</span>
          </div>
          <div>
            <strong>Processor</strong>
            <span>{product.processor}</span>
          </div>
          <div>
            <strong>RAM</strong>
            <span>{product.ram}</span>
          </div>
          <div>
            <strong>Camera</strong>
            <span>{product.camera}</span>
          </div>
          <div>
            <strong>Zoom</strong>
            <span>{product.zoom ?? '–'}</span>
          </div>
        </div>
      </section>
      <section className={styles.suggested}>
        <h2>You may also like</h2>
        {suggested.length ? (
          <ProductList products={suggested} />
        ) : (
          <p>No suggestions available.</p>
        )}
      </section>
    </div>
  );
};
