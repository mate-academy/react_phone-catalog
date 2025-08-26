import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAsync } from '../catalog/hooks/useAsync';
import { api } from '../../api';
import { Product, ProductDetails } from '../../types';
import { ProductsSlider } from '../../components/ProductsSlider';

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
      <nav style={{ margin: '12px 0' }}>
        <Link to="/">Home</Link> /{' '}
        <Link to={`/${data.category}`}>{data.category}</Link> / {data.name}
      </nav>

      <button onClick={back} style={{ marginBottom: 8 }}>
        ← Back
      </button>

      <h1>{data.name}</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          marginTop: 12,
        }}
      >
        {/* Gallery */}
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              justifyItems: 'center',
            }}
          >
            <img
              src={images[selectedImg]}
              alt={data.name}
              style={{ maxHeight: 420, objectFit: 'contain' }}
            />
          </div>

          {images.length > 1 && (
            <div
              style={{
                marginTop: 12,
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
              }}
            >
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  style={{
                    border:
                      i === selectedImg ? '2px solid #000' : '1px solid #ddd',
                    padding: 2,
                    borderRadius: 8,
                    background: '#fff',
                  }}
                  aria-label={`Show image ${i + 1}`}
                >
                  <img
                    src={src}
                    alt=""
                    style={{ width: 64, height: 64, objectFit: 'contain' }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right side: buy, options */}
        <div>
          <p style={{ fontSize: 20, fontWeight: 700 }}>${data.price}</p>

          {/* Colors */}
          {data.colorsAvailable?.length ? (
            <div style={{ marginTop: 12 }}>
              <h3>Colors</h3>
              <div style={{ display: 'flex', gap: 8 }}>
                {data.colorsAvailable.map(c => (
                  <label
                    key={c}
                    style={{ display: 'flex', gap: 6, alignItems: 'center' }}
                  >
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
            <div style={{ marginTop: 12 }}>
              <h3>Capacity</h3>
              <div style={{ display: 'flex', gap: 8 }}>
                {data.capacityAvailable.map(cap => (
                  <label
                    key={cap}
                    style={{ display: 'flex', gap: 6, alignItems: 'center' }}
                  >
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
            <div style={{ marginTop: 16 }}>
              <h3>Tech specs</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {Object.entries(data.specs)
                  .slice(0, 6)
                  .map(([k, v]) => (
                    <li key={k} style={{ display: 'flex', gap: 8 }}>
                      <strong
                        style={{ minWidth: 120, textTransform: 'capitalize' }}
                      >
                        {k}:
                      </strong>{' '}
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
        <section style={{ marginTop: 24 }}>
          <h2>About</h2>
          {data.description.map(block => (
            <div key={block.title} style={{ marginTop: 8 }}>
              <h3>{block.title}</h3>
              <p>{block.text}</p>
            </div>
          ))}
        </section>
      ) : null}

      {/* Suggested */}
      <section style={{ marginTop: 24 }}>
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
