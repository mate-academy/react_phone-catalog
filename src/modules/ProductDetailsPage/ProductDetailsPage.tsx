import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getProductDetails, getSuggestedProducts } from '../../shared/data/api';
import type { Product } from '../../shared/types';
import { useShop } from '../../shared/context/ShopContext';
import styles from './ProductDetailsPage.module.scss';

const categoryLabels: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export function ProductDetailsPage() {
  const { productId = '' } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [color, setColor] = useState('');
  const [capacity, setCapacity] = useState('');
  const { toggleCart, isInCart } = useShop();

  useEffect(() => {
    let alive = true;

    setLoading(true);
    setError(false);
    setProduct(null);
    setImageIndex(0);
    getProductDetails(productId)
      .then(result => {
        if (!alive) {
          return;
        }

        setProduct(result);
        if (result) {
          setColor(result.color ?? result.colorsAvailable?.[0] ?? '');
          setCapacity(result.capacity ?? result.capacityAvailable?.[0] ?? '');

          return getSuggestedProducts(result.id, result.category);
        }

        return [];
      })
      .then(items => {
        if (alive) {
          setSuggested(items);
        }
      })
      .catch(() => {
        if (alive) {
          setError(true);
        }
      })
      .finally(() => {
        if (alive) {
          setLoading(false);
        }
      });

    return () => {
      alive = false;
    };
  }, [productId]);

  if (loading) {
    return (
      <section className={styles.page}>
        <p>Loading product…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.page}>
        <p>Something went wrong.</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </section>
    );
  }

  if (!product) {
    return (
      <section className={styles.page}>
        <p>Product was not found</p>
        <Link to="/">Go to home</Link>
      </section>
    );
  }

  const handleParamChange = (newColor: string, newCapacity: string) => {
    if (!product) {
      return;
    }

    const targetColor = newColor.toLowerCase().replace(/\s+/g, '-');
    const targetCapacity = newCapacity.toLowerCase();

    const currentColor = (product.color || color)
      .toLowerCase()
      .replace(/\s+/g, '-');
    const currentCapacity = (product.capacity || capacity).toLowerCase();

    let newId = product.id;

    if (newId.includes(currentCapacity) && newId.includes(currentColor)) {
      newId = newId
        .replace(currentCapacity, targetCapacity)
        .replace(currentColor, targetColor);
    } else {
      newId = `${product.category}-${product.namespaceId || product.id.split('-')[1]}-${targetCapacity}-${targetColor}`;
    }

    navigate(`/product/${newId}`);
  };

  const getPicturesForColor = () => {
    const sourceImages =
      Array.isArray(product.images) && product.images.length > 0
        ? product.images
        : [product.image];

    const rawColor = color || product.colorsAvailable?.[0] || '';
    const currentColor = rawColor.toLowerCase().replace(/\s+/g, '-');

    return sourceImages
      .map(imgPath => {
        if (!imgPath) {
          return '';
        }

        const parts = imgPath.split('/');

        if (parts.length >= 2 && currentColor) {
          parts[parts.length - 2] = currentColor;
        }

        return parts.join('/');
      })
      .filter(Boolean);
  };

  const pictures = getPicturesForColor();

  return (
    <section className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> ›{' '}
        <Link to={`/${product.category}`}>
          {categoryLabels[product.category] || product.category}
        </Link>{' '}
        › {product.name}
      </div>
      <button className={styles.back} onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1>{product.name}</h1>
      <div className={styles.details}>
        <div className={styles.gallery}>
          <div className={styles.thumbs}>
            {pictures.map((src, index) => (
              <button
                key={src}
                className={imageIndex === index ? styles.selected : ''}
                onClick={() => setImageIndex(index)}
              >
                <img src={src} alt={`${product.name} ${index + 1}`} />
              </button>
            ))}
          </div>
          <div className={styles.mainImage}>
            <img src={pictures[imageIndex] || pictures[0]} alt={product.name} />
          </div>
        </div>
        <div className={styles.options}>
          {product.colorsAvailable?.length ? (
            <fieldset>
              <legend>Available colors</legend>
              {product.colorsAvailable.map(item => (
                <label
                  key={item}
                  className={color === item ? styles.chosen : ''}
                >
                  <input
                    type="radio"
                    name="color"
                    value={item}
                    checked={color === item}
                    onChange={() => {
                      setColor(item);
                      setImageIndex(0);
                      handleParamChange(item, capacity);
                    }}
                  />
                  {item}
                </label>
              ))}
            </fieldset>
          ) : null}
          {product.capacityAvailable?.length ? (
            <fieldset>
              <legend>Capacity</legend>
              {product.capacityAvailable.map(item => (
                <label
                  key={item}
                  className={capacity === item ? styles.chosen : ''}
                >
                  <input
                    type="radio"
                    name="capacity"
                    value={item}
                    checked={capacity === item}
                    onChange={() => {
                      setCapacity(item);
                      handleParamChange(color, item);
                    }}
                  />
                  {item}
                </label>
              ))}
            </fieldset>
          ) : null}
          <div className={styles.price}>
            <strong>${product.price}</strong>
            {product.fullPrice && <del>${product.fullPrice}</del>}
          </div>
          <button className={styles.add} onClick={() => toggleCart(product)}>
            {isInCart(product.id) ? 'Added to cart' : 'Add to cart'}
          </button>
          <h3>Tech specs</h3>
          {[
            ['Screen', product.screen],
            ['Resolution', product.resolution],
            ['Processor', product.processor],
            ['Capacity', capacity || product.capacity],
            ['RAM', product.ram],
            ['Camera', product.camera],
            ['Year', product.year],
          ]
            .filter(row => row[1])
            .map(([label, value]) => (
              <p className={styles.spec} key={String(label)}>
                <span>{label}</span>
                <b>{String(value)}</b>
              </p>
            ))}
        </div>
      </div>
      <div className={styles.about}>
        <h2>About</h2>
        {product.description?.length ? (
          product.description.map(section => (
            <div key={section.title}>
              <h3>{section.title}</h3>
              {section.text.map(line => (
                <p key={line}>{line}</p>
              ))}
            </div>
          ))
        ) : (
          <p>{product.name}</p>
        )}
      </div>
      <ProductsSlider title="You may also like" products={suggested} />
    </section>
  );
}
