// src/modules/product-details/ProductDetailsPage.tsx - Product details page component
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAsync } from '../catalog/hooks/useAsync';
import { api } from '../../api';
import { Product, ProductDetails } from '../../types';
import { ProductsSlider } from '../../components/ProductsSlider';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage: React.FC = () => {
  const { productId = '' } = useParams();
  const navigate = useNavigate();

  const { data, loading, error, run } = useAsync<ProductDetails>();
  const { data: suggested, run: runSuggested } = useAsync<Product[]>();

  const [selectedImg, setSelectedImg] = useState(0);
  const [color, setColor] = useState<string | null>(null);
  const [capacity, setCapacity] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      run(api.getProductDetails(productId));
      runSuggested(api.getSuggestedProducts(8));
      window.scrollTo({ top: 0 });
    }
  }, [productId, run, runSuggested]);

  useEffect(() => {
    if (data) {
      setSelectedImg(0);
      setColor(data.colorsAvailable?.[0] ?? null);
      setCapacity(data.capacityAvailable?.[0] ?? null);
      document.title = data.name;
    }
  }, [data]);

  const images = useMemo(
    () => (data?.images?.length ? data.images : data ? [data.image] : []),
    [data],
  );

  if (loading) {
    return <div className="loader">Loading…</div>;
  }

  if (error) {
    return <p>Product was not found</p>;
  }

  if (!data) {
    return null;
  }

  const back = () => navigate(-1);

  return (
    <div>
      <nav className={styles.navigation}>
        <Link to="/">Home</Link> /{' '}
        <Link to={`/${data.category}`}>{data.category}</Link> / {data.name}
      </nav>

      <button onClick={back} className={styles.backButton}>
        ← Back
      </button>

      <h1>{data.name}</h1>

      <div className={styles.layout}>
        {/* Gallery */}
        <div>
          <div className={styles.galleryContainer}>
            <img
              src={images[selectedImg]}
              alt={data.name}
              className={styles.mainImage}
            />
          </div>

          {images.length > 1 && (
            <div className={styles.thumbnailsContainer}>
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`${styles.thumbnailButton} ${
                    i === selectedImg ? styles.thumbnailButtonSelected : ''
                  }`}
                  aria-label={`Show image ${i + 1}`}
                >
                  <img src={src} alt="" className={styles.thumbnailImage} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right side: buy, options */}
        <div>
          <p className={styles.price}>${data.price}</p>

          {/* Colors */}
          {data.colorsAvailable?.length ? (
            <div className={styles.optionGroup}>
              <h3>Colors</h3>
              <div className={styles.optionsContainer}>
                {data.colorsAvailable.map(c => (
                  <label key={c} className={styles.optionLabel}>
                    <input
                      type="radio"
                      name="color"
                      checked={color === c}
                      onChange={() => setColor(c)}
                    />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            </div>
          ) : null}

          {/* Capacity */}
          {data.capacityAvailable?.length ? (
            <div className={styles.optionGroup}>
              <h3>Capacity</h3>
              <div className={styles.optionsContainer}>
                {data.capacityAvailable.map(cap => (
                  <label key={cap} className={styles.optionLabel}>
                    <input
                      type="radio"
                      name="capacity"
                      checked={capacity === cap}
                      onChange={() => setCapacity(cap)}
                    />
                    <span>{cap}</span>
                  </label>
                ))}
              </div>
            </div>
          ) : null}

          {/* Tech specs — pick a few if present */}
          {data.specs && (
            <div className={styles.techSpecs}>
              <h3>Tech specs</h3>
              <ul className={styles.specsList}>
                {Object.entries(data.specs)
                  .slice(0, 6)
                  .map(([k, v]) => (
                    <li key={k} className={styles.specItem}>
                      <strong className={styles.specName}>{k}:</strong>{' '}
                      <span>{String(v)}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* About */}
      {data.description?.length ? (
        <section className={styles.section}>
          <h2>About</h2>
          {data.description.map(block => (
            <div key={block.title} className={styles.descriptionBlock}>
              <h3>{block.title}</h3>
              <p>{block.text}</p>
            </div>
          ))}
        </section>
      ) : null}

      {/* Suggested */}
      <section className={styles.section}>
        <h2>You may also like</h2>
        {suggested ? (
          <ProductsSlider title="" products={suggested} />
        ) : (
          <div className="loader">Loading…</div>
        )}
      </section>
    </div>
  );
};
